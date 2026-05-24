import Footer1 from '@/components/footer/Footer1'
import Hero from './components/Hero'
import OurStory from './components/OurStory'
import OurTeam from './components/OurTeam'
import TopNavBar11 from './components/TopNavBar11'

const AboutPage = () => {
  return (
    <>
      <TopNavBar11 />
      <main>
        <Hero />
        <OurStory />
        <OurTeam />
      </main>
      <Footer1 />
    </>
  )
}

export default AboutPage
