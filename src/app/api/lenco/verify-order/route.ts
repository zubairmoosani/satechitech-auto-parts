import { verifyLencoCollection } from '@/lib/lenco'
import { getOrder, markOrderPaid } from '@/lib/db/repositories/orders'
import { paymentCoversOrder } from '@/lib/orders/checkout'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

/**
 * Confirms a Lenco collection with Lenco's API. The widget runs in the browser, so the amount
 * reported by Lenco must cover the stored (server-priced) order before it is marked paid.
 */
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams
  const orderNumber = (params.get('order') ?? params.get('reference'))?.trim()

  if (!orderNumber) {
    return NextResponse.json({ paid: false, error: 'Missing payment reference' }, { status: 400 })
  }

  try {
    const order = await getOrder(orderNumber)
    if (!order || order.paymentMethod !== 'lenco') {
      return NextResponse.json({ paid: false, orderNumber, error: 'Order not found' }, { status: 404 })
    }

    if (order.paymentStatus === 'paid') {
      return NextResponse.json({ paid: true, orderNumber })
    }

    const verified = await verifyLencoCollection(order.lencoReference ?? order.orderNumber)
    const paid = verified.paid && paymentCoversOrder(order, verified.amount, verified.currency)

    if (paid) {
      await markOrderPaid(orderNumber)
    }

    return NextResponse.json({
      paid,
      orderNumber,
      status: verified.status,
      amount: verified.amount,
      currency: verified.currency,
    })
  } catch (error) {
    return NextResponse.json(
      { paid: false, orderNumber, error: error instanceof Error ? error.message : 'Verification failed' },
      { status: 502 },
    )
  }
}
