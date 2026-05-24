import type { ProductType } from '@/app/auto-parts/data'
import { autoPartsContact, companyInfo } from '@/app/auto-parts/data'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardBody, CardFooter } from 'react-bootstrap'
import { FaStar, FaWhatsapp } from 'react-icons/fa6'

const ProductCard = ({ product }: { product: ProductType }) => {
  return (
    <Card className="shadow-sm h-100 overflow-hidden">
      <div className="position-relative ratio ratio-4x3 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 576px) 50vw, (max-width: 992px) 33vw, 25vw"
          className="object-fit-cover"
        />
        <div className="card-img-overlay d-flex flex-column p-3 z-index-1">
          <div className="d-flex flex-wrap gap-1">
            <span className="badge text-bg-dark">{product.category}</span>
            {product.badge && <span className="badge text-bg-danger">{product.badge}</span>}
          </div>
        </div>
      </div>
      <CardBody className="px-3 pb-2">
        <p className="small text-body-secondary mb-1">{product.brand}</p>
        <h6 className="card-title mb-2">{product.name}</h6>
        <div className="d-flex align-items-center mb-0">
          <span className="items-center me-2">
            <FaStar size={16} className="text-warning me-1" />
            {product.rating}
          </span>
          <span className={`small ${product.stockLabel === 'In stock' ? 'text-success' : 'text-body-secondary'}`}>
            {product.stockLabel ?? 'Enquire'}
          </span>
        </div>
      </CardBody>
      <CardFooter className="bg-transparent border-top px-3 pt-0 pb-3">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div className="hstack gap-2">
            <h6 className="text-success mb-0">
              {companyInfo.currency}
              {product.salePrice ?? product.price}
            </h6>
            {product.salePrice && (
              <span className="small text-decoration-line-through text-body-secondary">
                {companyInfo.currency}
                {product.price}
              </span>
            )}
          </div>
          <Link
            href={autoPartsContact.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm mb-0 flex-centered gap-1 position-relative z-index-2"
          >
            <FaWhatsapp />
            Enquire
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}

export default ProductCard
