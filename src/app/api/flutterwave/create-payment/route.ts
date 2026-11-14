import { companyInfo } from '@/app/auto-parts/data'
import {
  assertFlutterwaveConfigured,
  createFlutterwavePayment,
  FlutterwaveApiError,
  getFlutterwaveConfigHint,
} from '@/lib/flutterwave'
import { updateOrder } from '@/lib/db/repositories/orders'
import { createPendingOrder, OrderValidationError, type CreateOrderRequestBody } from '@/lib/orders/checkout'
import { assertPaymentPublicBaseUrl, getPaymentPublicBaseUrl } from '@/lib/payments/siteUrl'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreateOrderRequestBody

    if (!body?.details?.email?.trim()) {
      return NextResponse.json({ error: 'Email is required for Flutterwave payments.' }, { status: 400 })
    }

    assertPaymentPublicBaseUrl()
    assertFlutterwaveConfigured()

    const order = await createPendingOrder(body, 'flutterwave', { requireEmail: true })

    const base = getPaymentPublicBaseUrl()
    const redirectUrl = `${base}/api/flutterwave/callback`
    const description = order.items.map((item) => `${item.name} x${item.quantity}`).join(', ').slice(0, 200)

    const result = await createFlutterwavePayment({
      txRef: order.orderNumber,
      amount: order.subtotal,
      currency: companyInfo.currency,
      redirectUrl,
      customerName: order.details.fullName,
      customerEmail: order.details.email,
      customerPhone: order.details.phone,
      description: description || 'SATECHI TECH auto parts order',
    })

    if (!result.success || !result.paymentUrl) {
      await updateOrder(order.orderNumber, { paymentStatus: 'failed' })
      return NextResponse.json({ error: 'Failed to create Flutterwave payment link' }, { status: 502 })
    }

    return NextResponse.json({
      paymentUrl: result.paymentUrl,
      orderNumber: order.orderNumber,
      txRef: order.orderNumber,
      subtotal: order.subtotal,
    })
  } catch (error) {
    console.error('Flutterwave create-payment error:', error)

    if (error instanceof OrderValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    if (error instanceof FlutterwaveApiError) {
      const hint = getFlutterwaveConfigHint()
      const isAuthError = /invalid authorization/i.test(error.message)

      return NextResponse.json(
        {
          error: error.message,
          ...(isAuthError && hint ? { hint } : {}),
        },
        { status: 502 },
      )
    }

    const hint = getFlutterwaveConfigHint()

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Payment initialization failed',
        ...(hint ? { hint } : {}),
      },
      { status: 500 },
    )
  }
}
