import React from 'react'
import pinterest from '@/asset/companyLogo/pinterest.svg'
import paypal from '@/asset/companyLogo/paypal.svg'
import dropbox from '@/asset/companyLogo/dropbox.svg'
import airbnb from '@/asset/companyLogo/airbnb.svg'
import slack from '@/asset/companyLogo/slack.svg'
import loom from '@/asset/companyLogo/loom.svg'
import Image from 'next/image'

const PartnerShip = () => {
  return (
    <div className='bg-[#F6F6F6]'>

    <div className='container mx-auto px-0 pb-[120px]'>
        <div className='mb-6'>
          <h1 className='text-[20px] md:text-[36px] font-medium text-default mb-4'>Partnership</h1>
          <p className='text-gray'>WSF members represent the most innovative voices in the tech industry.</p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 items-center'>
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