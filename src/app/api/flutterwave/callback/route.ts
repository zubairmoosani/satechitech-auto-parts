import { getPaymentPublicBaseUrl } from '@/lib/payments/siteUrl'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

/** Browser redirect from Flutterwave — normalizes params like DPO cancel flow. */
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams
  const txRef = params.get('tx_ref')?.trim()
  const status = params.get('status')?.toLowerCase()
  const transactionId = params.get('transaction_id') ?? params.get('transactionId')
  const base = getPaymentPublicBaseUrl()

  const searchParams = new URLSearchParams()

  if (txRef) {
    searchParams.set('order', txRef)
    searchParams.set('tx_ref', txRef)
  }

  if (status) searchParams.set('status', status)
  if (transactionId) searchParams.set('transaction_id', transactionId)

  if (status === 'cancelled' || status === 'failed') {
    searchParams.set('payment', 'cancelled')
  }

  const query = searchParams.toString()
  const destination = query
    ? `${base}/checkout/confirmation?${query}`
    : `${base}/checkout/confirmation?payment=cancelled`

  return NextResponse.redirect(destination)
}
