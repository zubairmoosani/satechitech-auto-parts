import { companyInfo } from '@/app/auto-parts/data'
import AutoPartsFooter from '@/app/auto-parts/components/AutoPartsFooter'
import AutoPartsTopNav from '@/app/auto-parts/components/AutoPartsTopNav'
import AboutUs from '@/app/auto-parts/components/AboutUs'
import BrowsePartCategories from '@/app/auto-parts/components/BrowsePartCategories'
import ContactUs from '@/app/auto-parts/components/ContactUs'
import FeaturedParts from '@/app/auto-parts/components/FeaturedParts'
import Hero from '@/app/auto-parts/components/Hero'
import Products from '@/app/auto-parts/components/Products'
import TopBrands from '@/app/auto-parts/components/TopBrands'
import WhyChooseUs from '@/app/auto-parts/components/WhyChooseUs'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Auto Parts | ${companyInfo.legalName}`,
  description: companyInfo.metaDescription,
}

const HomePage = () => {
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

export default HomePage
