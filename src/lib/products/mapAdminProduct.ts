import type { ProductType } from '@/app/auto-parts/data'
import { companyInfo } from '@/app/auto-parts/data'
import type { AdminProduct } from '@/types/admin-product'

export const adminProductToProductType = (product: AdminProduct): ProductType => ({
  name: product.productName,
  category: 'Auto parts',
  brand: companyInfo.legalName,
  price: product.price,
  rating: 5,
  image: product.imageUrl,
  stockLabel: 'Enquire',
})
