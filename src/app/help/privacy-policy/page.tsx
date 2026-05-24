import Footer1 from '@/components/footer/Footer1'
import TopHelpNav from '@/components/HelpTopNav/TopHelpNav'
import React from 'react'
import AllPrivacyPolicy from './components/AllPrivacyPolicy'

const PrivacyPolicy = () => {
  return (
    <>
    <TopHelpNav/>
        <main>
        <AllPrivacyPolicy />
        </main>
        <Footer1/>
    </>
  )
}

export default PrivacyPolicy