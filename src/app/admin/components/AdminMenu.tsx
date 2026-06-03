'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const productLinks = [
  { label: 'All Products', href: '/admin/products' },
  { label: 'Add Product', href: '/admin/products/add' },
]

type AdminMenuProps = {
  onItemClick?: () => void
}

const AdminMenu = ({ onItemClick }: AdminMenuProps) => {
  const pathname = usePathname()

  return (
    <ul className="navbar-nav flex-column admin-simple-nav">
      {productLinks.map((item) => (
        <li key={item.href} className="nav-item">
          <Link
            href={item.href}
            onClick={() => onItemClick?.()}
            className={clsx('nav-link', { active: pathname === item.href })}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default AdminMenu
