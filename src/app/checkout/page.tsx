import AutoPartsShell from '@/app/auto-parts/components/AutoPartsShell'
import CheckoutFlow from '@/app/auto-parts/components/CheckoutFlow'
import { companyInfo } from '@/app/auto-parts/data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Checkout | ${companyInfo.legalName}`,
  description: 'Complete your auto parts order and choose a payment method.',
}

const CheckoutPage = () => {
  return (
    <AutoPartsShell>
      <CheckoutFlow />
    </AutoPartsShell>
  )
}

export default CheckoutPage
