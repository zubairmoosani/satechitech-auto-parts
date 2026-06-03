import type { CartItem, CheckoutDetails } from '@/app/auto-parts/cart/types'
import { companyInfo } from '@/app/auto-parts/data'
import {
  assertFlutterwaveConfigured,
  createFlutterwavePayment,
  FlutterwaveApiError,
  getFlutterwaveConfigHint,
} from '@/lib/flutterwave'
import { assertPaymentPublicBaseUrl, getPaymentPublicBaseUrl } from '@/lib/payments/siteUrl'
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

    if (!body.details.email?.trim()) {
      return NextResponse.json({ error: 'Email is required for Flutterwave payments.' }, { status: 400 })
    }

    assertPaymentPublicBaseUrl()
    assertFlutterwaveConfigured()

    const base = getPaymentPublicBaseUrl()
    const redirectUrl = `${base}/api/flutterwave/callback`
    const description = body.items.map((item) => `${item.name} x${item.quantity}`).join(', ').slice(0, 200)

    const result = await createFlutterwavePayment({
      txRef: body.orderNumber,
      amount: body.subtotal,
      currency: companyInfo.currency,
      redirectUrl,
      customerName: body.details.fullName,
      customerEmail: body.details.email,
      customerPhone: body.details.phone,
      description: description || 'SATECHI TECH auto parts order',
    })

    if (!result.success || !result.paymentUrl) {
      return NextResponse.json({ error: 'Failed to create Flutterwave payment link' }, { status: 502 })
    }

    return NextResponse.json({
      paymentUrl: result.paymentUrl,
      orderNumber: body.orderNumber,
      txRef: body.orderNumber,
    })
  } catch (error) {
    console.error('Flutterwave create-payment error:', error)

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
