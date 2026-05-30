import AutoPartsFooter from '@/app/auto-parts/components/AutoPartsFooter'
import AutoPartsTopNav from '@/app/auto-parts/components/AutoPartsTopNav'
import CartDrawer from '@/app/auto-parts/components/CartDrawer'

const AutoPartsShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AutoPartsTopNav />
      <main>{children}</main>
      <AutoPartsFooter />
      <CartDrawer />
    </>
  )
}

export default AutoPartsShell
