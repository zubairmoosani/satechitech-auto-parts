'use client'
import { useBSStepper } from '@/hooks'
import { useRef } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import BookingSignIn from './BookingSignIn'
import PaymentDetail from './PaymentOption/PaymentDetail'
import PriceSummary from './PriceSummary'
import TourReviewPage from './TourReview/TourReviewPage'
import TravelerDetail from './TravelerInformation/TravelerDetail'

const TourBookingDetails = () => {
  const stepperRef = useRef<HTMLDivElement | null>(null)
  const stepperInstance = useBSStepper(stepperRef)

  return (
    <section>
      <Container>
        <div ref={stepperRef} className="bs-stepper stepper-outline">
          <div className="bs-stepper-header" role="tablist">
            <div className="step" data-target="#step-1">
              <div className="text-center">
                <button type="button" className="btn btn-link step-trigger mb-0" role="tab" id="steppertrigger1" aria-controls="step-1">
                  <span className="bs-stepper-circle">1</span>
                </button>
                <h6 className="bs-stepper-label d-none d-md-block">Tour Review</h6>
              </div>
            </div>
            <div className="line" />
            <div className="step" data-target="#step-2">
              <div className="text-center">
                <button type="button" className="btn btn-link step-trigger mb-0" role="tab" id="steppertrigger2" aria-controls="step-2">
                  <span className="bs-stepper-circle">2</span>
                </button>
                <h6 className="bs-stepper-label d-none d-md-block">Traveler Info</h6>
              </div>
            </div>
            <div className="line" />
            <div className="step" data-target="#step-3">
              <div className="text-center">
                <button type="button" className="btn btn-link step-trigger mb-0" role="tab" id="steppertrigger3" aria-controls="step-3">
                  <span className="bs-stepper-circle">3</span>
                </button>
                <h6 className="bs-stepper-label d-none d-md-block">Make Payment</h6>
              </div>
            </div>
          </div>
          <div className="bs-stepper-content p-0 pt-4">
            <Row className="g-4">
              <Col xl={8}>
                <div>
                  <TourReviewPage stepperInstance={stepperInstance} />

                  <TravelerDetail stepperInstance={stepperInstance} />

                  <PaymentDetail stepperInstance={stepperInstance} />
                </div>
              </Col>
              <Col as="aside" xl={4}>
                <div className="vstack gap-4">
                  <PriceSummary />

                  <BookingSignIn />
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default TourBookingDetails
