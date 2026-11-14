import { companyInfo } from '@/app/auto-parts/data'
import { splitCustomerName } from '@/lib/dpo'
import { assertLencoConfigured, lencoConfig, LencoApiError } from '@/lib/lenco'
import { updateOrder } from '@/lib/db/repositories/orders'
import { createPendingOrder, OrderValidationError, type CreateOrderRequestBody } from '@/lib/orders/checkout'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreateOrderRequestBody

    if (!body?.details?.email?.trim()) {
      return NextResponse.json({ error: 'Email is required for Lenco payments.' }, { status: 400 })
    }

    assertLencoConfigured()

    const order = await createPendingOrder(body, 'lenco', { requireEmail: true })
    await updateOrder(order.orderNumber, { lencoReference: order.orderNumber })

    const { firstName, lastName } = splitCustomerName(order.details.fullName)

    return NextResponse.json({
      orderNumber: order.orderNumber,
      subtotal: order.subtotal,
      widget: {
        scriptUrl: lencoConfig.widgetScriptUrl,
        publicKey: lencoConfig.publicKey,
        reference: order.orderNumber,
        email: order.details.email,
        amount: order.subtotal,
        currency: companyInfo.currency,
        label: 'SATECHI TECH ENTERPRISES',
        channels: ['card', 'mobile-money'],
        customer: {
          firstName,
          lastName,
          phone: order.details.phone,
        },
      },
    })
  } catch (error) {
    console.error('Lenco create-payment error:', error)

    if (error instanceof OrderValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    if (error instanceof LencoApiError) {
      return NextResponse.json({ error: error.message }, { status: 502 })
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Payment initialization failed' },
      { status: 500 },
    )
  }
}
