import AboutUs from '@/components/AboutUs/AboutUs'
import MediaCarousel from '@/components/MediaCarousel/MediaCarousel'
import PartnerShip from '@/components/PartnerShip/PartnerShip'
import Resources from '@/components/Resources/Resources'
import Trending from '@/components/Trending/Trending'
import React from 'react'

export default function page() {
  return (
    <div>
      <AboutUs></AboutUs>
      <PartnerShip></PartnerShip>
      <MediaCarousel></MediaCarousel>
      <Trending></Trending>
      <Resources></Resources>
    </div>
  )
}
