import { productsData, sectionCopy } from '@/app/auto-parts/data'
import ProductCard from '@/app/auto-parts/components/ProductCard'
import { Col, Container, Row } from 'react-bootstrap'
import { BsArrowRight } from 'react-icons/bs'

const Products = () => {
  const { products } = sectionCopy

  return (
    <section id="products" className="pt-0 pt-lg-5">
      <Container>
        <Row className="mb-4">
          <Col lg={8} className="mx-auto text-center">
            <h2 className="mb-2">{products.title}</h2>
            <p className="text-body-secondary mb-0">{products.subtitle}</p>
          </Col>
        </Row>
        <Row className="g-4">
          {productsData.map((product) => (
            <Col key={product.name} sm={6} lg={4} xl={3}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
        {/* <Row className="mt-4 mt-md-5">
          <Col xs={12} className="text-center">
            <a href="#contact-us" className="btn btn-primary mb-0">
              {products.viewAll}
              <BsArrowRight className="ms-2" />
            </a>
          </Col>
        </Row> */}
      </Container>
    </section>
  )
}

export default Products
