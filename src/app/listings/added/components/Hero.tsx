import congImg from "@/assets/images/element/congratulations.svg";
import Image from "next/image";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";

const Hero = () => {
  return (
    <section className="overflow-hidden pt-0 pt-lg-5">
      <Container>
        <Row>
          <Col md={8} className="text-center mx-auto">
            <Image alt="" src={congImg} className="h-300px my-4" />
            <h1 className="fs-3">
              Your listing has been submitted successfully. 🎉
            </h1>
            <p>
              We will review your item shortly. You will be informed by email
              that your listing has been accepted. Also, make sure your
              <Link href="">Payment and Tax information</Link> is correct and
              valid.
            </p>
            <Link href="/listings/add-listing" className="btn btn-primary mb-5 me-2">
              Preview
            </Link>
            <Link href="/" className="btn btn-light mb-5">
              Back to Homepage
            </Link>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero;
