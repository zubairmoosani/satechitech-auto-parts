import type { PlacedOrder } from '@/app/auto-parts/cart/types'

export type PendingDpoOrder = {
  order: PlacedOrder
  transToken: string
  transRef?: string
  paymentStatus: 'pending' | 'paid' | 'failed'
}

type PendingStore = Map<string, PendingDpoOrder>

const globalStore = globalThis as typeof globalThis & { __dpoPendingOrders?: PendingStore }

const getStore = () => {
  if (!globalStore.__dpoPendingOrders) {
    globalStore.__dpoPendingOrders = new Map()
  }
  return globalStore.__dpoPendingOrders
}

export const savePendingDpoOrder = (entry: PendingDpoOrder) => {
  getStore().set(entry.order.orderNumber, entry)
}

export const getPendingDpoOrder = (orderNumber: string) => getStore().get(orderNumber)

export const markPendingDpoOrderPaid = (orderNumber: string) => {
  const entry = getStore().get(orderNumber)
  if (!entry) return null
  entry.paymentStatus = 'paid'
  getStore().set(orderNumber, entry)
  return entry
}
