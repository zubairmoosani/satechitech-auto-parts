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
} as const

const OrderConfirmation = () => {
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get('order')
  const transToken = searchParams.get('TransactionToken') ?? searchParams.get('TransToken') ?? searchParams.get('ID')
  const transactionApproval = searchParams.get('TransactionApproval')
  const { getPlacedOrder, savePlacedOrder } = useCartContext()
  const [order, setOrder] = useState<PlacedOrder | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)

  useEffect(() => {
    if (!orderNumber) return

    const stored = getPlacedOrder(orderNumber)
    if (stored) {
      setOrder(stored)
    }

    const verifyDpoPayment = async () => {
      if (stored?.details.paymentMethod !== 'dpo' && !transToken) return

      setIsVerifying(true)
      try {
        const params = new URLSearchParams({ order: orderNumber })
        if (transToken) params.set('transToken', transToken)

        const response = await fetch(`/api/dpo/verify-order?${params.toString()}`)
        const data = (await response.json()) as { paid?: boolean }

        const isPaid =
          data.paid ||
          transactionApproval?.toUpperCase() === 'Y' ||
          stored?.paymentStatus === 'paid'

        if (stored && isPaid) {
          const updated: PlacedOrder = {
            ...stored,
            paymentStatus: 'paid',
            dpoTransToken: transToken ?? stored.dpoTransToken,
          }
          savePlacedOrder(updated)
          setOrder(updated)
        } else if (stored) {
          setOrder(stored)
        }
      } catch {
        if (stored) setOrder(stored)
      } finally {
        setIsVerifying(false)
      }
    }

    verifyDpoPayment()
  }, [orderNumber, transToken, transactionApproval, getPlacedOrder, savePlacedOrder])

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

  const isDpoPending = order.details.paymentMethod === 'dpo' && order.paymentStatus !== 'paid'

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="shadow-sm border-0">
            <CardBody className="p-4 p-md-5 text-center">
              <div className={`display-6 mb-3 ${isDpoPending ? 'text-warning' : 'text-success'}`}>
                {isDpoPending ? '…' : '✓'}
              </div>
              <h1 className="h3 mb-2">
                {isDpoPending ? 'Payment pending' : 'Thank you for your order'}
              </h1>
              <p className="text-body-secondary mb-4">
                {isDpoPending ? (
                  <>
                    Order <strong>{order.orderNumber}</strong> was created. Complete payment on DPO Pay, or contact us if
                    you already paid.
                  </>
                ) : (
                  <>
                    Order <strong>{order.orderNumber}</strong> has been received
                    {order.details.paymentMethod === 'dpo' ? ' and payment confirmed' : ''}. We will contact you shortly
                    to confirm availability.
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
