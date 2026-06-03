import { companyInfo } from '@/app/auto-parts/data'
import Image from 'next/image'
import Link from 'next/link'
import { Col, Container, Row } from 'react-bootstrap'
import Form from './components/Form'

const SignIn = () => {
  return (
    <main>
      <section className="vh-100 d-flex align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} sm={10} md={8} lg={5} xl={4}>
              <div className="bg-mode shadow rounded-3 p-4 p-sm-5">
                <Link href="/" className="d-inline-block mb-4">
                  <Image
                    src={companyInfo.logo}
                    alt={companyInfo.logoAlt}
                    width={200}
                    height={80}
                    priority
                    className="object-fit-contain rounded-2 bg-white d-inline-block"
                    style={{
                      width: 'auto',
                      height: 56,
                      maxWidth: 220,
                      padding: '0.5rem 0.75rem',
                    }}
                  />
                </Link>
                <h1 className="h3 mb-4">Login</h1>
                <Form />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  )
}

export default SignIn
