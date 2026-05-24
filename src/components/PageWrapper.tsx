'use client'
import { AuthProvider, NotificationProvider } from '@/states'
import dynamic from 'next/dynamic'

const LayoutProvider = dynamic(() => import('@/states/useLayoutContext').then((mod) => mod.LayoutProvider), {
  ssr: false,
})
const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NotificationProvider>
        <LayoutProvider>
          <AuthProvider>{children}</AuthProvider>
        </LayoutProvider>
      </NotificationProvider>
    </>
  )
}

export default PageWrapper
