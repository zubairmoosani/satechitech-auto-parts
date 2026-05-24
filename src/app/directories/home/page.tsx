import Footer5 from '@/components/footer/Footer5'
import TopNavBar7 from '../detail/components/TopNavBar7'
import About from './components/About'
import ActionBox from './components/ActionBox'
import CategorySlider from './components/CategorySlider'
import ExplorePlaces from './components/ExplorePlaces'
import Hero from './components/Hero'
import OfferBox from './components/OfferBox'
import SpecialOffersSlider from './components/SpecialOffersSlider'
import TestimonialSlider from './components/TestimonialSlider'
import TopCities from './components/TopCities'

const DirectoriesHome = () => {
  return (
    <>
      <TopNavBar7 />
      <main>
        <Hero />
        <CategorySlider />
        <ExplorePlaces />
        <OfferBox />
        <ActionBox />
        <About />
        <TestimonialSlider />
        <TopCities />
        <SpecialOffersSlider />
      </main>

      <Footer5 />
    </>
  )
}

export default DirectoriesHome
