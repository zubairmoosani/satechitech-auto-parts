'use client'

import type { AdminProduct } from '@/types/admin-product'
import { useNotificationContext } from '@/states'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button, Card, Spinner, Table } from 'react-bootstrap'
import { formatPrice } from '@/app/auto-parts/data'

type ProductsAdminListProps = {
  initialProducts: AdminProduct[]
}

const ProductsAdminList = ({ initialProducts }: ProductsAdminListProps) => {
  const router = useRouter()
  const { showNotification } = useNotificationContext()
  const [products, setProducts] = useState(initialProducts)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this product?')) return

    setDeletingId(id)
    try {
      const response = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error ?? 'Failed to delete product.')
      }
      setProducts((current) => current.filter((product) => product.id !== id))
      showNotification({ type: 'success', message: 'Product deleted.' })
      router.refresh()
    } catch (error) {
      showNotification({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to delete product.',
      })
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <Card className="shadow-sm border-0">
      <Card.Body className="p-4 p-md-5">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
          <div>
            <h1 className="h4 mb-1">Products</h1>
            <p className="text-body-secondary mb-0">Manage catalogue items shown on the storefront.</p>
          </div>
          <Link href="/admin/products/add" className="btn btn-primary mb-0">
            Add product
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-5">
            <p className="text-body-secondary mb-3">No products yet.</p>
            <Link href="/admin/products/add" className="btn btn-primary-soft mb-0">
              Add your first product
            </Link>
          </div>
        ) : (
          <div className="table-responsive">
            <Table hover className="align-middle mb-0">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product name</th>
                  <th>Price</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="position-relative rounded overflow-hidden border" style={{ width: 72, height: 54 }}>
                        <Image
                          src={product.imageUrl}
                          alt={product.productName}
                          fill
                          className="object-fit-cover"
                          unoptimized
                        />
                      </div>
                    </td>
                    <td className="fw-semibold">{product.productName}</td>
                    <td>{formatPrice(product.price)}</td>
                    <td className="text-end">
                      <div className="d-inline-flex gap-2">
                        <Link href={`/admin/products/${product.id}/edit`} className="btn btn-sm btn-light mb-0">
                          Edit
                        </Link>
                        <Button
                          type="button"
                          variant="outline-danger"
                          size="sm"
                          className="mb-0"
                          disabled={deletingId === product.id}
                          onClick={() => handleDelete(product.id)}
                        >
                          {deletingId === product.id ? <Spinner animation="border" size="sm" /> : 'Delete'}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Card.Body>
    </Card>
  )
}

export default ProductsAdminList
