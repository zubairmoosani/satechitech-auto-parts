import type { CartItem, CheckoutDetails } from '@/app/auto-parts/cart/types'
import { companyInfo } from '@/app/auto-parts/data'
import {
  assertDpoPublicBaseUrl,
  createDpoToken,
  DpoApiError,
  getDpoCallbackUrls,
  getDpoPaymentUrl,
  splitCustomerName,
} from '@/lib/dpo'
import { savePendingDpoOrder } from '@/lib/dpo/pendingOrders'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

type CreatePaymentBody = {
  orderNumber: string
  subtotal: number
  items: CartItem[]
  details: CheckoutDetails
  placedAt: string
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreatePaymentBody

    if (!body.orderNumber || !body.subtotal || !body.items?.length || !body.details) {
      return NextResponse.json({ error: 'Invalid order payload' }, { status: 400 })
    }

    assertDpoPublicBaseUrl()

    const { firstName, lastName } = splitCustomerName(body.details.fullName)
    const { redirectUrl, backUrl } = getDpoCallbackUrls(body.orderNumber)
    const serviceDescription = body.items.map((item) => `${item.name} x${item.quantity}`).join(', ').slice(0, 200)

    const tokenResult = await createDpoToken({
      amount: body.subtotal,
      currency: companyInfo.currency,
      companyRef: body.orderNumber,
      redirectUrl,
      backUrl,
      customerFirstName: firstName,
      customerLastName: lastName,
      customerEmail: body.details.email || 'customer@satechitech.com',
      serviceDescription: serviceDescription || 'SATECHI TECH auto parts order',
    })

    if (!tokenResult.success || !tokenResult.transToken) {
      return NextResponse.json(
        {
          error: tokenResult.resultExplanation ?? 'Failed to create DPO payment token',
          result: tokenResult.result,
        },
        { status: 502 },
      )
    }

    savePendingDpoOrder({
      order: {
        orderNumber: body.orderNumber,
        items: body.items,
        subtotal: body.subtotal,
        details: { ...body.details, paymentMethod: 'dpo' },
        placedAt: body.placedAt,
        paymentStatus: 'pending',
        dpoTransToken: tokenResult.transToken,
      },
      transToken: tokenResult.transToken,
      transRef: tokenResult.transRef,
      paymentStatus: 'pending',
    })

    return NextResponse.json({
      paymentUrl: getDpoPaymentUrl(tokenResult.transToken),
      orderNumber: body.orderNumber,
      transToken: tokenResult.transToken,
    })
  } catch (error) {
    console.error('DPO create-payment error:', error)

    if (error instanceof DpoApiError) {
      return NextResponse.json(
        {
          error: error.message,
          result: error.result,
          resultExplanation: error.resultExplanation,
        },
        { status: error.status && error.status < 500 ? error.status : 502 },
      )
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Payment initialization failed' },
      { status: 500 },
    )
  }
}
