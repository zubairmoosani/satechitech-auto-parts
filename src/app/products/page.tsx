import AutoPartsShell from '@/app/auto-parts/components/AutoPartsShell'
import ProductsCatalog from '@/app/auto-parts/components/ProductsCatalog'
import { companyInfo } from '@/app/auto-parts/data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: `All Products | ${companyInfo.legalName}`,
  description: `Browse all auto parts from ${companyInfo.legalName}. Search and shop brakes, filters, oils, batteries, and more in ${companyInfo.currency}.`,
}

const ProductsPage = () => {
  return (
    <AutoPartsShell>
      <ProductsCatalog />
    </AutoPartsShell>
  )
}

export default ProductsPage
