'use client'
import { partCategoriesBrowseData, sectionCopy } from '@/app/auto-parts/data'
import clsx from 'clsx'
import Link from 'next/link'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { BsArrowRight } from 'react-icons/bs'

const BrowsePartCategories = () => {
  const { categories } = sectionCopy

  return (
    <section className="pt-0 pt-md-5 bg-light">
      <Container>
        <Row className="mb-4">
          <Col lg={8} className="mx-auto text-center">
            <h2 className="mb-2">{categories.title}</h2>
            <p className="text-body-secondary mb-0">{categories.subtitle}</p>
          </Col>
        </Row>
        <Row className="g-4">
          {partCategoriesBrowseData.map((item) => {
            const Icon = item.icon
            return (
              <Col key={item.title} sm={6} lg={4}>
                <Card className="card-body shadow-sm h-100 p-4 d-flex flex-column">
                  <div className="d-flex gap-3 align-items-start mb-3">
                    <div
                      className={clsx(
                        item.variant,
                        'icon-xl bg-opacity-10 rounded-3 flex-centered flex-shrink-0'
                      )}
                    >
                      <Icon className="fs-4" />
                    </div>
                    <div className="flex-grow-1 min-w-0">
                      <h5 className="mb-1">{item.title}</h5>
                      <p className="text-body-secondary small mb-0">{item.description}</p>
                    </div>
                  </div>
                  <div className="mt-auto text-end">
                    <Link href="#products" className="btn btn-sm btn-primary-soft mb-0">
                      {categories.viewAll}
                      <BsArrowRight className="ms-1" />
                    </Link>
                  </div>
                </Card>
              </Col>
            )
          })}
        </Row>
      </Container>
    </section>
  )
}

export default BrowsePartCategories
