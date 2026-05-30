export type CartItem = {
  id: string
  name: string
  category: string
  brand: string
  price: number
  originalPrice?: number
  imageSrc: string
  quantity: number
}

export type FulfilmentMethod = 'pickup' | 'delivery'

export type PaymentMethod = 'mobile_money' | 'cash' | 'bank_transfer'

export type CheckoutDetails = {
  fullName: string
  phone: string
  email: string
  fulfilment: FulfilmentMethod
  address: string
  paymentMethod: PaymentMethod
  notes: string
}

export type PlacedOrder = {
  orderNumber: string
  items: CartItem[]
  subtotal: number
  details: CheckoutDetails
  placedAt: string
}
