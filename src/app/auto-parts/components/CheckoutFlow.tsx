'use client'

import type { CheckoutDetails, FulfilmentMethod, PaymentMethod } from '@/app/auto-parts/cart/types'
import { autoPartsContact, formatPrice } from '@/app/auto-parts/data'
import { useCartContext, useNotificationContext } from '@/states'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { BsArrowLeft, BsCheckCircleFill } from 'react-icons/bs'
import { Button, Card, CardBody, Col, Container, Form, Row } from 'react-bootstrap'

const paymentOptions: { value: PaymentMethod; label: string; detail: string }[] = [
  {
    value: 'mobile_money',
    label: 'Mobile money',
    detail: 'Pay via Airtel Money or MTN MoMo. We will send payment instructions after you place the order.',
  },
  {
    value: 'cash',
    label: 'Cash on collection',
    detail: 'Pay in cash when you collect your order from our shop in Mansa.',
  },
  {
    value: 'bank_transfer',
    label: 'Bank transfer',
    detail: 'Transfer to our business account. Order is processed once payment is confirmed.',
  },
]

const defaultDetails: CheckoutDetails = {
  fullName: '',
  phone: '',
  email: '',
  fulfilment: 'pickup',
  address: '',
  paymentMethod: 'mobile_money',
  notes: '',
}

const CheckoutFlow = () => {
  const router = useRouter()
  const { items, subtotal, clearCart, savePlacedOrder } = useCartContext()
  const { showNotification } = useNotificationContext()
  const [step, setStep] = useState(1)
  const [details, setDetails] = useState<CheckoutDetails>(defaultDetails)

  const steps = useMemo(
    () => [
      { id: 1, label: 'Review' },
      { id: 2, label: 'Details' },
      { id: 3, label: 'Payment' },
      { id: 4, label: 'Confirm' },
    ],
    [],
  )

  if (items.length === 0) {
    return (
      <Container className="py-5">
        <Card className="shadow-sm border-0 text-center py-5">
          <CardBody>
            <h2 className="mb-3">Nothing to checkout</h2>
            <p className="text-body-secondary mb-4">Add products to your cart before continuing.</p>
            <Link href="/#products" className="btn btn-primary">
              Shop products
            </Link>
          </CardBody>
        </Card>
      </Container>
    )
  }

  const updateDetails = <K extends keyof CheckoutDetails>(key: K, value: CheckoutDetails[K]) => {
    setDetails((current) => ({ ...current, [key]: value }))
  }

  const phoneDigits = details.phone.replace(/\D/g, '')
  const isNameValid = details.fullName.trim().length >= 2
  const isPhoneValid = phoneDigits.length >= 9
  const isAddressValid = details.fulfilment === 'pickup' || details.address.trim().length >= 5

  const handleContinueToPayment = () => {
    if (!isNameValid) {
      showNotification({ type: 'error', title: 'Name required', message: 'Please enter your full name.' })
      return
    }
    if (!isPhoneValid) {
      showNotification({
        type: 'error',
        title: 'Phone required',
        message: 'Please enter a valid phone number (at least 9 digits).',
      })
      return
    }
    if (!isAddressValid) {
      showNotification({
        type: 'error',
        title: 'Address required',
        message: 'Please enter your delivery address.',
      })
      return
    }
    setStep(3)
  }

  const placeOrder = () => {
    const orderNumber = `ST-${Date.now().toString().slice(-8)}`
    const placedAt = new Date().toISOString()

    savePlacedOrder({
      orderNumber,
      items: [...items],
      subtotal,
      details,
      placedAt,
    })

    clearCart()
    showNotification({
      type: 'success',
      title: 'Order placed',
      message: `Your order ${orderNumber} has been received.`,
    })
    router.push(`/checkout/confirmation?order=${orderNumber}`)
  }

  return (
    <Container className="py-5">
      <div className="d-flex align-items-center gap-2 mb-4">
        <Button variant="link" className="p-0 text-body" onClick={() => (step === 1 ? router.push('/cart') : setStep(step - 1))}>
          <BsArrowLeft className="me-1" />
          Back
        </Button>
        <h1 className="h3 mb-0">Checkout</h1>
      </div>

      <Row className="g-2 g-md-4 mb-4">
        {steps.map((item) => (
          <Col key={item.id} xs={3}>
            <div className={`text-center ${step >= item.id ? 'text-primary' : 'text-body-secondary'}`}>
              <div
                className={`rounded-circle d-inline-flex align-items-center justify-content-center mb-2 ${step >= item.id ? 'bg-primary text-white' : 'bg-light'}`}
                style={{ width: 36, height: 36 }}
              >
                {step > item.id ? <BsCheckCircleFill /> : item.id}
              </div>
              <div className="small fw-semibold">{item.label}</div>
            </div>
          </Col>
        ))}
      </Row>

      <Row className="g-4">
        <Col lg={8}>
          {step === 1 && (
            <Card className="shadow-sm border-0">
              <CardBody>
                <h5 className="mb-3">Review your order</h5>
                {items.map((item) => (
                  <div key={item.id} className="d-flex justify-content-between py-2 border-bottom">
                    <div>
                      <div className="fw-semibold">{item.name}</div>
                      <div className="small text-body-secondary">
                        Qty {item.quantity} × {formatPrice(item.price)}
                      </div>
                    </div>
                    <div className="text-success fw-semibold">{formatPrice(item.price * item.quantity)}</div>
                  </div>
                ))}
                <Button type="button" className="mt-4" onClick={() => setStep(2)}>
                  Continue to details
                </Button>
              </CardBody>
            </Card>
          )}

          {step === 2 && (
            <Card className="shadow-sm border-0">
              <CardBody>
                <h5 className="mb-3">Your details</h5>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Label>Full name *</Form.Label>
                    <Form.Control value={details.fullName} onChange={(e) => updateDetails('fullName', e.target.value)} placeholder="Your full name" />
                  </Col>
                  <Col md={6}>
                    <Form.Label>Phone *</Form.Label>
                    <Form.Control
                      type="tel"
                      value={details.phone}
                      onChange={(e) => updateDetails('phone', e.target.value)}
                      placeholder="e.g. 0977161341"
                      isInvalid={details.phone.length > 0 && !isPhoneValid}
                    />
                    {details.phone.length > 0 && !isPhoneValid && (
                      <Form.Text className="text-danger">Enter at least 9 digits</Form.Text>
                    )}
                  </Col>
                  <Col md={12}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={details.email}
                      onChange={(e) => updateDetails('email', e.target.value)}
                      placeholder="you@example.com"
                    />
                  </Col>
                  <Col md={12}>
                    <Form.Label>Fulfilment *</Form.Label>
                    <div className="d-flex flex-wrap gap-3">
                      {(['pickup', 'delivery'] as FulfilmentMethod[]).map((option) => (
                        <Form.Check
                          key={option}
                          type="radio"
                          name="fulfilment"
                          id={`fulfilment-${option}`}
                          label={option === 'pickup' ? 'Collect from shop' : 'Delivery'}
                          checked={details.fulfilment === option}
                          onChange={() => updateDetails('fulfilment', option)}
                        />
                      ))}
                    </div>
                  </Col>
                  {details.fulfilment === 'pickup' && (
                    <Col md={12}>
                      <div className="bg-light rounded p-3 small">
                        Collect from: {autoPartsContact.address}
                        <br />
                        Hours: {autoPartsContact.hours}
                      </div>
                    </Col>
                  )}
                  {details.fulfilment === 'delivery' && (
                    <Col md={12}>
                      <Form.Label>Delivery address *</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={details.address}
                        onChange={(e) => updateDetails('address', e.target.value)}
                        placeholder="Street, area, town"
                      />
                    </Col>
                  )}
                  <Col md={12}>
                    <Form.Label>Order notes</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      value={details.notes}
                      onChange={(e) => updateDetails('notes', e.target.value)}
                      placeholder="Vehicle make/model, part numbers, or special instructions"
                    />
                  </Col>
                </Row>
                <Button type="button" className="mt-4" onClick={handleContinueToPayment}>
                  Continue to payment
                </Button>
              </CardBody>
            </Card>
          )}

          {step === 3 && (
            <Card className="shadow-sm border-0">
              <CardBody>
                <h5 className="mb-3">Payment method</h5>
                <div className="d-grid gap-3">
                  {paymentOptions.map((option) => (
                    <label
                      key={option.value}
                      className={`border rounded p-3 d-block ${details.paymentMethod === option.value ? 'border-primary bg-primary bg-opacity-10' : ''}`}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="d-flex gap-2">
                        <Form.Check
                          type="radio"
                          name="paymentMethod"
                          checked={details.paymentMethod === option.value}
                          onChange={() => updateDetails('paymentMethod', option.value)}
                        />
                        <div>
                          <div className="fw-semibold">{option.label}</div>
                          <div className="small text-body-secondary">{option.detail}</div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
                <Button type="button" className="mt-4" onClick={() => setStep(4)}>
                  Review order
                </Button>
              </CardBody>
            </Card>
          )}

          {step === 4 && (
            <Card className="shadow-sm border-0">
              <CardBody>
                <h5 className="mb-3">Confirm your order</h5>
                <ul className="list-unstyled mb-4">
                  <li className="mb-2">
                    <strong>Name:</strong> {details.fullName}
                  </li>
                  <li className="mb-2">
                    <strong>Phone:</strong> {details.phone}
                  </li>
                  {details.email && (
                    <li className="mb-2">
                      <strong>Email:</strong> {details.email}
                    </li>
                  )}
                  <li className="mb-2">
                    <strong>Fulfilment:</strong> {details.fulfilment === 'pickup' ? 'Collect from shop' : 'Delivery'}
                  </li>
                  {details.fulfilment === 'delivery' && (
                    <li className="mb-2">
                      <strong>Address:</strong> {details.address}
                    </li>
                  )}
                  <li className="mb-2">
                    <strong>Payment:</strong> {paymentOptions.find((option) => option.value === details.paymentMethod)?.label}
                  </li>
                  {details.notes && (
                    <li className="mb-2">
                      <strong>Notes:</strong> {details.notes}
                    </li>
                  )}
                </ul>
                <Button type="button" variant="primary" onClick={placeOrder}>
                  Place order — {formatPrice(subtotal)}
                </Button>
              </CardBody>
            </Card>
          )}
        </Col>

        <Col lg={4}>
          <Card className="shadow-sm border-0 sticky-top" style={{ top: 100 }}>
            <CardBody>
              <h5 className="mb-3">Order summary</h5>
              {items.map((item) => (
                <div key={item.id} className="d-flex justify-content-between small mb-2">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
              <hr />
              <div className="d-flex justify-content-between align-items-center">
                <span className="h5 mb-0">Total</span>
                <span className="h4 text-success mb-0">{formatPrice(subtotal)}</span>
              </div>
              <p className="small text-body-secondary mt-3 mb-0">
                All prices are in ZMW. Our team will contact you to confirm stock and payment details.
              </p>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default CheckoutFlow
