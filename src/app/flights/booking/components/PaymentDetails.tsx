'use client'
import expresscard from '@/assets/images/element/expresscard.svg'
import mastercard from '@/assets/images/element/mastercard.svg'
import visaCard from '@/assets/images/element/visa.svg'
import TextFormInput from '@/components/form/TextFormInput'
import { currency } from '@/states'
import { yupResolver } from '@hookform/resolvers/yup'
import Image from 'next/image'
import Link from 'next/link'
import { Alert, Card, CardBody, CardHeader, Col, Container, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import FareSummary from './FareSummary'
import YourBooking from './YourBooking'

const paymentCards = [visaCard, mastercard, expresscard]

const PaymentDetails = () => {
  const paymentSchema = yup.object({
    cardNo: yup.number().required('Please enter your card number'),
    expiryMonth: yup.number().required('Please enter your card expiration month'),
    expiryYear: yup.number().required('Please enter your card expiration year'),
    cvv: yup.number().required('Please enter your card CVV number'),
    cardHolderName: yup.string().required('Please enter card holder name'),
  })

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(paymentSchema),
  })

  return (
    <section className="pt-4 pt-lg-5">
      <Container>
        <Row className="g-4 g-xl-5">
          <Col xl={8}>
            <Card className="bg-transparent p-0">
              <CardHeader className="bg-transparent p-0">
                <h1 className="card-title fs-2 mb-0">Enter Your Payment Details</h1>
              </CardHeader>
              <CardBody className="p-0 mt-3">
                <Alert variant="success" role="alert">
                  Hey' you are saving
                  <strong className="mx-1">{currency}2,560</strong>discount using coupon code
                </Alert>
                <form onSubmit={handleSubmit(() => {})} className="bg-light rounded-3 p-4">
                  <div className="d-sm-flex justify-content-sm-between align-items-center mb-3">
                    <h6 className="mb-2 mb-sm-0">We Accept:</h6>
                    <ul className="list-inline mb-0 d-flex">
                      {paymentCards.map((card, idx) => (
                        <li key={idx} className="list-inline-item">
                          <Link href="">
                            <Image alt="" src={card} className="h-30px" width={47} />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Row className="g-3">
                    <Col xs={12}>
                      <label className="h6 fw-normal">Card Number *</label>
                      <div className="position-relative">
                        <TextFormInput control={control} name="cardNo" type="text" maxLength={14} placeholder="XXXX XXXX XXXX XXXX" combinedInput />
                        <Image alt="" src={visaCard} className="w-30px position-absolute top-50 end-0 translate-middle-y me-2 d-none d-sm-block" />
                      </div>
                    </Col>
                    <Col md={6}>
                      <label className="h6 fw-normal">Expiration date *</label>
                      <div className="input-group">
                        <TextFormInput maxLength={2} placeholder="Month" control={control} name="expiryMonth" combinedInput />
                        <TextFormInput maxLength={4} placeholder="Year" control={control} name="expiryYear" combinedInput />
                      </div>
                    </Col>
                    <Col md={6}>
                      <label className="h6 fw-normal">CVV / CVC *</label>
                      <TextFormInput containerClass="col-md-6" control={control} name="cvv" maxLength={3} placeholder="xxx" />
                    </Col>

                    <Col md={12}>
                      <label className="h6 fw-normal">Name on Card *</label>
                      <TextFormInput
                        containerClass="col-12"
                        // label="Name on Card *"
                        control={control}
                        name="cardHolderName"
                        placeholder="Enter card holder name"
                      />
                    </Col>

                    <Col xs={12}>
                      <button type="submit" className="btn btn-primary w-100 mb-0">
                        Pay Now
                      </button>
                    </Col>
                  </Row>
                </form>
              </CardBody>
            </Card>
          </Col>
          <Col as="aside" xl={4}>
            <Row className="g-4">
              <Col md={6} xl={12}>
                <FareSummary />
              </Col>
              <Col md={6} xl={12}>
                <YourBooking />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default PaymentDetails
