import Footer1 from '@/components/footer/Footer1'
import TopNavBar1 from '@/components/TopNav/TopNavBar1'
import Hero from './components/Hero'
import TourCardList from './components/TourCardList'

const ToursGrid = () => {
  return (
    <>
      <TopNavBar1 />
      <main>
        <Hero />
        <TourCardList />
      </main>
      <Footer1 />
    </>
  )
}

export default ToursGrid
