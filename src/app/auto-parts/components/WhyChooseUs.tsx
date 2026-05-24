'use client'
import { autoPartsFeatures, sectionCopy } from '@/app/auto-parts/data'
import clsx from 'clsx'
import { Card, Col, Container, Row } from 'react-bootstrap'

const WhyChooseUs = () => {
  const { whyUs } = sectionCopy

  return (
    <section className="pt-0 pt-xl-5">
      <Container>
        <Row className="mb-4">
          <Col lg={8} className="mx-auto text-center">
            <h2 className="mb-2">{whyUs.title}</h2>
            <p className="text-body-secondary mb-0">{whyUs.subtitle}</p>
          </Col>
        </Row>
        <Row className="g-4">
          {autoPartsFeatures.map((item, idx) => {
            const Icon = item.icon
            return (
              <Col key={idx} sm={6} lg={3}>
                <Card className="card-body shadow p-4 h-100">
                  <div className={clsx(item.variant, 'icon-lg bg-opacity-10 rounded-circle mb-4 flex-centered')}>
                    <Icon className="fs-5" />
                  </div>
                  <h5>{item.title}</h5>
                  <p className="mb-0">{item.description}</p>
                </Card>
              </Col>
            )
          })}
        </Row>
      </Container>
    </section>
  )
}

export default WhyChooseUs
