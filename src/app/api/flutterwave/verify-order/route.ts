import { companyInfo } from '@/app/auto-parts/data'
import {
  getFlutterwaveAuthMode,
  verifyFlutterwaveOrderReference,
  verifyFlutterwaveTransaction,
} from '@/lib/flutterwave'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams
  const transactionId = params.get('transaction_id') ?? params.get('transactionId')
  const txRef = params.get('tx_ref') ?? params.get('order')
  const status = params.get('status')?.toLowerCase()

  if (!transactionId) {
    if (txRef && getFlutterwaveAuthMode() === 'v4-oauth') {
      try {
        const verified = await verifyFlutterwaveOrderReference(txRef)
        return NextResponse.json({
          paid:
            verified.paid &&
            (verified.currency === undefined || verified.currency === companyInfo.currency),
          txRef,
          status: verified.status ?? status,
          amount: verified.amount,
          currency: verified.currency,
        })
      } catch {
        return NextResponse.json({
          paid: status === 'successful' || status === 'completed',
          txRef,
          status,
        })
      }
    }

    return NextResponse.json({
      paid: status === 'successful' || status === 'completed',
      txRef,
      status,
    })
  }

  try {
    const verified = await verifyFlutterwaveTransaction(transactionId)

    return NextResponse.json({
      paid:
        verified.paid &&
        (verified.currency === undefined || verified.currency === companyInfo.currency),
      txRef: txRef ?? verified.message,
      status: verified.status,
      amount: verified.amount,
      currency: verified.currency,
    })
  } catch (error) {
    return NextResponse.json(
      {
        paid: status === 'successful',
        txRef,
        error: error instanceof Error ? error.message : 'Verification failed',
      },
      { status: 500 },
    )
  }
}
