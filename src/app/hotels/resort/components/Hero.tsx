'use client'
import { Col, Container, Row } from 'react-bootstrap'
import resortBg from '@/assets/images/category/hotel/resort/bg-01.jpg'
import Link from 'next/link'

const Hero = () => {
  return (
    <div
      className="position-relative py-8 py-sm-9"
      style={{ backgroundImage: `url(${resortBg.src})`, backgroundPosition: 'center left', backgroundSize: 'cover', zIndex: -1 }}
    >
      <div className="bg-overlay bg-dark opacity-2" />
      <Container className="z-index-9 position-relative">
        <Row>
          <Col xl={8} className="m-auto text-center py-xl-8">
            <h1 className="display-4 text-white mb-3">A World Of Luxury Awaits You</h1>
            <h5 className="text-white mb-3">Discover a New Look of Luxury Resorts.</h5>
            <Link href="" className="btn btn-lg btn-dark mb-0">
              Discover More
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Hero
