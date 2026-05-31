import type { CartItem, CheckoutDetails } from '@/app/auto-parts/cart/types'
import { companyInfo } from '@/app/auto-parts/data'
import { splitCustomerName } from '@/lib/dpo'
import { assertLencoConfigured, lencoConfig, LencoApiError } from '@/lib/lenco'
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
      return NextResponse.json({ error: 'Email is required for Lenco payments.' }, { status: 400 })
    }

    assertLencoConfigured()

    const { firstName, lastName } = splitCustomerName(body.details.fullName)

    return NextResponse.json({
      orderNumber: body.orderNumber,
      widget: {
        scriptUrl: lencoConfig.widgetScriptUrl,
        publicKey: lencoConfig.publicKey,
        reference: body.orderNumber,
        email: body.details.email.trim(),
        amount: body.subtotal,
        currency: companyInfo.currency,
        label: 'SATECHI TECH ENTERPRISES',
        channels: ['card', 'mobile-money'],
        customer: {
          firstName,
          lastName,
          phone: body.details.phone,
        },
      },
    })
  } catch (error) {
    console.error('Lenco create-payment error:', error)

    if (error instanceof LencoApiError) {
      return NextResponse.json({ error: error.message }, { status: 502 })
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Payment initialization failed' },
      { status: 500 },
    )
  }
}
