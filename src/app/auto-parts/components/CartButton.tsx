'use client'

import { useCartContext } from '@/states'
import { Button } from 'react-bootstrap'
import { FaCartShopping } from 'react-icons/fa6'

const CartButton = () => {
  const { itemCount, openCart } = useCartContext()

  return (
    <Button
      variant="light"
      className="position-relative flex-centered p-2 ms-lg-3"
      aria-label="Open shopping cart"
      onClick={openCart}
    >
      <FaCartShopping size={20} />
      {itemCount > 0 && (
        <span
          className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary"
          style={{ fontSize: '0.65rem' }}
        >
          {itemCount}
        </span>
      )}
    </Button>
  )
}

export default CartButton
