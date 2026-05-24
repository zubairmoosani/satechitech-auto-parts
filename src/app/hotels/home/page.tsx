import Footer1 from '@/components/footer/Footer1'
import TopNavBar from '@/components/TopNav/TopNavBar'
import AppsLink from './components/AppsLink'
import Clients from './components/Clients'
import FeaturedHoliday from './components/FeaturedHoliday'
import FeaturedHotels from './components/FeaturedHotels'
import Footer from './components/Footer'
import Hero from './components/Hero'
import NearbyPlaces from './components/NearbyPlaces'
import OfferSlider from './components/OfferSlider'
import TestimonialsSlider from './components/TestimonialsSlider'

const HomePage = () => {
  return (
    <>
      <TopNavBar />

      <main>
        <Hero />
        <OfferSlider />
        <FeaturedHoliday />
        <FeaturedHotels />
        <Clients />
        <TestimonialsSlider />
        <NearbyPlaces />
        <AppsLink />
      </main>
      <Footer1 />
      <Footer />
    </>
  )
}

export default HomePage
