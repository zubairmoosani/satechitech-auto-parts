'use client'

import { productsData, sectionCopy, type ProductType } from '@/app/auto-parts/data'
import ProductCard from '@/app/auto-parts/components/ProductCard'
import type { AdminProduct } from '@/types/admin-product'
import { useEffect, useMemo, useState } from 'react'
import { Col, Container, Row, Spinner } from 'react-bootstrap'

const mapAdminProduct = (product: AdminProduct): ProductType => ({
  name: product.productName,
  category: 'Parts',
  brand: 'SATECHI TECH',
  price: product.price,
  rating: 5,
  image: product.imageUrl,
  stockLabel: 'In stock',
})

const Products = () => {
  const { products } = sectionCopy
  const [adminProducts, setAdminProducts] = useState<ProductType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/products')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.products)) {
          setAdminProducts(data.products.map(mapAdminProduct))
        }
      })
      .catch(() => {
        setAdminProducts([])
      })
      .finally(() => setLoading(false))
  }, [])

  const displayProducts = useMemo(
    () => (adminProducts.length > 0 ? adminProducts : productsData),
    [adminProducts],
  )

  return (
    <section id="products" className="pt-0 pt-lg-5">
      <Container>
        <Row className="mb-4">
          <Col lg={8} className="mx-auto text-center">
            <h2 className="mb-2">{products.title}</h2>
            <p className="text-body-secondary mb-0">{products.subtitle}</p>
          </Col>
        </Row>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" role="status" />
          </div>
        ) : (
          <Row className="g-4">
            {displayProducts.map((product) => (
              <Col key={product.name} sm={6} lg={4} xl={3}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </section>
  )
}

export default Products
