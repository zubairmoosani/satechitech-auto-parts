'use client'
import logoLight from '@/assets/images/logo-light.svg'
import { currentYear, developedByLink } from '@/states'
import Image from 'next/image'
import Link from 'next/link'
import { Col, Container, Row } from 'react-bootstrap'
import { FaFacebook, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa6'

const Footer2 = () => {
  return (
    <>
      <footer className="bg-dark p-3">
        <Container>
          <Row className="align-items-center">
            <Col md={4}>
              <div className="text-center text-md-start mb-3 mb-md-0">
                <Link href="/">
                  <Image className="h-30px" src={logoLight} alt="logo" width={97} />
                </Link>
              </div>
            </Col>
            <Col md={4}>
              <div className="text-body-secondary text-primary-hover">
                Copyrights ©{currentYear} Booking. Build by&nbsp;
                <Link href={developedByLink} className="text-body-secondary">
                  StackBros
                </Link>
                .
              </div>
            </Col>
            <Col md={4}>
              <ul className="list-inline mb-0 text-center text-md-end">
                <li className="list-inline-item ms-2">
                  <Link href="">
                    <FaFacebook className="text-white" />
                  </Link>
                </li>
                <li className="list-inline-item ms-2">
                  <Link href="">
                    <FaInstagram className="text-white" />
                  </Link>
                </li>
                <li className="list-inline-item ms-2">
                  <Link href="">
                    <FaLinkedinIn className="text-white" />
                  </Link>
                </li>
                <li className="list-inline-item ms-2">
                  <Link href="">
                    <FaTwitter className="text-white" />
                  </Link>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  )
}

export default Footer2
