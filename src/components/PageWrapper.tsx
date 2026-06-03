'use client'
import AuthSessionProvider from '@/components/AuthSessionProvider'
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
          <AuthSessionProvider>
            <AuthProvider>
              <CartProvider>{children}</CartProvider>
            </AuthProvider>
          </AuthSessionProvider>
        </LayoutProvider>
      </NotificationProvider>
    </>
  )
}

export default PageWrapper
