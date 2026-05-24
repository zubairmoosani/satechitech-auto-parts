import { sectionCopy, trustedBrandLabels } from '@/app/auto-parts/data'
import { Col, Container, Row } from 'react-bootstrap'

const TopBrands = () => {
  const { brands } = sectionCopy

  return (
    <section className="py-0 py-md-5">
      <Container>
        <Row className="mb-4">
          <Col lg={8} className="mx-auto text-center">
            <h2 className="mb-2">{brands.title}</h2>
            <p className="text-body-secondary mb-0">{brands.subtitle}</p>
          </Col>
        </Row>
        <Row className="g-3 justify-content-center">
          {trustedBrandLabels.map((label) => (
            <Col key={label} xs={6} sm={4} md={3} lg={2}>
              <div className="card card-body shadow-sm text-center py-3 px-2 h-100">
                <span className="fw-medium small mb-0">{label}</span>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default TopBrands
