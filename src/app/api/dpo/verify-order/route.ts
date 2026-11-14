import { confirmDpoOrder } from '@/lib/orders/verifyDpo'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function GET(request: Request) {
  const orderNumber = new URL(request.url).searchParams.get('order')?.trim()

  if (!orderNumber) {
    return NextResponse.json({ error: 'Order number required' }, { status: 400 })
  }

  try {
    const { order, paid, result, resultExplanation } = await confirmDpoOrder(orderNumber)
    if (!order) {
      return NextResponse.json({ paid: false, orderNumber, error: 'Order not found' }, { status: 404 })
    }
    return NextResponse.json({ paid, orderNumber, result, resultExplanation })
  } catch (error) {
    return NextResponse.json(
      { paid: false, orderNumber, error: error instanceof Error ? error.message : 'Verification failed' },
      { status: 502 },
    )
  }
}
