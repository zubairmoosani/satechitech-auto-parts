import { options } from '@/app/api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export async function requireAdminSession() {
  const session = await getServerSession(options)

  if (!session?.user?.email || session.user.role !== 'Admin') {
    return {
      session: null,
      response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
    }
  }

  return { session, response: null }
}

export async function parseProductForm(request: Request): Promise<{
  productName: string
  price: number
  imageFile: File | null
}> {
  const formData = await request.formData()
  const productName = String(formData.get('productName') ?? formData.get('productId') ?? '').trim()
  const priceRaw = String(formData.get('price') ?? '').trim()
  const price = Number(priceRaw)
  const imageEntry = formData.get('image')
  const imageFile = imageEntry instanceof File && imageEntry.size > 0 ? imageEntry : null

  if (!productName) {
    throw new Error('Product name is required.')
  }

  if (!Number.isFinite(price) || price < 0) {
    throw new Error('Enter a valid price.')
  }

  return { productName, price, imageFile }
}
