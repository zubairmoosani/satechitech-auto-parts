import { autoPartsContact, pageImages, sectionCopy } from '@/app/auto-parts/data'
import Image from 'next/image'
import Link from 'next/link'
import { Card, Col, Container, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { BsClock, BsEnvelope, BsGeoAlt, BsTelephone } from 'react-icons/bs'
import { FaWhatsapp } from 'react-icons/fa6'

const ContactUs = () => {
  const { contact } = sectionCopy

  return (
    <section id="contact-us" className="pt-0 pt-lg-5 pb-5">
      <Container>
        <Row className="mb-4 mb-md-5">
          <Col lg={8} className="mx-auto text-center">
            <h2 className="mb-3">{contact.title}</h2>
            <p className="lead mb-0">{contact.subtitle}</p>
          </Col>
        </Row>

        <Row className="g-4 g-lg-5 align-items-center mb-4 mb-lg-5">
          <Col lg={6}>
            <div className="position-relative rounded-3 overflow-hidden shadow-sm h-100" style={{ minHeight: 360 }}>
              <Image
                alt="Visit SATECHI TECH ENTERPRISES auto parts shop"
                src={pageImages.contact}
                fill
                className="object-fit-cover"
                sizes="(max-width: 992px) 100vw, 50vw"
              />
            </div>
          </Col>
          <Col lg={6}>
            <Card className="card-body shadow-sm p-4 p-md-5 h-100 overflow-hidden">
              <h5 className="mb-4">{contact.detailsTitle}</h5>
              <ListGroup variant="flush" className="border-0">
                <ListGroupItem className="px-0 border-0 d-flex align-items-start gap-3 overflow-hidden">
                  <span className="icon-md bg-light rounded flex-centered flex-shrink-0">
                    <BsGeoAlt className="text-primary" />
                  </span>
                  <div className="min-w-0 flex-grow-1">
                    <h6 className="mb-1">Shop address</h6>
                    <p className="mb-0 text-body-secondary text-break">{autoPartsContact.address}</p>
                  </div>
                </ListGroupItem>
                <ListGroupItem className="px-0 border-0 d-flex align-items-start gap-3 overflow-hidden">
                  <span className="icon-md bg-light rounded flex-centered flex-shrink-0">
                    <BsClock className="text-primary" />
                  </span>
                  <div className="min-w-0 flex-grow-1">
                    <h6 className="mb-1">Opening hours</h6>
                    <p className="mb-0 text-body-secondary text-break">{autoPartsContact.hours}</p>
                  </div>
                </ListGroupItem>
                <ListGroupItem className="px-0 border-0 d-flex align-items-start gap-3 overflow-hidden">
                  <span className="icon-md bg-light rounded flex-centered flex-shrink-0">
                    <BsTelephone className="text-primary" />
                  </span>
                  <div className="min-w-0 flex-grow-1">
                    <h6 className="mb-1">Phone</h6>
                    <Link
                      href={autoPartsContact.phoneHref}
                      className="text-body-secondary text-primary-hover text-break d-inline"
                    >
                      {autoPartsContact.phone}
                    </Link>
                  </div>
                </ListGroupItem>
                <ListGroupItem className="px-0 border-0 d-flex align-items-start gap-3 overflow-hidden">
                  <span className="icon-md bg-light rounded flex-centered flex-shrink-0">
                    <FaWhatsapp className="text-success" />
                  </span>
                  <div className="min-w-0 flex-grow-1">
                    <h6 className="mb-1">WhatsApp</h6>
                    <Link
                      href={autoPartsContact.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary text-break d-inline"
                    >
                      {autoPartsContact.whatsapp}
                    </Link>
                  </div>
                </ListGroupItem>
                <ListGroupItem className="px-0 border-0 d-flex align-items-start gap-3 overflow-hidden">
                  <span className="icon-md bg-light rounded flex-centered flex-shrink-0">
                    <BsEnvelope className="text-primary" />
                  </span>
                  <div className="min-w-0 flex-grow-1">
                    <h6 className="mb-1">Email</h6>
                    <Link
                      href={autoPartsContact.emailHref}
                      className="text-body-secondary text-primary-hover text-break"
                      style={{ overflowWrap: 'anywhere' }}
                    >
                      {autoPartsContact.email}
                    </Link>
                  </div>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>

        <Row className="mt-0">
          <Col xs={12}>
            <p className="text-center text-body-secondary small mb-2">{contact.mapTitle}</p>
            <iframe
              title="Katima Mulilo location"
              className="w-100 h-300px grayscale rounded"
              src="https://maps.google.com/maps?q=Katima+Mulilo,+Namibia&hl=en&z=13&output=embed"
              height={400}
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default ContactUs
