'use client'

import { formatPrice } from '@/app/auto-parts/data'
import { useCartContext } from '@/states'
import Image from 'next/image'
import Link from 'next/link'
import { Button, Offcanvas } from 'react-bootstrap'
import { BsDash, BsPlus, BsTrash } from 'react-icons/bs'
import { FaCartShopping } from 'react-icons/fa6'

const CartDrawer = () => {
  const { items, subtotal, itemCount, isCartOpen, closeCart, updateQuantity, removeItem } = useCartContext()

  return (
    <Offcanvas show={isCartOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton className="border-bottom">
        <Offcanvas.Title className="d-flex align-items-center gap-2">
          <FaCartShopping />
          Your cart
          {itemCount > 0 && <span className="badge text-bg-primary rounded-pill">{itemCount}</span>}
        </Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body className="d-flex flex-column">
        {items.length === 0 ? (
          <div className="text-center my-auto py-4">
            <FaCartShopping size={40} className="text-body-secondary mb-3" />
            <p className="text-body-secondary mb-3">Your cart is empty.</p>
            <Button variant="primary" onClick={closeCart}>
              Continue shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-grow-1 overflow-auto">
              {items.map((item) => (
                <div key={item.id} className="d-flex gap-3 py-3 border-bottom">
                  <div className="position-relative rounded overflow-hidden flex-shrink-0" style={{ width: 72, height: 72 }}>
                    <Image src={item.imageSrc} alt={item.name} fill className="object-fit-cover" sizes="72px" />
                  </div>
                  <div className="flex-grow-1 min-w-0">
                    <h6 className="mb-1 text-truncate">{item.name}</h6>
                    <p className="small text-body-secondary mb-2">{formatPrice(item.price)}</p>
                    <div className="d-flex align-items-center justify-content-between gap-2">
                      <div className="d-flex align-items-center border rounded">
                        <Button
                          variant="light"
                          size="sm"
                          className="border-0 px-2"
                          aria-label="Decrease quantity"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <BsDash />
                        </Button>
                        <span className="px-2 small fw-semibold">{item.quantity}</span>
                        <Button
                          variant="light"
                          size="sm"
                          className="border-0 px-2"
                          aria-label="Increase quantity"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <BsPlus />
                        </Button>
                      </div>
                      <Button
                        variant="link"
                        className="text-danger p-0"
                        aria-label="Remove item"
                        onClick={() => removeItem(item.id)}
                      >
                        <BsTrash />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-top pt-3 mt-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="h6 mb-0">Subtotal</span>
                <span className="h5 text-success mb-0">{formatPrice(subtotal)}</span>
              </div>
              <div className="d-grid gap-2">
                <Link href="/cart" className="btn btn-outline-primary" onClick={closeCart}>
                  View cart
                </Link>
                <Link href="/checkout" className="btn btn-primary" onClick={closeCart}>
                  Proceed to checkout
                </Link>
              </div>
            </div>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  )
}

export default CartDrawer
