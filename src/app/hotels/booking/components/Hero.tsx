import element17 from "@/assets/images/element/17.svg";
import Image from "next/image";
import Link from "next/link";
import { Card, CardBody, Col, Container, Row } from "react-bootstrap";
import { BsHouse } from "react-icons/bs";

const Hero = () => {
  return (
    <section className="py-0">
      <Container>
        <Card className="bg-light overflow-hidden px-sm-5">
          <Row className="align-items-center g-4">
            <Col sm={9}>
              <CardBody>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb breadcrumb-dots mb-0">
                    <li className="breadcrumb-item">
                      <Link href="/" className="items-center">
                        <BsHouse className=" me-2" /> Home
                      </Link>
                    </li>
                    <li className="breadcrumb-item">Hotel detail</li>
                    <li className="breadcrumb-item active">Booking</li>
                  </ol>
                </nav>
                <h1 className="m-0 h2 card-title">Review your Booking</h1>
              </CardBody>
            </Col>
            <Col sm={3} className="text-end d-none d-sm-block">
              <Image alt="image" src={element17} className="mb-n4" />
            </Col>
          </Row>
        </Card>
      </Container>
    </section>
  );
};

export default Hero;
