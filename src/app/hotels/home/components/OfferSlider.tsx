"use client";
import offer1 from "@/assets/images/offer/01.jpg";
import offer2 from "@/assets/images/offer/02.jpg";
import offer3 from "@/assets/images/offer/03.jpg";
import offer4 from "@/assets/images/offer/04.jpg";
import TinySlider from "@/components/TinySlider";
import { useLayoutContext } from "@/states";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import { renderToString } from "react-dom/server";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { type TinySliderSettings } from "tiny-slider";
import "tiny-slider/dist/tiny-slider.css";

const OfferSlider = () => {
  const { dir } = useLayoutContext();

  const offerSliderSettings: TinySliderSettings = {
    arrowKeys: true,
    autoplayButton: false,
    autoplayButtonOutput: false,
    nested: "inner",
    controlsText: [
      renderToString(<BsArrowLeft size={16} />),
      renderToString(<BsArrowRight size={16} />),
    ],
    autoplay: true,
    controls: true,
    edgePadding: 2,
    items: 3,
    autoplayDirection: dir !== "rtl" ? "forward" : "backward",
    nav: false,
    responsive: {
      1: {
        items: 1,
        gutter: 10,
      },
      768: {
        items: 1,
        gutter: 10,
      },
      992: {
        items: 2,
        gutter: 30,
      },
      1200: {
        items: 3,
        gutter: 30,
      },
    },
  };

  return (
    <section className="pb-2 pb-lg-5">
      <Container>
        <div className="tiny-slider arrow-round arrow-blur arrow-hover">
          <TinySlider settings={offerSliderSettings}>
            <div>
              <Card className="border rounded-3 overflow-hidden">
                <Row className="row g-0 align-items-center">
                  <Col sm={6}>
                    <Image alt="" src={offer1} className="card-img rounded-0" />
                  </Col>

                  <Col sm={6}>
                    <CardBody className="px-3">
                      <h6 className="card-title">
                        <Link href="/offer-detail" className="stretched-link">
                          Daily 50 Lucky Winners get a Free Stay
                        </Link>
                      </h6>
                      <p className="mb-0">Valid till: 15 Nov</p>
                    </CardBody>
                  </Col>
                </Row>
              </Card>
            </div>
            <div>
              <Card className="border rounded-3 overflow-hidden">
                <Row className="g-0 align-items-center">
                  <Col sm={6}>
                    <Image src={offer4} alt="" className="card-img rounded-0" />
                  </Col>

                  <Col sm={6}>
                    <CardBody className="px-3">
                      <CardTitle>
                        <Link href="/offer-detail" className="stretched-link">
                          Up to 60% OFF
                        </Link>
                      </CardTitle>
                      <p className="mb-0">On Hotel Bookings Online</p>
                    </CardBody>
                  </Col>
                </Row>
              </Card>
            </div>
            <div>
              <Card className="border rounded-3 overflow-hidden">
                <Row className="g-0 align-items-center">
                  <Col sm={6}>
                    <Image alt="" src={offer3} className="card-img rounded-0" />
                  </Col>

                  <Col sm={6}>
                    <CardBody className="px-3">
                      <h6 className="card-title">
                        <Link href="/offer-detail" className="stretched-link">
                          Book &amp; Enjoy
                        </Link>
                      </h6>
                      <p className="mb-0">
                        20% Off on the best available room rate
                      </p>
                    </CardBody>
                  </Col>
                </Row>
              </Card>
            </div>
            <div>
              <Card className="border rounded-3 overflow-hidden">
                <Row className="g-0 align-items-center">
                  <Col sm={6}>
                    <Image alt="" src={offer2} className="card-img rounded-0" />
                  </Col>
                  <Col sm={6}>
                    <CardBody className="px-3">
                      <h6 className="card-title">
                        <Link href="/offer-detail" className="stretched-link">
                          Hot Summer Nights
                        </Link>
                      </h6>
                      <p className="mb-0">Up to 3 nights free!</p>
                    </CardBody>
                  </Col>
                </Row>
              </Card>
            </div>
          </TinySlider>
        </div>
      </Container>
    </section>
  );
};

export default OfferSlider;
