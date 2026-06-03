import { parseProductForm, requireAdminSession } from '@/lib/auth/admin'
import { uploadProductImage } from '@/lib/cloudinary/uploadImage'
import { deleteProduct, getProductById, updateProduct } from '@/lib/db/repositories/products'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

type RouteContext = {
  params: Promise<{ id: string }>
}

export async function GET(_request: Request, context: RouteContext) {
  const { response } = await requireAdminSession()
  if (response) return response

  const { id } = await context.params

  try {
    const product = await getProductById(id)
    if (!product) {
      return NextResponse.json({ error: 'Product not found.' }, { status: 404 })
    }
    return NextResponse.json({ product })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to load product.'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function PUT(request: Request, context: RouteContext) {
  const { response } = await requireAdminSession()
  if (response) return response

  const { id } = await context.params

  try {
    const existing = await getProductById(id)
    if (!existing) {
      return NextResponse.json({ error: 'Product not found.' }, { status: 404 })
    }

    const { productName, price, imageFile } = await parseProductForm(request)
    let imageUrl = existing.imageUrl

    if (imageFile) {
      const buffer = Buffer.from(await imageFile.arrayBuffer())
      imageUrl = await uploadProductImage(buffer, imageFile.name)
    }

    const product = await updateProduct(id, { productName, price, imageUrl })
    return NextResponse.json({ product })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update product.'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { response } = await requireAdminSession()
  if (response) return response

  const { id } = await context.params

  try {
    const deleted = await deleteProduct(id)
    if (!deleted) {
      return NextResponse.json({ error: 'Product not found.' }, { status: 404 })
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to delete product.'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
