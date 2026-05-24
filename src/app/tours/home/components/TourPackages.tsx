'use client'
import { Col, Container, Row } from 'react-bootstrap'
import { tourPackages } from '../data'
import TourPackageCard from './TourPackageCard'

const TourPackages = () => {
  return (
    <section className="pt-0 pt-md-5">
      <Container>
        <Row className="mb-4">
          <Col xs={12} className="text-center">
            <h2 className="mb-0">Our Best Packages</h2>
          </Col>
        </Row>
        <Row className="g-4">
          <TourPackageCard tourPackages={tourPackages} />
        </Row>
      </Container>
    </section>
  )
}

export default TourPackages
