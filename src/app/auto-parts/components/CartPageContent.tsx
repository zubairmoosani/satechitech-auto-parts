'use client'

import { formatPrice } from '@/app/auto-parts/data'
import { useCartContext } from '@/states'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { BsArrowLeft, BsDash, BsPlus, BsTrash } from 'react-icons/bs'
import { Button, Card, CardBody, Col, Container, Row } from 'react-bootstrap'

const CartPageContent = () => {
  const router = useRouter()
  const { items, subtotal, itemCount, updateQuantity, removeItem } = useCartContext()

  if (items.length === 0) {
    return (
      <Container className="py-5">
        <Card className="shadow-sm border-0 text-center py-5">
          <CardBody>
            <h2 className="mb-3">Your cart is empty</h2>
            <p className="text-body-secondary mb-4">Browse our products and add parts to your cart.</p>
            <Link href="/#products" className="btn btn-primary">
              Shop products
            </Link>
          </CardBody>
        </Card>
      </Container>
    )
  }

  return (
    <Container className="py-5">
      <div className="d-flex align-items-center gap-2 mb-4">
        <Button variant="link" className="p-0 text-body" onClick={() => router.back()}>
          <BsArrowLeft className="me-1" />
          Back
        </Button>
        <h1 className="h3 mb-0">Shopping cart</h1>
        <span className="badge text-bg-secondary">{itemCount} items</span>
      </div>

      <Row className="g-4">
        <Col lg={8}>
          <Card className="shadow-sm border-0">
            <CardBody className="p-0">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className={`d-flex flex-column flex-sm-row gap-3 p-4 ${index < items.length - 1 ? 'border-bottom' : ''}`}
                >
                  <div className="position-relative rounded overflow-hidden flex-shrink-0 mx-auto mx-sm-0" style={{ width: 120, height: 120 }}>
                    <Image src={item.imageSrc} alt={item.name} fill className="object-fit-cover" sizes="120px" />
                  </div>
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-start gap-3">
                      <div>
                        <h5 className="mb-1">{item.name}</h5>
                        <p className="small text-body-secondary mb-0">
                          {item.category} · {item.brand}
                        </p>
                      </div>
                      <Button variant="link" className="text-danger p-0" aria-label="Remove item" onClick={() => removeItem(item.id)}>
                        <BsTrash />
                      </Button>
                    </div>
                    <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mt-3">
                      <div className="d-flex align-items-center border rounded">
                        <Button variant="light" size="sm" className="border-0 px-3" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                          <BsDash />
                        </Button>
                        <span className="px-3 fw-semibold">{item.quantity}</span>
                        <Button variant="light" size="sm" className="border-0 px-3" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <BsPlus />
                        </Button>
                      </div>
                      <h5 className="text-success mb-0">{formatPrice(item.price * item.quantity)}</h5>
                    </div>
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="shadow-sm border-0 sticky-top" style={{ top: 100 }}>
            <CardBody>
              <h5 className="mb-3">Order summary</h5>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-body-secondary">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span className="text-body-secondary">Delivery</span>
                <span className="small">Calculated at checkout</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between align-items-center mb-4">
                <span className="h5 mb-0">Total</span>
                <span className="h4 text-success mb-0">{formatPrice(subtotal)}</span>
              </div>
              <div className="d-grid gap-2">
                <Link href="/checkout" className="btn btn-primary">
                  Proceed to checkout
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

export default CartPageContent
