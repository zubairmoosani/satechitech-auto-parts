'use client'
import TinySlider from '@/components/TinySlider'
import Image from 'next/image'
import { Card, CardBody, CardTitle, Col, Row } from 'react-bootstrap'
import { renderToString } from 'react-dom/server'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import { type TinySliderSettings } from 'tiny-slider'
import { testimonialSlides } from '../data'

const TestimonialSlider = () => {
  const testimonialSliderSettings: TinySliderSettings = {
    nested: 'inner',
    autoplay: true,
    autoplayButton: false,
    autoplayButtonOutput: false,
    controlsText: [renderToString(<BsArrowLeft size={14} />), renderToString(<BsArrowRight size={14} />)],
    arrowKeys: true,
    nav: false,
    items: 1,
  }

  return (
    <div className="tiny-slider arrow-round arrow-blur arrow-hover arrow-xs my-4 mb-md-0">
      <TinySlider settings={testimonialSliderSettings} className="pb-1">
        {testimonialSlides.map((slide, idx) => {
          return (
            <Card key={idx} className="bg-transparent">
              <Row className="align-items-center">
                <Col xs={4}>
                  <Image alt="" src={slide.image} className="card-img" />
                </Col>
                <Col xs={8}>
                  <CardBody className="p-0">
                    <p className="mb-0">{slide.description}</p>
                    <CardTitle as="h6" className="mb-0 mt-2">
                      {slide.name}
                    </CardTitle>
                  </CardBody>
                </Col>
              </Row>
            </Card>
          )
        })}
      </TinySlider>
    </div>
  )
}

export default TestimonialSlider
