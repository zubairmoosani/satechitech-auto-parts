import Footer1 from '@/components/footer/Footer1'
import TopNavBar1 from '@/components/TopNav/TopNavBar1'
import AboutHotel from './components/AboutHotel'
import AvailabilityFilter from './components/AvailabilityFilter'
import HotelGallery from './components/HotelGallery'

const HotelDetail = () => {
  return (
    <>
      <TopNavBar1 />
      <main>
        <AvailabilityFilter />
        <HotelGallery />
        <AboutHotel />
      </main>
      <Footer1 />
    </>
  )
}

export default HotelDetail
