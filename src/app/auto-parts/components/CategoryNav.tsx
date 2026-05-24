import { autoPartCategories } from '@/app/auto-parts/data'
import { Col, Row } from 'react-bootstrap'

const CategoryNav = () => {
  return (
    <Row className="g-3 g-md-4 justify-content-center" role="presentation">
      {autoPartCategories.map((item) => {
        const Icon = item.icon
        return (
          <Col key={item.key} xs={6} md={3}>
            <div
              className="text-center rounded-3 bg-light border border-light-subtle px-3 py-4 h-100"
              aria-hidden="true"
            >
              <div className="icon-lg bg-primary bg-opacity-10 text-primary rounded-3 flex-centered mx-auto mb-3">
                <Icon className="fs-5" />
              </div>
              <span className="fw-semibold text-body d-block">{item.label}</span>
            </div>
          </Col>
        )
      })}
    </Row>
  )
}

export default CategoryNav
