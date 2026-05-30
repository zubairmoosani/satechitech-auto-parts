import { featuredPartsData, formatPrice, sectionCopy } from '@/app/auto-parts/data'
import Image from 'next/image'
import { Card, CardBody, Col, Container, Row } from 'react-bootstrap'
import { BsTag } from 'react-icons/bs'
import { FaStar } from 'react-icons/fa6'

const FeaturedParts = () => {
  const { featured } = sectionCopy

  return (
    <section className="pt-5 pt-lg-6">
      <Container>
        <Row className="mb-4">
          <Col lg={8} className="mx-auto text-center">
            <h2 className="mb-2">{featured.title}</h2>
            <p className="text-body-secondary mb-0">{featured.subtitle}</p>
          </Col>
        </Row>
        <Row className="g-4">
          {featuredPartsData.map((part, idx) => (
            <Col key={part.name + idx} sm={6} xl={3}>
              <Card className="card-img-scale overflow-hidden bg-transparent">
                <div className="card-img-scale-wrapper rounded-3">
                  <Image src={part.image} className="card-img" alt={part.name} />
                  <div className="position-absolute bottom-0 start-0 p-3">
                    <div className="badge text-bg-dark fs-6 rounded-pill d-flex">
                      <BsTag className="me-2" />
                      {part.category}
                    </div>
                  </div>
                </div>
                <CardBody className="px-2">
                  <h5 className="card-title">{part.name}</h5>
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="text-success mb-0">
                      {formatPrice(part.price)}
                      <small className="fw-light"> /unit</small>
                    </h6>
                    <h6 className="mb-0 d-flex align-items-center">
                      {part.rating}
                      <FaStar size={18} className="text-warning ms-1" />
                    </h6>
                  </div>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default FeaturedParts
