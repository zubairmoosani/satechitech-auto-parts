'use client'
import { companyInfo } from '@/app/auto-parts/data'
import { useScrollEvent, useToggle } from '@/hooks'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Collapse, Container, Nav, Navbar, NavbarBrand } from 'react-bootstrap'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/#products' },
  { label: 'About', href: '/#about-us' },
  { label: 'Contact', href: '/#contact-us' },
]

const AutoPartsTopNav = () => {
  const pathname = usePathname()
  const { scrollY } = useScrollEvent()
  const { isOpen, toggle } = useToggle(window.innerWidth >= 992)

  return (
    <header className={clsx('navbar-light header-sticky', { 'header-sticky-on': scrollY >= 400 })}>
      <Navbar expand="lg" className="w-100">
        <Container>
          <NavbarBrand as={Link} href="/" className="me-0 py-0">
            <Image
              src={companyInfo.logo}
              alt={companyInfo.logoAlt}
              width={160}
              height={80}
              priority
              className="object-fit-contain rounded-2 bg-white p-2 d-inline-block"
              style={{ width: 'auto', height: 48, maxWidth: 160 }}
            />
          </NavbarBrand>

          <button
            onClick={toggle}
            className="navbar-toggler ms-auto border-0 p-0 p-sm-2"
            type="button"
            aria-controls="auto-parts-navbar"
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-animation">
              <span />
              <span />
              <span />
            </span>
          </button>

          <Collapse in={isOpen}>
            <div className="navbar-collapse" id="auto-parts-navbar">
              <Nav className="mx-auto align-items-lg-center">
                {navItems.map((item) => {
                  const isActive = item.href === '/' && pathname === '/'
                  return (
                    <Nav.Link
                      key={item.label}
                      as={Link}
                      href={item.href}
                      className={clsx('px-3', isActive && 'active')}
                      onClick={() => {
                        if (window.innerWidth < 992) toggle()
                      }}
                    >
                      {item.label}
                    </Nav.Link>
                  )
                })}
              </Nav>
            </div>
          </Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default AutoPartsTopNav
