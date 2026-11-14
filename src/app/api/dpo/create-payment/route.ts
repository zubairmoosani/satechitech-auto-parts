import { companyInfo } from '@/app/auto-parts/data'
import {
  assertDpoPublicBaseUrl,
  createDpoToken,
  DpoApiError,
  getDpoCallbackUrls,
  getDpoPaymentUrl,
  splitCustomerName,
} from '@/lib/dpo'
import { updateOrder } from '@/lib/db/repositories/orders'
import { createPendingOrder, OrderValidationError, type CreateOrderRequestBody } from '@/lib/orders/checkout'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreateOrderRequestBody

    assertDpoPublicBaseUrl()

    const order = await createPendingOrder(body, 'dpo', { requireEmail: true })
    const { firstName, lastName } = splitCustomerName(order.details.fullName)
    const { redirectUrl, backUrl } = getDpoCallbackUrls(order.orderNumber)
    const serviceDescription = order.items.map((item) => `${item.name} x${item.quantity}`).join(', ').slice(0, 200)

    const tokenResult = await createDpoToken({
      amount: order.subtotal,
      currency: companyInfo.currency,
      companyRef: order.orderNumber,
      redirectUrl,
      backUrl,
      customerFirstName: firstName,
      customerLastName: lastName,
      customerEmail: order.details.email,
      serviceDescription: serviceDescription || 'SATECHI TECH auto parts order',
    })

    if (!tokenResult.success || !tokenResult.transToken) {
      await updateOrder(order.orderNumber, { paymentStatus: 'failed' })
      return NextResponse.json(
        {
          error: tokenResult.resultExplanation ?? 'Failed to create DPO payment token',
          result: tokenResult.result,
        },
        { status: 502 },
      )
    }

    await updateOrder(order.orderNumber, { dpoTransToken: tokenResult.transToken })

    return NextResponse.json({
      paymentUrl: getDpoPaymentUrl(tokenResult.transToken),
      orderNumber: order.orderNumber,
      subtotal: order.subtotal,
    })
  } catch (error) {
    console.error('DPO create-payment error:', error)

    if (error instanceof OrderValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

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
