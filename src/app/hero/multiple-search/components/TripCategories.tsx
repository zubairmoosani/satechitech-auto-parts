'use client'
import Image from "next/image";
import Link from "next/link";
import { Card, Col, Container, Row } from "react-bootstrap";
import { tripCategories } from "../data";

const TripCategories = () => {
  return (
    <section>
      <Container>
        <Row className="g-4">
          {tripCategories.map((item, idx) => {
            return (
              <Col sm={6} md={4} lg={3} xl={2} key={idx}>
                <Card className="card-body bg-light h-100 align-items-center justify-content-center">
                  <div className="d-flex align-items-center">
                    <Image alt="" src={item.image} className="h-30px me-3" width={30} />
                    <h6 className="card-title mb-0">
                      <Link href="" className="stretched-link">
                        {item.name}
                      </Link>
                    </h6>
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
};

export default TripCategories;
