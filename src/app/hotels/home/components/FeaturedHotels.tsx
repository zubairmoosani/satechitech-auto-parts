import { currency } from '@/states'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardBody, Col, Container, Row } from 'react-bootstrap'
import { BsGeoAlt } from 'react-icons/bs'
import { FaStar } from 'react-icons/fa6'
import { featuredHotelsData } from '../data'

const FeaturedHotels = () => {
  return (
    <section>
      <Container>
        <Row className="mb-4">
          <Col xs={12} className="text-center">
            <h2 className="mb-0">Featured Hotels</h2>
          </Col>
        </Row>
        <Row className="g-4">
          {(featuredHotelsData ?? []).map((hotel, idx) => (
            <Col key={hotel.name + idx} sm={6} xl={3}>
              <Card className="card-img-scale overflow-hidden bg-transparent">
                <div className="card-img-scale-wrapper rounded-3">
                  <Image src={hotel.image} className="card-img" alt="hotel image" />
                  <div className="position-absolute bottom-0 start-0 p-3">
                    <div className="badge text-bg-dark fs-6 rounded-pill stretched-link d-flex">
                      <BsGeoAlt className=" me-2" />
                      {hotel.location}
                    </div>
                  </div>
                </div>
                <CardBody className="px-2">
                  <h5 className="card-title">
                    <Link href="/hotels/hotel-detail" className="stretched-link">
                      {hotel.name}
                    </Link>
                  </h5>
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="text-success mb-0">
                      {currency}
                      {hotel.price}
                      <small className="fw-light">/starting at</small>
                    </h6>
                    <h6 className="mb-0 d-flex">
                      {hotel.price}
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

export default FeaturedHotels
