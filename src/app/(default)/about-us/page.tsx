import HeroSection from '@/components/HeroSection/HeroSection'
import Mission from '@/components/Mission/Mission'
import OurTeam from '@/components/OurTeam/OurTeam'
// import OurTeam from '@/components/OurTeam/OurTeam'
import OurValue from '@/components/OurValue/OurValue'
import Resources from '@/components/Resources/Resources'
import React from 'react'

const AboutUsPage = () => {
  return (
    <div>
        <HeroSection/>
        <Mission/>
        <OurValue/>
      <OurTeam></OurTeam>
      <Resources/>
    </div>
  )
}

export default AboutUsPage