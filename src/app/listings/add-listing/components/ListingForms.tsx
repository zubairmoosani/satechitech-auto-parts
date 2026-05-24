'use client'
import { useBSStepper } from '@/hooks'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRef } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'

const ListingForms = () => {
  const stepperRef = useRef<HTMLDivElement | null>(null)
  const stepperInstance = useBSStepper(stepperRef)

  const listingSchema = yup.object({
    listingName: yup.string().required('Please enter your listing name'),
    usageType: yup.string().required('Please select usage type'),
    shortDescription: yup.string().required('Please enter a short description'),
    thumbnailImage: yup.mixed().required('Thumbnail Image is required'),
  })

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(listingSchema),
  })

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
                <h6 className="bs-stepper-label d-none d-md-block">Basic Information</h6>
              </div>
            </div>
            <div className="line" />

            <div className="step" data-target="#step-2">
              <div className="text-center">
                <button type="button" className="btn btn-link step-trigger mb-0" role="tab" id="steppertrigger2" aria-controls="step-2">
                  <span className="bs-stepper-circle">2</span>
                </button>
                <h6 className="bs-stepper-label d-none d-md-block">Detailed Information</h6>
              </div>
            </div>
            <div className="line" />

            <div className="step" data-target="#step-3">
              <div className="text-center">
                <button type="button" className="btn btn-link step-trigger mb-0" role="tab" id="steppertrigger3" aria-controls="step-3">
                  <span className="bs-stepper-circle">3</span>
                </button>
                <h6 className="bs-stepper-label d-none d-md-block">Price &amp; Policy</h6>
              </div>
            </div>
          </div>
          <div className="bs-stepper-content p-0 pt-4 pt-md-5">
            <Row className="g-4">
              <Col xs={12}>
                <form onSubmit={handleSubmit(() => {})}>
                  <Step1 stepperInstance={stepperInstance} control={control} />

                  <Step2 stepperInstance={stepperInstance} control={control} />

                  <Step3 stepperInstance={stepperInstance} control={control} />
                </form>
              </Col>
            </Row>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default ListingForms
