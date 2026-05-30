import AutoPartsShell from '@/app/auto-parts/components/AutoPartsShell'
import AboutUs from '@/app/auto-parts/components/AboutUs'
import BrowsePartCategories from '@/app/auto-parts/components/BrowsePartCategories'
import ContactUs from '@/app/auto-parts/components/ContactUs'
import Hero from '@/app/auto-parts/components/Hero'
import Products from '@/app/auto-parts/components/Products'
import TopBrands from '@/app/auto-parts/components/TopBrands'
import WhyChooseUs from '@/app/auto-parts/components/WhyChooseUs'
import { companyInfo } from '@/app/auto-parts/data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Auto Parts | ${companyInfo.legalName}`,
  description: companyInfo.metaDescription,
}

const HomePage = () => {
  return (
    <AutoPartsShell>
      <Hero />
      <Products />
      <BrowsePartCategories />
      <WhyChooseUs />
      <TopBrands />
      <AboutUs />
      <ContactUs />
    </AutoPartsShell>
  )
}

export default HomePage
