'use client'

import type { PlacedOrder } from '@/app/auto-parts/cart/types'
import { autoPartsContact, formatPrice } from '@/app/auto-parts/data'
import { useCartContext } from '@/states'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa6'
import { Card, CardBody, Col, Container, Row } from 'react-bootstrap'

const paymentLabels = {
  mobile_money: 'Mobile money',
  cash: 'Cash on collection',
  bank_transfer: 'Bank transfer',
  dpo: 'DPO Pay',
  flutterwave: 'Flutterwave',
  lenco: 'Lenco',
} as const

const onlinePaymentMethods = ['dpo', 'flutterwave', 'lenco'] as const

const OrderConfirmation = () => {
  const searchParams = useSearchParams()
  const orderFromQuery = searchParams.get('order')?.trim()
  const txRef = searchParams.get('tx_ref')?.trim()
  const lencoReference = searchParams.get('reference')?.trim()
  const orderNumber = orderFromQuery || txRef || lencoReference || null
  const transToken = searchParams.get('TransactionToken') ?? searchParams.get('TransToken') ?? searchParams.get('ID')
  const flutterwaveTransactionId = searchParams.get('transaction_id')
  const flutterwaveStatus = searchParams.get('status')?.toLowerCase()
  const lencoStatus = searchParams.get('status')?.toLowerCase()
  const paymentCancelled =
    searchParams.get('payment') === 'cancelled' ||
    (flutterwaveStatus === 'cancelled' || flutterwaveStatus === 'failed') ||
    ((lencoStatus === 'failed' || lencoStatus === 'cancelled') && !!lencoReference)
  const { findPlacedOrder, savePlacedOrder, clearCart } = useCartContext()
  const [order, setOrder] = useState<PlacedOrder | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)

  useEffect(() => {
    if (!orderNumber) return

    const stored = findPlacedOrder(orderNumber)
    if (stored) {
      setOrder(stored)
      if (stored.paymentStatus === 'paid') {
        clearCart()
      }
    }

    let cancelled = false

    const verifyOnlinePayment = async () => {
      if (paymentCancelled) return

      const method =
        stored?.details.paymentMethod ??
        (transToken ? 'dpo' : flutterwaveTransactionId || txRef ? 'flutterwave' : lencoReference ? 'lenco' : undefined)

      if (method !== 'dpo' && method !== 'flutterwave' && method !== 'lenco') return
      if (stored?.paymentStatus === 'paid') return

      setIsVerifying(true)
      try {
        // Payment status always comes from our server, which checks with the gateway.
        // Mobile money can take a few seconds to settle, so retry a few times.
        let isPaid = false
        for (let attempt = 0; attempt < 5 && !cancelled; attempt += 1) {
          const params = new URLSearchParams({ order: orderNumber })
          if (method === 'flutterwave' && flutterwaveTransactionId) params.set('transaction_id', flutterwaveTransactionId)

          const response = await fetch(`/api/${method}/verify-order?${params.toString()}`, { cache: 'no-store' })
          const data = (await response.json()) as { paid?: boolean }
          isPaid = data.paid === true
          if (isPaid || response.status === 404) break

          await new Promise((resolve) => setTimeout(resolve, 3000))
        }

        if (cancelled) return

        if (stored && isPaid) {
          const updated: PlacedOrder = {
            ...stored,
            paymentStatus: 'paid',
            dpoTransToken: transToken ?? stored.dpoTransToken,
            flutterwaveTransactionId: flutterwaveTransactionId ?? stored.flutterwaveTransactionId,
            lencoReference: method === 'lenco' ? orderNumber : stored.lencoReference,
          }
          savePlacedOrder(updated)
          setOrder(updated)
          clearCart()
        } else if (stored) {
          setOrder(stored)
        }
      } catch {
        if (stored) setOrder(stored)
      } finally {
        if (!cancelled) setIsVerifying(false)
      }
    }

    verifyOnlinePayment()

    return () => {
      cancelled = true
    }
  }, [
    orderNumber,
    transToken,
    flutterwaveTransactionId,
    txRef,
    lencoReference,
    paymentCancelled,
    findPlacedOrder,
    savePlacedOrder,
    clearCart,
  ])

  const whatsappMessage = useMemo(() => {
    if (!order) return ''

    const lines = [
      `Hello ${autoPartsContact.whatsapp}, I placed order ${order.orderNumber}.`,
      '',
      'Items:',
      ...order.items.map((item) => `- ${item.name} × ${item.quantity} (${formatPrice(item.price * item.quantity)})`),
      '',
      `Total: ${formatPrice(order.subtotal)}`,
      `Name: ${order.details.fullName}`,
      `Phone: ${order.details.phone}`,
      `Payment: ${paymentLabels[order.details.paymentMethod]}`,
    ]

    return encodeURIComponent(lines.join('\n'))
  }, [order])

  if (!orderNumber && !paymentCancelled) {
    return (
      <Container className="py-5">
        <Card className="shadow-sm border-0 text-center py-5">
          <CardBody>
            <h2 className="mb-3">Order not found</h2>
            <p className="text-body-secondary mb-4">No order reference was provided.</p>
            <Link href="/" className="btn btn-primary">
              Back to home
            </Link>
          </CardBody>
        </Card>
      </Container>
    )
  }

  if (isVerifying && !order) {
    return (
      <Container className="py-5 text-center">
        <p className="text-body-secondary">Confirming your payment…</p>
      </Container>
    )
  }

  if (!order && paymentCancelled) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={8}>
            <Card className="shadow-sm border-0">
              <CardBody className="p-4 p-md-5 text-center">
                <div className="display-6 mb-3 text-danger">×</div>
                <h1 className="h3 mb-2">Payment cancelled</h1>
                <p className="text-body-secondary mb-4">
                  {orderNumber ? (
                    <>
                      Payment for order <strong>{orderNumber}</strong> was not completed. Your cart items are still
                      saved — you can return to checkout and try again.
                    </>
                  ) : (
                    <>Your payment was not completed. Your cart items are still saved — you can return to checkout and try again.</>
                  )}
                </p>
                <div className="d-grid d-sm-flex justify-content-sm-center gap-2">
                  <Link href="/checkout" className="btn btn-primary">
                    Return to checkout
                  </Link>
                  <Link href="/#products" className="btn btn-outline-primary">
                    Continue shopping
                  </Link>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }

  if (!order) {
    return (
      <Container className="py-5">
        <Card className="shadow-sm border-0 text-center py-5">
          <CardBody>
            <h2 className="mb-3">Order not found</h2>
            <p className="text-body-secondary mb-4">We could not find details for this order.</p>
            <Link href="/" className="btn btn-primary">
              Back to home
            </Link>
          </CardBody>
        </Card>
      </Container>
    )
  }

  const isOnlinePending =
    !paymentCancelled &&
    onlinePaymentMethods.includes(order.details.paymentMethod as (typeof onlinePaymentMethods)[number]) &&
    order.paymentStatus !== 'paid'
  const onlineProviderLabel =
    order.details.paymentMethod === 'flutterwave'
      ? 'Flutterwave'
      : order.details.paymentMethod === 'lenco'
        ? 'Lenco'
        : 'DPO Pay'

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="shadow-sm border-0">
            <CardBody className="p-4 p-md-5 text-center">
              <div
                className={`display-6 mb-3 ${paymentCancelled ? 'text-danger' : isOnlinePending ? 'text-warning' : 'text-success'}`}
              >
                {paymentCancelled ? '×' : isOnlinePending ? '…' : '✓'}
              </div>
              <h1 className="h3 mb-2">
                {paymentCancelled ? 'Payment cancelled' : isOnlinePending ? 'Payment pending' : 'Thank you for your order'}
              </h1>
              <p className="text-body-secondary mb-4">
                {paymentCancelled ? (
                  <>
                    Payment for order <strong>{order.orderNumber}</strong> was not completed. Your cart items are still
                    saved — you can return to checkout and try again.
                  </>
                ) : isOnlinePending && isVerifying ? (
                  <>Confirming your payment for order <strong>{order.orderNumber}</strong>…</>
                ) : isOnlinePending ? (
                  <>
                    Order <strong>{order.orderNumber}</strong> was created. Complete payment on {onlineProviderLabel}, or
                    contact us if you already paid.
                  </>
                ) : (
                  <>
                    Order <strong>{order.orderNumber}</strong> has been received
                    {onlinePaymentMethods.includes(order.details.paymentMethod as (typeof onlinePaymentMethods)[number])
                      ? ' and payment confirmed'
                      : ''}
                    . We will contact you shortly to confirm availability.
                  </>
                )}
              </p>

              <div className="bg-light rounded p-4 text-start mb-4">
                <h5 className="mb-3">Order summary</h5>
                {order.items.map((item) => (
                  <div key={item.id} className="d-flex justify-content-between small mb-2">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
                <hr />
                <div className="d-flex justify-content-between fw-semibold">
                  <span>Total</span>
                  <span className="text-success">{formatPrice(order.subtotal)}</span>
                </div>
              </div>

              <div className="d-grid d-sm-flex justify-content-sm-center gap-2">
                {paymentCancelled ? (
                  <>
                    <Link href="/checkout" className="btn btn-primary">
                      Return to checkout
                    </Link>
                    <Link href="/#products" className="btn btn-outline-primary">
                      Continue shopping
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href={`${autoPartsContact.whatsappHref}?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-success flex-centered gap-2"
                    >
                      <FaWhatsapp />
                      Confirm on WhatsApp
                    </Link>
                    <Link href="/#products" className="btn btn-outline-primary">
                      Continue shopping
                    </Link>
                  </>
                )}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default OrderConfirmation
