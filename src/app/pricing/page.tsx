import Footer1 from '@/components/footer/Footer1'
import TopNavBar2 from '@/components/TopNav/TopNavBar2'
import ActionBox from './components/ActionBox'
import Companies from './components/Companies'
import PricingFAQs from './components/PricingFAQs'
import PricingPlans from './components/PricingPlans'

const Pricing = () => {
  return (
    <>
      <TopNavBar2 />

      <main>
        <PricingPlans />
        <Companies />
        <PricingFAQs />
        <ActionBox />
      </main>

      <Footer1 />
    </>
  )
}

export default Pricing
