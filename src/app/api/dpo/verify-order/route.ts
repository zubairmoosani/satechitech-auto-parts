import { verifyDpoToken } from '@/lib/dpo'
import { getPendingDpoOrder } from '@/lib/dpo/pendingOrders'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function GET(request: Request) {
  const orderNumber = new URL(request.url).searchParams.get('order')
  const transToken = new URL(request.url).searchParams.get('transToken')

  if (!orderNumber) {
    return NextResponse.json({ error: 'Order number required' }, { status: 400 })
  }

  const pending = getPendingDpoOrder(orderNumber)
  const token = transToken ?? pending?.transToken

  if (!token) {
    return NextResponse.json({ paid: pending?.paymentStatus === 'paid', orderNumber })
  }

  try {
    const verified = await verifyDpoToken(token)
    return NextResponse.json({
      paid: verified.paid || pending?.paymentStatus === 'paid',
      orderNumber,
      result: verified.result,
      resultExplanation: verified.resultExplanation,
    })
  } catch (error) {
    return NextResponse.json(
      {
        paid: pending?.paymentStatus === 'paid',
        orderNumber,
        error: error instanceof Error ? error.message : 'Verification failed',
      },
      { status: 500 },
    )
  }
}
