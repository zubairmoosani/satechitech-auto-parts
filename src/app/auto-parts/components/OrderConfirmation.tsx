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
} as const

const onlinePaymentMethods = ['dpo', 'flutterwave'] as const

const OrderConfirmation = () => {
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get('order')
  const transToken = searchParams.get('TransactionToken') ?? searchParams.get('TransToken') ?? searchParams.get('ID')
  const transactionApproval = searchParams.get('TransactionApproval')
  const flutterwaveTransactionId = searchParams.get('transaction_id')
  const flutterwaveStatus = searchParams.get('status')?.toLowerCase()
  const txRef = searchParams.get('tx_ref')
  const { getPlacedOrder, savePlacedOrder, clearCart } = useCartContext()
  const [order, setOrder] = useState<PlacedOrder | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)

  useEffect(() => {
    if (!orderNumber) return

    const stored = getPlacedOrder(orderNumber)
    if (stored) {
      setOrder(stored)
      if (stored.paymentStatus === 'paid') {
        clearCart()
      }
    }

    const verifyOnlinePayment = async () => {
      const method = stored?.details.paymentMethod
      const isDpo = method === 'dpo' || !!transToken
      const isFlutterwave =
        method === 'flutterwave' || !!flutterwaveTransactionId || (txRef && flutterwaveStatus !== null)

      if (!isDpo && !isFlutterwave) return

      setIsVerifying(true)
      try {
        let isPaid = stored?.paymentStatus === 'paid'

        if (isDpo && (method === 'dpo' || transToken)) {
          const params = new URLSearchParams({ order: orderNumber })
          if (transToken) params.set('transToken', transToken)

          const response = await fetch(`/api/dpo/verify-order?${params.toString()}`)
          const data = (await response.json()) as { paid?: boolean }

          isPaid =
            data.paid ||
            transactionApproval?.toUpperCase() === 'Y' ||
            stored?.paymentStatus === 'paid'
        }

        if (isFlutterwave && (method === 'flutterwave' || flutterwaveTransactionId || flutterwaveStatus)) {
          const params = new URLSearchParams({ order: orderNumber })
          if (flutterwaveTransactionId) params.set('transaction_id', flutterwaveTransactionId)
          if (txRef) params.set('tx_ref', txRef)
          if (flutterwaveStatus) params.set('status', flutterwaveStatus)

          const response = await fetch(`/api/flutterwave/verify-order?${params.toString()}`)
          const data = (await response.json()) as { paid?: boolean }

          isPaid = data.paid || flutterwaveStatus === 'successful' || flutterwaveStatus === 'completed' || isPaid
        }

        if (stored && isPaid) {
          const updated: PlacedOrder = {
            ...stored,
            paymentStatus: 'paid',
            dpoTransToken: transToken ?? stored.dpoTransToken,
            flutterwaveTransactionId: flutterwaveTransactionId ?? stored.flutterwaveTransactionId,
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
        setIsVerifying(false)
      }
    }

    verifyOnlinePayment()
  }, [
    orderNumber,
    transToken,
    transactionApproval,
    flutterwaveTransactionId,
    flutterwaveStatus,
    txRef,
    getPlacedOrder,
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

  if (!orderNumber) {
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
    onlinePaymentMethods.includes(order.details.paymentMethod as (typeof onlinePaymentMethods)[number]) &&
    order.paymentStatus !== 'paid'
  const onlineProviderLabel = order.details.paymentMethod === 'flutterwave' ? 'Flutterwave' : 'DPO Pay'

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="shadow-sm border-0">
            <CardBody className="p-4 p-md-5 text-center">
              <div className={`display-6 mb-3 ${isOnlinePending ? 'text-warning' : 'text-success'}`}>
                {isOnlinePending ? '…' : '✓'}
              </div>
              <h1 className="h3 mb-2">
                {isOnlinePending ? 'Payment pending' : 'Thank you for your order'}
              </h1>
              <p className="text-body-secondary mb-4">
                {isOnlinePending ? (
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
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default OrderConfirmation
