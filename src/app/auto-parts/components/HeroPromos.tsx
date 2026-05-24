import { heroPromosData } from '@/app/auto-parts/data'
import Image from 'next/image'
import { Card, CardBody, Col, Row } from 'react-bootstrap'

const HeroPromos = () => {
  return (
    <Row className="g-4">
      {heroPromosData.map((item) => (
        <Col key={item.title} sm={6} lg={4}>
          <Card className="border-0 shadow-sm h-100 overflow-hidden">
            <div className="position-relative overflow-hidden">
              <div className="ratio ratio-4x3">
                <Image
                  alt={item.title}
                  src={item.image}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-fit-cover"
                />
              </div>
              <span className="badge bg-primary position-absolute top-0 start-0 m-3 z-index-1">
                {item.badge}
              </span>
            </div>
            <CardBody className="p-3 p-md-4">
              <h6 className="mb-2">{item.title}</h6>
              <p className="small text-body-secondary mb-0">{item.detail}</p>
            </CardBody>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default HeroPromos
