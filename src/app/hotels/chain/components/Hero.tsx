"use client";
import hotelImg6 from "@/assets/images/category/hotel/06.jpg";
import Jarallax from "@/components/Jarallax";
import TinySlider from "@/components/TinySlider";
import { jarallaxVideo } from "jarallax";
import "jarallax/dist/jarallax.min.css";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import { renderToString } from "react-dom/server";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { type TinySliderSettings } from "tiny-slider";
import "tiny-slider/dist/tiny-slider.css";

jarallaxVideo();

const Hero = () => {
  const heroSliderSettings: TinySliderSettings = {
    gutter: 1,
    controls: true,
    nav: false,
    controlsText: [
      renderToString(<BsArrowLeft size={16} />),
      renderToString(<BsArrowRight size={16} />),
    ],
    items: 1,
  };

  return (
    <section className="py-0">
      <Container fluid>
        <Row>
          <Col lg={11} className="mx-auto">
            <div className="tiny-slider arrow-round arrow-blur arrow-hover rounded-3 overflow-hidden">
              <TinySlider settings={heroSliderSettings}>
                <div
                  className="card overflow-hidden h-400px h-sm-600px rounded-0"
                  style={{
                    backgroundImage: `url(${hotelImg6.src})`,
                    backgroundPosition: "center left",
                    backgroundSize: "cover",
                  }}
                >
                  <div className="bg-overlay bg-dark opacity-3" />
                  <div className="card-img-overlay d-flex align-items-center">
                    <Container>
                      <Row>
                        <Col xs={11} lg={7}>
                          <h6 className="text-white fw-normal mb-0">
                            💖 Fall in love with the City
                          </h6>
                          <h1 className="text-white display-6">
                            Modern Luxury In Manhattan
                          </h1>
                          <Link href="" className="btn btn-primary mb-0">
                            Reserve Today
                          </Link>
                        </Col>
                      </Row>
                    </Container>
                  </div>
                </div>
                <Jarallax
                  className="card overflow-hidden h-400px h-sm-600px bg-parallax text-center rounded-0"
                  data-jarallax-video="https://www.youtube.com/watch?v=j56YlCXuPFU"
                >
                  <div className="bg-overlay bg-dark opacity-3" />
                  <div className="card-img-overlay d-flex align-items-center">
                    <Container className="w-100 my-auto">
                      <Row className="row justify-content-center">
                        <Col xs={11} lg={8}>
                          <h1 className="text-white">
                            Taking luxury hospitality to new heights
                          </h1>
                          <Link href="" className="btn btn-dark mb-0">
                            Take Me There
                          </Link>
                        </Col>
                      </Row>
                    </Container>
                  </div>
                </Jarallax>
              </TinySlider>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero;
