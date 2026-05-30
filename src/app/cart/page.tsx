import AutoPartsShell from '@/app/auto-parts/components/AutoPartsShell'
import CartPageContent from '@/app/auto-parts/components/CartPageContent'
import { companyInfo } from '@/app/auto-parts/data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Cart | ${companyInfo.legalName}`,
  description: 'Review your auto parts order before checkout.',
}

const CartPage = () => {
  return (
    <AutoPartsShell>
      <CartPageContent />
    </AutoPartsShell>
  )
}

export default CartPage
