'use client'
import Image from "next/image";
import Link from "next/link";
import { Card, CardBody, Col, Container, Row } from "react-bootstrap";
import { nearbyPlacesData } from "../data";

const NearbyPlaces = () => {
  return (
    <section>
      <Container>
        <Row className="mb-4">
          <Col xs={12} className="text-center">
            <h2 className="mb-0">Explore Nearby</h2>
          </Col>
        </Row>
        <Row className="g-4 g-md-5">
          {(nearbyPlacesData ?? []).map((place, idx) => (
            <Col xs={6} sm={4} lg={3} xl={2} key={idx + place.name}>
              <Card className="bg-transparent text-center p-1 h-100">
                <Image alt="" src={place.image} className="rounded-circle" />
                <CardBody className="p-0 pt-3">
                  <h5 className="card-title">
                    <Link href="" className="stretched-link">
                      {place.name}
                    </Link>
                  </h5>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default NearbyPlaces;
