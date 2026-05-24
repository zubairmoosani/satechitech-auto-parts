import comingSoon from "@/assets/images/element/coming-soon.svg";
import Image from "next/image";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaLinkedin,
  FaTwitterSquare,
} from "react-icons/fa";
import Form from "./components/Form";

const ComingSoon = () => {
  return (
    <>
      <main>
        <section className="p-xl-0">
          <Container>
            <Row className="d-flex justify-content-center align-items-center text-center vh-100">
              <Col xl={8}>
                <h6 className="text-primary">Coming Soon</h6>
                <h1>New website is on a roll!!</h1>
                <p className="mb-0">
                  Hey, you! Booking is coming. We are doing our best to launch
                  our website and we will be back soon.
                </p>
                <Form />
                <ul className="list-inline hstack flex-wrap gap-2 gap-lg-4 h6 justify-content-center mt-4 mb-0">
                  <li className="list-inline-item">
                    <Link className="items-center gap-1 text-facebook" href="">
                      <FaFacebookSquare /> Facebook
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link
                      className="items-center gap-1 text-instagram-gradient"
                      href=""
                    >
                      <FaInstagramSquare /> Instagram
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link className="items-center gap-1 text-twitter" href="">
                      <FaTwitterSquare /> Twitter
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link className="items-center gap-1 text-linkedin" href="">
                      <FaLinkedin /> Linkedin
                    </Link>
                  </li>
                </ul>
                <Image
                  alt=""
                  src={comingSoon}
                  className="h-sm-300px h-xxl-400px mt-4"
                />
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    </>
  );
};

export default ComingSoon;
