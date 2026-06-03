export type AdminProduct = {
  id: string
  productName: string
  price: number
  imageUrl: string
  createdAt: string
  updatedAt: string
}

export type CreateProductInput = {
  productName: string
  price: number
  imageUrl: string
}

export type UpdateProductInput = {
  productName?: string
  price?: number
  imageUrl?: string
}
