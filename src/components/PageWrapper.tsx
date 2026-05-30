'use client'
import { AuthProvider, CartProvider, NotificationProvider } from '@/states'
import dynamic from 'next/dynamic'

const LayoutProvider = dynamic(() => import('@/states/useLayoutContext').then((mod) => mod.LayoutProvider), {
  ssr: false,
})
const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NotificationProvider>
        <LayoutProvider>
          <AuthProvider>
            <CartProvider>{children}</CartProvider>
          </AuthProvider>
        </LayoutProvider>
      </NotificationProvider>
    </>
  )
}

export default PageWrapper
