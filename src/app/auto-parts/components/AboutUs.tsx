import { pageImages, sectionCopy } from '@/app/auto-parts/data'
import Image from 'next/image'
import { Col, Container, Row } from 'react-bootstrap'

const AboutUs = () => {
  const { about } = sectionCopy

  return (
    <section id="about-us" className="pt-0 pt-lg-5">
      <Container>
        <Row className="g-4 g-lg-5 align-items-center">
          <Col lg={6}>
            <h2 className="mb-3">{about.title}</h2>
            <p className="fw-bold mb-3">{about.lead}</p>
            <p className="mb-3">{about.body}</p>
            <p className="mb-0 text-body-secondary">{about.extra}</p>
          </Col>
          <Col lg={6}>
            <Image alt="SATECHI TECH auto parts shop" src={pageImages.about} className="rounded-3 w-100 object-fit-cover" style={{ minHeight: 320 }} />
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default AboutUs
