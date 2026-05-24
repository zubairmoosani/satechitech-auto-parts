import AutoPartsFooter from './components/AutoPartsFooter'
import AutoPartsTopNav from './components/AutoPartsTopNav'
import AboutUs from './components/AboutUs'
import ContactUs from './components/ContactUs'
import FeaturedParts from './components/FeaturedParts'
import Products from './components/Products'
import Hero from './components/Hero'
import BrowsePartCategories from './components/BrowsePartCategories'
import TopBrands from './components/TopBrands'
import WhyChooseUs from './components/WhyChooseUs'

const AutoPartsPage = () => {
  return (
    <>
      <AutoPartsTopNav />
      <main>
        <Hero />
        <FeaturedParts />
        <Products />
        <BrowsePartCategories />
        <WhyChooseUs />
        <TopBrands />
        <AboutUs />
        <ContactUs />
      </main>
      <AutoPartsFooter />
    </>
  )
}

export default AutoPartsPage
