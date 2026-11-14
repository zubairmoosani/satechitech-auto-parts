import type { AdminProduct, CreateProductInput, UpdateProductInput } from '@/types/admin-product'
import type { NewOrderInput, OrderUpdateInput, StoredOrder } from '@/types/order'
import { randomUUID } from 'crypto'
import { mkdir, readFile, writeFile } from 'fs/promises'
import path from 'path'

export type StoredUser = {
  id: string
  email: string
  passwordHash: string
  name: string
  role: 'Admin'
  createdAt: string
}

type StoreFile = {
  users: StoredUser[]
  products: AdminProduct[]
  orders: StoredOrder[]
}

const STORE_DIR = path.join(process.cwd(), '.data')
const STORE_PATH = path.join(STORE_DIR, 'store.json')

const emptyStore = (): StoreFile => ({ users: [], products: [], orders: [] })

type LegacyProduct = AdminProduct & { productId?: string }

const normalizeProduct = (product: LegacyProduct): AdminProduct => ({
  ...product,
  productName: product.productName ?? product.productId ?? '',
})

async function readStore(): Promise<StoreFile> {
  try {
    const raw = await readFile(STORE_PATH, 'utf8')
    const parsed = JSON.parse(raw) as { users?: StoredUser[]; products?: LegacyProduct[]; orders?: StoredOrder[] }
    return {
      users: Array.isArray(parsed.users) ? parsed.users : [],
      products: Array.isArray(parsed.products) ? parsed.products.map(normalizeProduct) : [],
      orders: Array.isArray(parsed.orders) ? parsed.orders : [],
    }
  } catch {
    return emptyStore()
  }
}

async function writeStore(data: StoreFile): Promise<void> {
  await mkdir(STORE_DIR, { recursive: true })
  await writeFile(STORE_PATH, JSON.stringify(data, null, 2), 'utf8')
}

export async function fileFindUserByEmail(email: string): Promise<StoredUser | null> {
  const store = await readStore()
  return store.users.find((user) => user.email.toLowerCase() === email.toLowerCase()) ?? null
}

export async function fileCreateUser(user: Omit<StoredUser, 'id' | 'createdAt'>): Promise<StoredUser> {
  const store = await readStore()
  const record: StoredUser = {
    ...user,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
  }
  store.users.push(record)
  await writeStore(store)
  return record
}

export async function fileListProducts(): Promise<AdminProduct[]> {
  const store = await readStore()
  return [...store.products].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

export async function fileFindProductById(id: string): Promise<AdminProduct | null> {
  const store = await readStore()
  return store.products.find((product) => product.id === id) ?? null
}

export async function fileFindProductByProductName(productName: string): Promise<AdminProduct | null> {
  const store = await readStore()
  return (
    store.products.find((product) => {
      const name = product.productName ?? (product as LegacyProduct).productId ?? ''
      return name.toLowerCase() === productName.toLowerCase()
    }) ?? null
  )
}

export async function fileCreateProduct(input: CreateProductInput): Promise<AdminProduct> {
  const store = await readStore()
  const now = new Date().toISOString()
  const record: AdminProduct = {
    id: randomUUID(),
    productName: input.productName.trim(),
    price: input.price,
    imageUrl: input.imageUrl,
    createdAt: now,
    updatedAt: now,
  }
  store.products.push(record)
  await writeStore(store)
  return record
}

export async function fileUpdateProduct(id: string, input: UpdateProductInput): Promise<AdminProduct | null> {
  const store = await readStore()
  const index = store.products.findIndex((product) => product.id === id)
  if (index === -1) return null

  const current = store.products[index]
  const updated: AdminProduct = {
    ...current,
    productName: input.productName?.trim() ?? current.productName,
    price: input.price ?? current.price,
    imageUrl: input.imageUrl ?? current.imageUrl,
    updatedAt: new Date().toISOString(),
  }
  store.products[index] = updated
  await writeStore(store)
  return updated
}

export async function fileDeleteProduct(id: string): Promise<boolean> {
  const store = await readStore()
  const before = store.products.length
  store.products = store.products.filter((product) => product.id !== id)
  if (store.products.length === before) return false
  await writeStore(store)
  return true
}

export async function fileListOrders(): Promise<StoredOrder[]> {
  const store = await readStore()
  return [...store.orders].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

export async function fileFindOrder(orderNumber: string): Promise<StoredOrder | null> {
  const store = await readStore()
  return store.orders.find((order) => order.orderNumber === orderNumber) ?? null
}

export async function fileCreateOrder(input: NewOrderInput): Promise<StoredOrder> {
  const store = await readStore()
  if (store.orders.some((order) => order.orderNumber === input.orderNumber)) {
    throw new Error('Order already exists.')
  }
  const now = new Date().toISOString()
  const record: StoredOrder = { ...input, createdAt: now, updatedAt: now }
  store.orders.push(record)
  await writeStore(store)
  return record
}

export async function fileUpdateOrder(orderNumber: string, patch: OrderUpdateInput): Promise<StoredOrder | null> {
  const store = await readStore()
  const index = store.orders.findIndex((order) => order.orderNumber === orderNumber)
  if (index === -1) return null
  const updated: StoredOrder = { ...store.orders[index], ...patch, updatedAt: new Date().toISOString() }
  store.orders[index] = updated
  await writeStore(store)
  return updated
}
