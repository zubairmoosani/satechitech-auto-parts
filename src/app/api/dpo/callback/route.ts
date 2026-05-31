import { verifyDpoToken } from '@/lib/dpo'
import { markPendingDpoOrderPaid } from '@/lib/dpo/pendingOrders'
import { getPaymentPublicBaseUrl } from '@/lib/payments/siteUrl'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

const readCallbackParams = async (request: Request) => {
  const url = new URL(request.url)
  const params: Record<string, string> = {}

  url.searchParams.forEach((value, key) => {
    params[key] = value
  })

  if (request.method === 'POST') {
    const contentType = request.headers.get('content-type') ?? ''
    if (contentType.includes('application/json')) {
      const json = (await request.json()) as Record<string, string>
      Object.assign(params, json)
    } else {
      const formData = await request.formData()
      formData.forEach((value, key) => {
        params[key] = String(value)
      })
    }
  }

  return params
}

export async function GET(request: Request) {
  return handleCallback(await readCallbackParams(request), 'GET')
}

export async function POST(request: Request) {
  return handleCallback(await readCallbackParams(request), 'POST')
}

async function handleCallback(params: Record<string, string>, method: string) {
  const companyRef = params.CompanyRef ?? params.companyRef ?? params.PnrID
  const transToken = params.TransactionToken ?? params.TransToken ?? params.ID
  const approval = params.TransactionApproval ?? params.transactionApproval ?? params.CCDapproval

  if (companyRef && transToken) {
    try {
      const verified = await verifyDpoToken(transToken)
      if (verified.paid || approval?.toUpperCase() === 'Y') {
        markPendingDpoOrderPaid(companyRef)
      }
    } catch (error) {
      console.error('DPO callback verify error:', error)
      if (approval?.toUpperCase() === 'Y' && companyRef) {
        markPendingDpoOrderPaid(companyRef)
      }
    }
  }

  if (method === 'GET' && companyRef) {
    const base = getPaymentPublicBaseUrl()
    const searchParams = new URLSearchParams({ order: companyRef })
    if (transToken) searchParams.set('TransactionToken', transToken)
    if (approval?.toUpperCase() !== 'Y') {
      searchParams.set('payment', 'cancelled')
    }

    return NextResponse.redirect(`${base}/checkout/confirmation?${searchParams.toString()}`)
  }

  return NextResponse.json({ received: true })
}
