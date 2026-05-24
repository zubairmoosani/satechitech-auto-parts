import signInImg from "@/assets/images/element/signin.svg";
import logoIcon from "@/assets/images/logo-icon.svg";
import Image from "next/image";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import Form from "./components/Form";

const SignUp = () => {
  return (
    <>
      <main>
        <section className="vh-xxl-100">
          <Container className="h-100 d-flex px-0 px-sm-4">
            <Row className="justify-content-center align-items-center m-auto">
              <Col xs={12}>
                <div className="bg-mode shadow rounded-3 overflow-hidden">
                  <Row className="g-0">
                    <Col
                      lg={6}
                      className="d-md-flex align-items-center order-2 order-lg-1"
                    >
                      <div className="p-3 p-lg-5">
                        <Image alt="" src={signInImg} />
                      </div>

                      <div className="vr opacity-1 d-none d-lg-block" />
                    </Col>

                    <Col lg={6} className="order-1">
                      <div className="p-4 p-sm-6">
                        <Link href="/">
                          <Image
                            width={50}
                            height={50}
                            className="h-50px mb-4"
                            src={logoIcon}
                            alt="logo"
                          />
                        </Link>

                        <h1 className="mb-2 h3">Create new account</h1>
                        <p className="mb-0">
                          Already a member?
                          <Link href="/auth/sign-in"> Log in</Link>
                        </p>
                        <Form />
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    </>
  );
};

export default SignUp;
