import errorSvg from "@/assets/images/element/error.svg";
import TopNavBar2 from "@/components/TopNav/TopNavBar2";
import Footer1 from "@/components/footer/Footer1";
import Image from "next/image";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";

const Error = () => {
  return (
    <>
      <TopNavBar2 />
      <main>
        <section>
          <Container>
            <Row className="align-items-center">
              <Col md={10} className="text-center mx-auto">
                <Image alt="" src={errorSvg} className="h-lg-500px mb-4" />
                <h1 className="display-1 text-primary mb-0">404</h1>
                <h2>Oh no, something went wrong!</h2>
                <p className="mb-4">
                  Either something went wrong or this page doesn't exist
                  anymore.
                </p>
                <Link href="/" className="btn btn-light mb-0">
                  Take me to Homepage
                </Link>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
      <Footer1 />
    </>
  );
};

export default Error;
