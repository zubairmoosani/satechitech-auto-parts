import { autoPartsContact, companyInfo, socialLinks } from '@/app/auto-parts/data'
import { currentYear } from '@/states'
import Image from 'next/image'
import Link from 'next/link'
import { Col, Container, Row } from 'react-bootstrap'
import { BsEnvelope, BsGeoAlt, BsTelephone } from 'react-icons/bs'
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa6'

const footerNav = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/#products' },
  { label: 'Cart', href: '/cart' },
  { label: 'About', href: '/#about-us' },
  { label: 'Contact', href: '/#contact-us' },
]

const legalNav = [
  { label: 'Refund Policy', href: '/refund-policy' },
  { label: 'Cancellation Policy', href: '/cancellation-policy' },
]

const socialIcon = (label: string) => {
  if (label === 'WhatsApp') return FaWhatsapp
  if (label === 'Facebook') return FaFacebookF
  if (label === 'Instagram') return FaInstagram
  return FaWhatsapp
}

const AutoPartsFooter = () => {
  return (
    <footer className="bg-dark pt-5 pb-3">
      <Container>
        <Row className="g-4">
          <Col md={5} lg={4}>
            <Link href="/" className="d-inline-block">
              <Image
                src={companyInfo.logo}
                alt={companyInfo.logoAlt}
                width={180}
                height={90}
                className="object-fit-contain rounded-2 bg-white p-2"
                style={{ width: 'auto', height: 72, maxWidth: 180 }}
              />
            </Link>
            <h6 className="text-white mt-3 mb-2">{companyInfo.legalName}</h6>
            <p className="text-body-secondary mb-0">{companyInfo.tagline}</p>
          </Col>

          <Col sm={6} md={4} lg={2}>
            <h6 className="text-white mb-3">Quick links</h6>
            <ul className="nav flex-column">
              {footerNav.map((item) => (
                <li key={item.label} className="nav-item">
                  <Link href={item.href} className="nav-link text-body-secondary text-primary-hover px-0 py-1">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>

          <Col sm={6} md={4} lg={2}>
            <h6 className="text-white mb-3">Policies</h6>
            <ul className="nav flex-column">
              {legalNav.map((item) => (
                <li key={item.label} className="nav-item">
                  <Link href={item.href} className="nav-link text-body-secondary text-primary-hover px-0 py-1">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>

          <Col sm={12} md={12} lg={4}>
            <h6 className="text-white mb-3">Contact</h6>
            <p className="text-body-secondary d-flex align-items-start mb-2">
              <BsGeoAlt className="me-2 mt-1 flex-shrink-0" />
              {autoPartsContact.address}
            </p>
            <p className="mb-2">
              <Link href={autoPartsContact.phoneHref} className="text-body-secondary text-primary-hover d-flex align-items-center">
                <BsTelephone className="me-2" />
                {autoPartsContact.phone}
              </Link>
            </p>
            <p className="mb-2">
              <Link
                href={autoPartsContact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-body-secondary text-primary-hover d-flex align-items-center"
              >
                <FaWhatsapp className="me-2" />
                {autoPartsContact.whatsapp}
              </Link>
            </p>
            <p className="mb-0">
              <Link href={autoPartsContact.emailHref} className="text-body-secondary text-primary-hover d-flex align-items-center">
                <BsEnvelope className="me-2" />
                {autoPartsContact.email}
              </Link>
            </p>
          </Col>
        </Row>

        <hr className="border-secondary opacity-25 mt-4 mb-3" />

        <div className="d-flex flex-wrap justify-content-center align-items-center gap-2 gap-md-3 mb-3">
          <span className="text-body-secondary small me-1">Follow us:</span>
          {socialLinks.map((item) => {
            const Icon = socialIcon(item.label)
            return (
              <Link
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-outline-light border-secondary d-inline-flex align-items-center gap-2"
                aria-label={item.ariaLabel}
              >
                <Icon />
                <span className="d-none d-sm-inline">{item.label}</span>
              </Link>
            )
          })}
        </div>

        <p className="text-body-secondary text-center mb-0 small">
          ©{currentYear} {companyInfo.legalName}. All rights reserved.
        </p>
      </Container>
    </footer>
  )
}

export default AutoPartsFooter
