'use client'

import { useNotificationContext } from '@/states'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row, Spinner } from 'react-bootstrap'

type ProductFormValues = {
  productName: string
  price: string
}

type ProductFormProps = {
  mode: 'create' | 'edit'
  recordId?: string
  initialValues?: ProductFormValues
  initialImageUrl?: string
}

const ProductForm = ({ mode, recordId, initialValues, initialImageUrl }: ProductFormProps) => {
  const router = useRouter()
  const { showNotification } = useNotificationContext()
  const [values, setValues] = useState<ProductFormValues>({
    productName: initialValues?.productName ?? '',
    price: initialValues?.price ?? '',
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialImageUrl ?? null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!imageFile) return
    const objectUrl = URL.createObjectURL(imageFile)
    setPreviewUrl(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [imageFile])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('productName', values.productName.trim())
      formData.append('price', values.price.trim())
      if (imageFile) {
        formData.append('image', imageFile)
      } else if (mode === 'create') {
        showNotification({ type: 'error', message: 'Please upload a product image.' })
        setLoading(false)
        return
      }

      const endpoint = mode === 'create' ? '/api/admin/products' : `/api/admin/products/${recordId}`
      const method = mode === 'create' ? 'POST' : 'PUT'

      const response = await fetch(endpoint, { method, body: formData })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error ?? 'Failed to save product.')
      }

      showNotification({
        type: 'success',
        message: mode === 'create' ? 'Product added successfully.' : 'Product updated successfully.',
      })
      router.push('/admin/products')
      router.refresh()
    } catch (error) {
      showNotification({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to save product.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="shadow-sm border-0">
      <Card.Body className="p-4 p-md-5">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
          <div>
            <h1 className="h4 mb-1">{mode === 'create' ? 'Add product' : 'Edit product'}</h1>
            <p className="text-body-secondary mb-0">Only image, product name, and price are required.</p>
          </div>
          <Link href="/admin/products" className="btn btn-light mb-0">
            View all products
          </Link>
        </div>

        <Form onSubmit={handleSubmit}>
          <Row className="g-4">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Product image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const input = event.target as HTMLInputElement
                    const file = input.files?.[0] ?? null
                    setImageFile(file)
                  }}
                />
                <Form.Text className="text-body-secondary">
                  Cloudinary will be used when configured. Until then images save locally.
                </Form.Text>
              </Form.Group>
              {previewUrl && (
                <div className="position-relative ratio ratio-4x3 mt-3 rounded overflow-hidden border">
                  <Image src={previewUrl} alt="Product preview" fill className="object-fit-cover" unoptimized />
                </div>
              )}
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Product name</Form.Label>
                <Form.Control
                  value={values.productName}
                  onChange={(event) =>
                    setValues((current) => ({ ...current, productName: event.target.value }))
                  }
                  placeholder="e.g. Front Brake Disc Pair"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Price (ZMW)</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  step="1"
                  value={values.price}
                  onChange={(event) => setValues((current) => ({ ...current, price: event.target.value }))}
                  placeholder="e.g. 850"
                  required
                />
              </Form.Group>

              <Button type="submit" variant="primary" disabled={loading} className="mb-0">
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Saving...
                  </>
                ) : mode === 'create' ? (
                  'Add product'
                ) : (
                  'Update product'
                )}
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default ProductForm
