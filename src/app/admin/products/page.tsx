import ProductsAdminList from '@/app/admin/products/components/ProductsAdminList'
import { listProducts } from '@/lib/db/repositories/products'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Products | SATECHI TECH Admin',
}

const AdminProductsPage = async () => {
  const products = await listProducts()

  return <ProductsAdminList initialProducts={products} />
}

export default AdminProductsPage
