"use client"
import React from 'react'
import pinterest from '@/asset/companyLogo/pinterest.svg'
import paypal from '@/asset/companyLogo/paypal.svg'
import dropbox from '@/asset/companyLogo/dropbox.svg'
import airbnb from '@/asset/companyLogo/airbnb.svg'
import slack from '@/asset/companyLogo/slack.svg'
import loom from '@/asset/companyLogo/loom.svg'
import Image from 'next/image'
import { useRefreshTokenQuery } from '@/redux/Api/userApi'

const PartnerShip = () => {
  const { data: refresh } = useRefreshTokenQuery({})
  console.log(refresh?.data)
 
  return (
    <div className='bg-[#F6F6F6] px-6 md:px-0'>

    <div className='container mx-auto px-0 pb-[60px]  md:pb-[120px]'>
        <div className='mb-6'>
          <h1 className='text-[32px] md:text-[36px] font-medium text-default mb-4 md:text-left text-center'>Partnership</h1>
          <p className='text-gray text-base text-center md:text-start'>WSF members represent the most innovative voices in the tech industry.</p>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 items-center gap-6 md:gap-0 justify-items-center md:justify-items-start'>
          <div className='w-[167px] bg-[#FFFFFF] p-3'>
            <Image src={pinterest} alt='pinterest logo' className=''/>
          </div>
          <div className='w-[167px] bg-[#FFFFFF] p-3'>
            <Image src={paypal} alt='paypal logo' className=''/>
          </div>
          <div className='w-[167px] bg-[#FFFFFF] p-3'>
            <Image src={dropbox} alt='dropbox logo' className=''/>
          </div>
          <div className='w-[167px] bg-[#FFFFFF] p-3'>
            <Image src={airbnb} alt='airbnb logo' className=''/>
          </div>
          <div className='w-[167px] bg-[#FFFFFF] p-3'>
            <Image src={slack} alt='slack logo' className=''/>
          </div>
          <div className='w-[167px] bg-[#FFFFFF] p-3'>
            <Image src={loom} alt='loom logo' className=''/>
          </div>
        </div>
    </div>
    </div>
  )
}

export default PartnerShip