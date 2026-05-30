'use client'

import type { PlacedOrder } from '@/app/auto-parts/cart/types'
import { autoPartsContact, formatPrice } from '@/app/auto-parts/data'
import { useCartContext } from '@/states'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa6'
import { Button, Card, CardBody, Col, Container, Row } from 'react-bootstrap'

const paymentLabels = {
  mobile_money: 'Mobile money',
  cash: 'Cash on collection',
  bank_transfer: 'Bank transfer',
} as const

const OrderConfirmation = () => {
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get('order')
  const { getPlacedOrder } = useCartContext()
  const [order, setOrder] = useState<PlacedOrder | null>(null)

  useEffect(() => {
    if (orderNumber) {
      setOrder(getPlacedOrder(orderNumber))
    }
  }, [orderNumber, getPlacedOrder])

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

  if (!orderNumber || !order) {
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

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="shadow-sm border-0">
            <CardBody className="p-4 p-md-5 text-center">
              <div className="text-success display-6 mb-3">✓</div>
              <h1 className="h3 mb-2">Thank you for your order</h1>
              <p className="text-body-secondary mb-4">
                Order <strong>{order.orderNumber}</strong> has been received. We will contact you shortly to confirm payment
                and availability.
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
