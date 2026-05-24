import Footer2 from '@/components/footer/Footer2'
import Preloader from '@/components/Preloader'
import TopNavBar4 from '@/components/TopNav/TopNavBar4'
import dynamic from 'next/dynamic'
import { ReactNode, Suspense } from 'react'

const AgentNavBar = dynamic(() => import('./components/AgentNavBar'))

const layout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <>
      <Suspense>
        <TopNavBar4 />
      </Suspense>

      <main>
        <Suspense>
          <AgentNavBar />
        </Suspense>

        <Suspense fallback={<Preloader />}>{children}</Suspense>
      </main>

      <Footer2 />
    </>
  )
}

export default layout
