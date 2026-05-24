import Footer2 from '@/components/footer/Footer2'
import TopNavBar4 from '@/components/TopNav/TopNavBar4'
import { ReactNode } from 'react'
import UserLayout from './components/UserLayout'

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <TopNavBar4 />

      <UserLayout>{children}</UserLayout>
      <Footer2 />
    </>
  )
}

export default layout
