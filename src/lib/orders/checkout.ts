import { toCartId } from '@/app/auto-parts/cart/cartId'
import type { CartItem, CheckoutDetails, PaymentMethod } from '@/app/auto-parts/cart/types'
import { companyInfo, featuredPartsData, productsData } from '@/app/auto-parts/data'
import { listProducts } from '@/lib/db/repositories/products'
import { createOrder } from '@/lib/db/repositories/orders'
import type { StoredOrder } from '@/types/order'

/** Thrown for bad customer input — safe to show to the customer (HTTP 400). */
export class OrderValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'OrderValidationError'
  }
}

type CatalogEntry = Omit<CartItem, 'quantity'>

const MAX_LINES = 50
const MAX_QUANTITY = 999
const ORDER_NUMBER_PATTERN = /^ST-[A-Za-z0-9-]{6,60}$/

const roundMoney = (value: number) => Math.round(value * 100) / 100

const addEntry = (catalog: Map<string, CatalogEntry[]>, entry: CatalogEntry) => {
  const list = catalog.get(entry.id) ?? []
  list.push(entry)
  catalog.set(entry.id, list)
}

const buildStaticCatalog = () => {
  const catalog = new Map<string, CatalogEntry[]>()
  for (const product of productsData) {
    addEntry(catalog, {
      id: toCartId(product.name),
      name: product.name,
      category: product.category,
      brand: product.brand,
      price: product.salePrice ?? product.price,
      originalPrice: product.salePrice ? product.price : undefined,
      imageSrc: typeof product.image === 'string' ? product.image : product.image.src,
    })
  }
  for (const part of featuredPartsData) {
    addEntry(catalog, {
      id: toCartId(part.name),
      name: part.name,
      category: part.category,
      brand: companyInfo.legalName,
      price: part.price,
      imageSrc: part.image.src,
    })
  }
  return catalog
}

const addDatabaseProducts = async (catalog: Map<string, CatalogEntry[]>) => {
  const products = await listProducts()
  for (const product of products) {
    addEntry(catalog, {
      id: toCartId(product.productName),
      name: product.productName,
      category: 'Auto parts',
      brand: companyInfo.legalName,
      price: product.price,
      imageSrc: product.imageUrl,
    })
  }
}

/**
 * Re-prices cart lines from the server-side catalogue. The browser's prices are never trusted:
 * a line is accepted only if its price matches a real catalogue price for that product.
 */
export async function priceCartItems(rawItems: unknown): Promise<{ items: CartItem[]; subtotal: number }> {
  if (!Array.isArray(rawItems) || rawItems.length === 0) {
    throw new OrderValidationError('Your cart is empty.')
  }
  if (rawItems.length > MAX_LINES) {
    throw new OrderValidationError('Too many items in one order.')
  }

  const catalog = buildStaticCatalog()
  let dbLoaded = false

  const items: CartItem[] = []
  for (const raw of rawItems as Partial<CartItem>[]) {
    const id = typeof raw?.id === 'string' ? raw.id : ''
    const quantity = Number(raw?.quantity)
    const clientPrice = Number(raw?.price)

    if (!id || !Number.isInteger(quantity) || quantity < 1 || quantity > MAX_QUANTITY) {
      throw new OrderValidationError('Your cart has an invalid item. Please refresh your cart.')
    }

    if (!catalog.has(id) && !dbLoaded) {
      await addDatabaseProducts(catalog)
      dbLoaded = true
    }

    const candidates = catalog.get(id)
    if (!candidates?.length) {
      throw new OrderValidationError(`"${raw.name ?? id}" is no longer available. Please remove it from your cart.`)
    }

    const match = candidates.find((entry) => entry.price === clientPrice)
    if (!match) {
      throw new OrderValidationError(
        `The price of "${candidates[0].name}" has changed. Please remove it and add it to your cart again.`,
      )
    }

    const existing = items.find((item) => item.id === id && item.price === match.price)
    if (existing) {
      existing.quantity += quantity
    } else {
      items.push({ ...match, quantity })
    }
  }

  const subtotal = roundMoney(items.reduce((total, item) => total + item.price * item.quantity, 0))
  if (subtotal <= 0) {
    throw new OrderValidationError('Order total must be greater than zero.')
  }

  return { items, subtotal }
}

const cleanText = (value: unknown, max: number) => (typeof value === 'string' ? value.trim().slice(0, max) : '')

const validateDetails = (raw: Partial<CheckoutDetails> | undefined, requireEmail: boolean): Omit<CheckoutDetails, 'paymentMethod'> => {
  const fullName = cleanText(raw?.fullName, 120)
  const phone = cleanText(raw?.phone, 30)
  const email = cleanText(raw?.email, 160)
  const fulfilment = raw?.fulfilment === 'delivery' ? 'delivery' : 'pickup'
  const address = cleanText(raw?.address, 500)
  const notes = cleanText(raw?.notes, 1000)

  if (fullName.length < 2) throw new OrderValidationError('Please enter your full name.')
  if (phone.replace(/\D/g, '').length < 9) throw new OrderValidationError('Please enter a valid phone number.')
  if (requireEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new OrderValidationError('Please enter a valid email address.')
  }
  if (fulfilment === 'delivery' && address.length < 5) {
    throw new OrderValidationError('Please enter your delivery address.')
  }

  return { fullName, phone, email, fulfilment, address, notes }
}

export type CreateOrderRequestBody = {
  orderNumber?: string
  items?: unknown
  details?: Partial<CheckoutDetails>
  placedAt?: string
}

/** Validates the checkout request, prices it on the server and saves it as a pending order. */
export async function createPendingOrder(
  body: CreateOrderRequestBody,
  paymentMethod: PaymentMethod,
  options: { requireEmail?: boolean } = {},
): Promise<StoredOrder> {
  const orderNumber = cleanText(body?.orderNumber, 70)
  if (!ORDER_NUMBER_PATTERN.test(orderNumber)) {
    throw new OrderValidationError('Invalid order reference. Please try again.')
  }

  const details = validateDetails(body?.details, Boolean(options.requireEmail))
  const { items, subtotal } = await priceCartItems(body?.items)

  try {
    return await createOrder({
      orderNumber,
      items,
      subtotal,
      currency: companyInfo.currency,
      details: { ...details, paymentMethod },
      paymentMethod,
      paymentStatus: 'pending',
      placedAt: new Date().toISOString(),
    })
  } catch (error) {
    if (error instanceof Error && /duplicate key|already exists/i.test(error.message)) {
      throw new OrderValidationError('This order was already submitted. Please refresh and try again.')
    }
    throw error
  }
}

/** True when a gateway-reported amount/currency fully covers the stored order. */
export const paymentCoversOrder = (order: StoredOrder, amount: unknown, currency: unknown) => {
  const paidAmount = Number(amount)
  if (!Number.isFinite(paidAmount)) return false
  if (typeof currency === 'string' && currency.toUpperCase() !== order.currency.toUpperCase()) return false
  return paidAmount + 0.001 >= order.subtotal
}
