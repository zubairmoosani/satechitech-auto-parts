import AutoPartsShell from '@/app/auto-parts/components/AutoPartsShell'
import OrderConfirmation from '@/app/auto-parts/components/OrderConfirmation'
import { companyInfo } from '@/app/auto-parts/data'
import type { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: `Order confirmed | ${companyInfo.legalName}`,
  description: 'Your auto parts order has been placed successfully.',
}

const CheckoutConfirmationPage = () => {
  return (
    <AutoPartsShell>
      <Suspense fallback={<div className="py-5 text-center">Loading order...</div>}>
        <OrderConfirmation />
      </Suspense>
    </AutoPartsShell>
  )
}

export default CheckoutConfirmationPage
