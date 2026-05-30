'use client'

import type { CartItem, PlacedOrder } from '@/app/auto-parts/cart/types'
import type { ProductType } from '@/app/auto-parts/data'
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

const CART_STORAGE_KEY = 'satechitech_cart'

type CartContextType = {
  items: CartItem[]
  itemCount: number
  subtotal: number
  isCartOpen: boolean
  openCart: () => void
  closeCart: () => void
  addItem: (product: ProductType, quantity?: number) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  savePlacedOrder: (order: PlacedOrder) => void
  getPlacedOrder: (orderNumber: string) => PlacedOrder | null
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const toCartId = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const productToCartItem = (product: ProductType, quantity: number): CartItem => ({
  id: toCartId(product.name),
  name: product.name,
  category: product.category,
  brand: product.brand,
  price: product.salePrice ?? product.price,
  originalPrice: product.salePrice ? product.price : undefined,
  imageSrc: typeof product.image === 'string' ? product.image : product.image.src,
  quantity,
})

const readStoredCart = (): CartItem[] => {
  if (typeof window === 'undefined') return []

  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as CartItem[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function useCartContext() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCartContext must be used within a CartProvider')
  }
  return context
}

export function CartProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setItems(readStoredCart())
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (!isHydrated) return
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  }, [items, isHydrated])

  const itemCount = useMemo(() => items.reduce((total, item) => total + item.quantity, 0), [items])

  const subtotal = useMemo(() => items.reduce((total, item) => total + item.price * item.quantity, 0), [items])

  const addItem = useCallback((product: ProductType, quantity = 1) => {
    setItems((current) => {
      const id = toCartId(product.name)
      const existing = current.find((item) => item.id === id)

      if (existing) {
        return current.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + quantity } : item,
        )
      }

      return [...current, productToCartItem(product, quantity)]
    })
    setIsCartOpen(true)
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems((current) => current.filter((item) => item.id !== id))
  }, [])

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) {
      setItems((current) => current.filter((item) => item.id !== id))
      return
    }

    setItems((current) => current.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const savePlacedOrder = useCallback((order: PlacedOrder) => {
    localStorage.setItem(`satechitech_order_${order.orderNumber}`, JSON.stringify(order))
  }, [])

  const getPlacedOrder = useCallback((orderNumber: string) => {
    try {
      const raw = localStorage.getItem(`satechitech_order_${orderNumber}`)
      if (!raw) return null
      return JSON.parse(raw) as PlacedOrder
    } catch {
      return null
    }
  }, [])

  const value = useMemo(
    () => ({
      items,
      itemCount,
      subtotal,
      isCartOpen,
      openCart: () => setIsCartOpen(true),
      closeCart: () => setIsCartOpen(false),
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      savePlacedOrder,
      getPlacedOrder,
    }),
    [items, itemCount, subtotal, isCartOpen, addItem, removeItem, updateQuantity, clearCart, savePlacedOrder, getPlacedOrder],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
