import Footer1 from '@/components/footer/Footer1'
import TopNavBar from '@/components/TopNav/TopNavBar'
import ActionBox from './components/ActionBox'
import Client from './components/Client'
import FAQs from './components/FAQs'
import Hero from './components/Hero'
import Vehicles from './components/Vehicles'
import WhyChooseUs from './components/WhyChooseUs'

const CabHome = () => {
  return (
    <>
      <TopNavBar />
      <main>
        <Hero />
        <Vehicles />
        <WhyChooseUs />
        <ActionBox />
        <FAQs />
        <Client />
      </main>
      <Footer1 />
    </>
  )
}

export default CabHome
