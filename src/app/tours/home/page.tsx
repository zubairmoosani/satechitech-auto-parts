import Footer3 from '@/components/footer/Footer3'
import TopNavBar from '@/components/TopNav/TopNavBar'
import ActionBox from './components/ActionBox'
import Hero from './components/Hero'
import TopCategories from './components/TopCategories'
import TourPackages from './components/TourPackages'
import TourStories from './components/TourStories'

const ToursHome = () => {
  return (
    <>
      <TopNavBar />
      <main>
        <Hero />
        <TourPackages />
        <ActionBox />
        <TopCategories />
        <TourStories />
      </main>
      <Footer3 />
    </>
  )
}

export default ToursHome
