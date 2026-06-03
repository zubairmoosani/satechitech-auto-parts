import ProductForm from '@/app/admin/products/components/ProductForm'
import { getProductById } from '@/lib/db/repositories/products'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Edit Product | SATECHI TECH Admin',
}

type EditProductPageProps = {
  params: Promise<{ id: string }>
}

const EditProductPage = async ({ params }: EditProductPageProps) => {
  const { id } = await params
  const product = await getProductById(id)

  if (!product) {
    notFound()
  }

  return (
    <ProductForm
      mode="edit"
      recordId={product.id}
      initialValues={{
        productName: product.productName,
        price: String(product.price),
      }}
      initialImageUrl={product.imageUrl}
    />
  )
}

export default EditProductPage
