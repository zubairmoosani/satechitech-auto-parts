'use client'
import TinySlider from '@/components/TinySlider'
import { useLayoutContext } from '@/states'
import { Card, CardText, Col, Container, Row } from 'react-bootstrap'
import { renderToString } from 'react-dom/server'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import { FaArrowRightLong } from 'react-icons/fa6'
import { type TinySliderSettings } from 'tiny-slider'
import 'tiny-slider/dist/tiny-slider.css'
import { testimonialData } from '../data'
import Image from 'next/image'
import Link from 'next/link'

const TestimonialsSlider = () => {
  const { dir } = useLayoutContext()

  const testimonialSliderSettings: TinySliderSettings = {
    nested: 'inner',
    gutter: 30,
    controls: true,
    edgePadding: 2,
    controlsText: [renderToString(<BsArrowLeft size={16} />), renderToString(<BsArrowRight size={16} />)],
    autoplayButton: false,
    autoplayButtonOutput: false,
    arrowKeys: true,
    autoplayDirection: dir === 'ltr' ? 'forward' : 'backward',
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  }

  return (
    <section className="pt-5 pt-md-8 pb-0">
      <Container fluid className="px-lg-5">
        <Row className="mb-4">
          <Col xs={12} className="text-center">
            <h2>Our Exciting Experience</h2>
          </Col>
        </Row>
        <div className="tiny-slider arrow-round arrow-blur rounded-3 overflow-hidden">
          <TinySlider settings={testimonialSliderSettings}>
            {testimonialData.map((item, idx) => {
              return (
                <div key={idx}>
                  <Card className="card-metro overflow-hidden">
                    <Image alt='' src={item.image} />
                    <div className="card-img-overlay d-flex">
                      <div className="card-text mt-auto">
                        <h4>
                          <Link href="" className="text-white stretched-link">
                            {item.title}
                          </Link>
                        </h4>
                        <p className="text-white mb-2">{item.description}</p>
                        <button className="btn btn-link text-white p-0 mb-0">
                          Explore now <FaArrowRightLong className="fa-fw" />
                        </button>
                      </div>
                    </div>
                  </Card>
                </div>
              )
            })}
          </TinySlider>
        </div>
      </Container>
    </section>
  )
}

export default TestimonialsSlider
