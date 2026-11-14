import type { CartItem, CheckoutDetails, PaymentMethod, PaymentStatus } from '@/app/auto-parts/cart/types'

export type StoredOrder = {
  orderNumber: string
  items: CartItem[]
  subtotal: number
  currency: string
  details: CheckoutDetails
  paymentMethod: PaymentMethod
  paymentStatus: PaymentStatus
  placedAt: string
  paidAt?: string
  dpoTransToken?: string
  flutterwaveTransactionId?: string
  lencoReference?: string
  createdAt: string
  updatedAt: string
}

export type NewOrderInput = Omit<StoredOrder, 'createdAt' | 'updatedAt'>

export type OrderUpdateInput = Partial<
  Pick<StoredOrder, 'paymentStatus' | 'paidAt' | 'dpoTransToken' | 'flutterwaveTransactionId' | 'lencoReference'>
>
