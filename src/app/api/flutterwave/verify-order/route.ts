import { getFlutterwaveAuthMode, verifyFlutterwaveOrderReference, verifyFlutterwaveTransaction } from '@/lib/flutterwave'
import { getOrder, markOrderPaid } from '@/lib/db/repositories/orders'
import { paymentCoversOrder } from '@/lib/orders/checkout'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

/**
 * Confirms a Flutterwave payment with Flutterwave's API. The `status` query param from the
 * browser redirect is never trusted; amount, currency and reference must match the stored order.
 */
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams
  const orderNumber = (params.get('order') ?? params.get('tx_ref'))?.trim()
  const transactionId = (params.get('transaction_id') ?? params.get('transactionId'))?.trim()

  if (!orderNumber) {
    return NextResponse.json({ paid: false, error: 'Order number required' }, { status: 400 })
  }

  try {
    const order = await getOrder(orderNumber)
    if (!order || order.paymentMethod !== 'flutterwave') {
      return NextResponse.json({ paid: false, orderNumber, error: 'Order not found' }, { status: 404 })
    }

    if (order.paymentStatus === 'paid') {
      return NextResponse.json({ paid: true, orderNumber })
    }

    let verified
    if (getFlutterwaveAuthMode() === 'v4-oauth') {
      verified = await verifyFlutterwaveOrderReference(orderNumber)
    } else if (transactionId && /^\d+$/.test(transactionId)) {
      verified = await verifyFlutterwaveTransaction(transactionId)
    } else {
      return NextResponse.json({ paid: false, orderNumber, status: 'pending' })
    }

    const paid =
      verified.paid &&
      verified.txRef === orderNumber &&
      paymentCoversOrder(order, verified.amount, verified.currency)

    if (paid) {
      await markOrderPaid(orderNumber, transactionId ? { flutterwaveTransactionId: transactionId } : {})
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
