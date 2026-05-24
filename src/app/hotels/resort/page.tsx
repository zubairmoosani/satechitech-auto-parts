import Footer5 from '@/components/footer/Footer5'
import TopNavBar7 from '@/components/TopNav/TopNavBar7'
import About from './components/About'
import ActionBox from './components/ActionBox'
import FavoriteRoomSlider from './components/FavoriteRoomSlider'
import Gallery from './components/Gallery'
import Hero from './components/Hero'
import MonthlyOffers from './components/MonthlyOffers'
import TestimonialsSlider from './components/TestimonialsSlider'

const HotelResort = () => {
  return (
    <>
      <TopNavBar7 />
      <main>
        <Hero />
        <About />
        <TestimonialsSlider />
        <FavoriteRoomSlider />
        <MonthlyOffers />
        <Gallery />
        <ActionBox />
      </main>
      <Footer5 />
    </>
  )
}

export default HotelResort
