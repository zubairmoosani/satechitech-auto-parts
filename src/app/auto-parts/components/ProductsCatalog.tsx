'use client'

import ProductCard from '@/app/auto-parts/components/ProductCard'
import { companyInfo, sectionCopy } from '@/app/auto-parts/data'
import { adminProductToProductType } from '@/lib/products/mapAdminProduct'
import type { AdminProduct } from '@/types/admin-product'
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { BsArrowLeft, BsSearch } from 'react-icons/bs'
import { Button, Col, Container, Form, Pagination, Row, Spinner } from 'react-bootstrap'

const PAGE_SIZE = 12

const ProductsCatalog = () => {
  const [products, setProducts] = useState<AdminProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const loadProducts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/products')
      const data = (await response.json()) as { products?: AdminProduct[]; error?: string }
      if (!response.ok) {
        throw new Error(data.error ?? 'Failed to load products.')
      }
      setProducts(data.products ?? [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products.')
      setProducts([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  useEffect(() => {
    setPage(1)
  }, [search])

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return products
    return products.filter((product) => product.productName.toLowerCase().includes(query))
  }, [products, search])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE
    return filtered.slice(start, start + PAGE_SIZE)
  }, [filtered, currentPage])

  const paginationItems = useMemo(() => {
    const items: number[] = []
    const maxVisible = 5
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2))
    const end = Math.min(totalPages, start + maxVisible - 1)
    start = Math.max(1, end - maxVisible + 1)
    for (let i = start; i <= end; i += 1) {
      items.push(i)
    }
    return items
  }, [currentPage, totalPages])

  const { products: productsCopy } = sectionCopy

  return (
    <section className="pt-4 pt-lg-5 pb-5">
      <Container>
        <div className="mb-4">
          <Link href="/" className="btn btn-link text-body px-0 mb-3">
            <BsArrowLeft className="me-1" />
            Back to home
          </Link>
          <Row className="align-items-end g-3">
            <Col lg={7}>
              <h1 className="h2 mb-2">{productsCopy.title}</h1>
              <p className="text-body-secondary mb-0">{productsCopy.subtitle}</p>
            </Col>
            <Col lg={5}>
              <Form.Group>
                <Form.Label className="visually-hidden">Search products</Form.Label>
                <div className="position-relative">
                  <BsSearch className="position-absolute top-50 translate-middle-y ms-3 text-body-secondary" />
                  <Form.Control
                    type="search"
                    placeholder="Search by product name…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="ps-5"
                  />
                </div>
              </Form.Group>
            </Col>
          </Row>
        </div>

        {loading && (
          <div className="text-center py-5">
            <Spinner animation="border" role="status" variant="primary" />
            <p className="text-body-secondary mt-3 mb-0">Loading products…</p>
          </div>
        )}

        {!loading && error && (
          <div className="text-center py-5">
            <p className="text-danger mb-3">{error}</p>
            <Button variant="primary" onClick={loadProducts}>
              Try again
            </Button>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-5">
            <p className="text-body-secondary mb-0">
              {search.trim() ? 'No products match your search.' : 'No products available yet.'}
            </p>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <>
            <p className="small text-body-secondary mb-4">
              Showing {(currentPage - 1) * PAGE_SIZE + 1}–
              {Math.min(currentPage * PAGE_SIZE, filtered.length)} of {filtered.length} product
              {filtered.length === 1 ? '' : 's'}
              {search.trim() ? ` matching “${search.trim()}”` : ''}
            </p>
            <Row className="g-4">
              {paginated.map((adminProduct) => (
                <Col key={adminProduct.id} sm={6} lg={4} xl={3}>
                  <ProductCard product={adminProductToProductType(adminProduct)} />
                </Col>
              ))}
            </Row>

            {totalPages > 1 && (
              <div className="d-flex justify-content-center mt-5">
                <Pagination className="mb-0">
                  <Pagination.Prev
                    disabled={currentPage <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                  />
                  {paginationItems[0] > 1 && (
                    <>
                      <Pagination.Item onClick={() => setPage(1)}>1</Pagination.Item>
                      {paginationItems[0] > 2 && <Pagination.Ellipsis disabled />}
                    </>
                  )}
                  {paginationItems.map((pageNum) => (
                    <Pagination.Item
                      key={pageNum}
                      active={pageNum === currentPage}
                      onClick={() => setPage(pageNum)}
                    >
                      {pageNum}
                    </Pagination.Item>
                  ))}
                  {paginationItems[paginationItems.length - 1] < totalPages && (
                    <>
                      {paginationItems[paginationItems.length - 1] < totalPages - 1 && (
                        <Pagination.Ellipsis disabled />
                      )}
                      <Pagination.Item onClick={() => setPage(totalPages)}>
                        {totalPages}
                      </Pagination.Item>
                    </>
                  )}
                  <Pagination.Next
                    disabled={currentPage >= totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  />
                </Pagination>
              </div>
            )}
          </>
        )}

        {!loading && !error && products.length > 0 && (
          <p className="small text-body-secondary text-center mt-4 mb-0">
            All prices in {companyInfo.currency}. Contact us to confirm stock.
          </p>
        )}
      </Container>
    </section>
  )
}

export default ProductsCatalog
