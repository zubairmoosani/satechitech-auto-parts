import ProductForm from '@/app/admin/products/components/ProductForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Add Product | SATECHI TECH Admin',
}

const AddProductPage = () => {
  return <ProductForm mode="create" />
}

export default AddProductPage
