import { parseProductForm, requireAdminSession } from '@/lib/auth/admin'
import { uploadProductImage } from '@/lib/cloudinary/uploadImage'
import { createProduct, listProducts } from '@/lib/db/repositories/products'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function GET() {
  const { response } = await requireAdminSession()
  if (response) return response

  try {
    const products = await listProducts()
    return NextResponse.json({ products })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to load products.'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const { response } = await requireAdminSession()
  if (response) return response

  try {
    const { productName, price, imageFile } = await parseProductForm(request)

    if (!imageFile) {
      return NextResponse.json({ error: 'Product image is required.' }, { status: 400 })
    }

    const buffer = Buffer.from(await imageFile.arrayBuffer())
    const imageUrl = await uploadProductImage(buffer, imageFile.name)

    const product = await createProduct({ productName, price, imageUrl })
    return NextResponse.json({ product }, { status: 201 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create product.'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
