import Image from 'next/image'
import React from 'react'
import picturer_1 from '@/asset/career/career_1.jpeg'
import picturer_2 from '@/asset/career/career_2.jpeg'
import picturer_3 from '@/asset/career/career_3.jpeg'

const Career = () => {
  return (
    <div className='container mx-auto px-0'>
      <h1 className='text-[40px] font-bold text-darkBlack mt-20'>
        Secure Your Future in Cybersecurity
      </h1>
      <p className="text-sm md:text-lg text-gray-300 mb-8 mx-auto">
        The digital world is evolving, and so are the threats that come with it. 
        Whether you&apos;re an experienced professional, a researcher pushing the boundaries 
        of security innovation, or a contractor looking for the next big opportunity, 
        this is where your cybersecurity journey advances. Explore career opportunities, 
        cutting-edge research initiatives, and contracts that shape the future of digital defense. 
        Join a network of experts dedicated to protecting data, infrastructure, and innovation. 
        Your next challenge starts here.
      </p>  

      <div>
        <h1 className="text-2xl font-semibold mb-1">Job Opportunities</h1>

        <div className="flex flex-col items-center justify-center  px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-6xl">
        {/* Text Section */}
        <div className="flex items-center">
          <h2 className="text-xl md:text-lg  leading-relaxed">
            Event management involves planning, organizing, and executing events like conferences, weddings, and concerts. Professionals handle logistics, budgeting, vendor coordination, and marketing to ensure smooth execution. Careers in this field require creativity, organization, and attention to detail. Roles include Event Coordinator, Marketing Manager, and Client Relations Executive. With excellent networking opportunities and career growth, event management is perfect for those who thrive in fast-paced, dynamic environments and love bringing ideas to life.
          </h2>
        </div>

        {/* Image Collage Section */}
        <div className="flex justify-center">
      <div className="grid grid-cols-2 gap-4 relative p-6">
        {/* Large Image */}
        <div className="relative col-span-2 w-60 h-80 border-4 border-white shadow-lg rounded-md overflow-hidden">
          <Image src={picturer_1} alt="Main Image" layout="fill" objectFit="cover" />
        </div>

        {/* Small Images */}
        <div className="relative w-40 h-40 border-4 border-white shadow-lg rounded-md overflow-hidden">
          <Image src={picturer_2} alt="Small Image 1" layout="fill" objectFit="cover" />
        </div>
        <div className="relative w-40 h-40 border-4 border-white shadow-lg rounded-md overflow-hidden">
          <Image src={picturer_3} alt="Small Image 2" layout="fill" objectFit="cover" />
        </div>
      </div>
    </div>
      </div>
    </div>
      </div>

    </div>
  )
}

export default Career
