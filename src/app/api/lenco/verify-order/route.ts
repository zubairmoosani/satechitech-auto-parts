import { companyInfo } from '@/app/auto-parts/data'
import { verifyLencoCollection } from '@/lib/lenco'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams
  const reference = params.get('reference') ?? params.get('order')
  const status = params.get('status')?.toLowerCase()

  if (!reference) {
    return NextResponse.json({ paid: false, error: 'Missing payment reference' }, { status: 400 })
  }

  if (status === 'failed' || status === 'cancelled') {
    return NextResponse.json({ paid: false, status, reference })
  }

  try {
    const verified = await verifyLencoCollection(reference)

    return NextResponse.json({
      paid:
        verified.paid &&
        (verified.currency === undefined || verified.currency === companyInfo.currency),
      status: verified.status,
      reference,
      amount: verified.amount,
      currency: verified.currency,
    })
  } catch (error) {
    return NextResponse.json(
      {
        paid: status === 'successful',
        reference,
        error: error instanceof Error ? error.message : 'Verification failed',
      },
      { status: 500 },
    )
  }
}
