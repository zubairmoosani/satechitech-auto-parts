'use client'
import { autoPartCategories, type AutoPartCategoryKey } from '@/app/auto-parts/data'
import clsx from 'clsx'
import { Nav, NavItem, NavLink } from 'react-bootstrap'

type CategoryNavProps = {
  active: AutoPartCategoryKey
  onChange: (key: AutoPartCategoryKey) => void
  className?: string
}

const CategoryNav = ({ active, onChange, className }: CategoryNavProps) => {
  return (
    <Nav className={clsx('nav-pills-primary-soft flex-nowrap justify-content-center gap-1', className)}>
      {autoPartCategories.map((item) => {
        const Icon = item.icon
        const isActive = active === item.key
        return (
          <NavItem key={item.key}>
            <NavLink
              as="button"
              type="button"
              className={clsx('nav-link flex-centered mb-0', isActive && 'active')}
              onClick={() => onChange(item.key)}
            >
              <Icon className="me-2" size={16} />
              {item.label}
            </NavLink>
          </NavItem>
        )
      })}
    </Nav>
  )
}

export default CategoryNav
