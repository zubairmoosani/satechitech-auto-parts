import type { ReactNode } from 'react'
import { companyInfo } from '@/app/auto-parts/data'
import Link from 'next/link'
import { BsArrowLeft } from 'react-icons/bs'
import { Card, CardBody, Container } from 'react-bootstrap'

type PolicyPageLayoutProps = {
  title: string
  children: ReactNode
}

const PolicyPageLayout = ({ title, children }: PolicyPageLayoutProps) => {
  return (
    <Container className="py-5">
      <Link href="/" className="btn btn-link text-body p-0 mb-4 d-inline-flex align-items-center">
        <BsArrowLeft className="me-1" />
        Back to home
      </Link>
      <Card className="shadow-sm border-0">
        <CardBody className="p-4 p-md-5">
          <p className="text-body-secondary small mb-2">{companyInfo.legalName}</p>
          <h1 className="h3 mb-4">{title}</h1>
          <div className="policy-content text-body-secondary">{children}</div>
          <hr className="my-4" />
          <p className="small text-body-secondary mb-0">
            Questions? Contact us at{' '}
            <Link href="/#contact-us">our contact page</Link> or via WhatsApp from the footer.
          </p>
        </CardBody>
      </Card>
    </Container>
  )
}

export default PolicyPageLayout
