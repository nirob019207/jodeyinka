import Image from 'next/image'
import React from 'react'
import picturer_1 from '@/asset/career/career_1.jpeg'
import picturer_2 from '@/asset/career/career_2.jpeg'
import picturer_3 from '@/asset/career/career_3.jpeg'
import research_1 from '@/asset/career/Collaboration_1.jpeg'
import research_2 from '@/asset/career/Collaboration_2.jpeg'
import { BriefcaseIcon } from 'lucide-react'
import contact_image from "@/asset/career/Contracts_Opportunities.jpeg"
import Link from 'next/link'

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

   {/* Contracts Opportunities */}

   <section className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row items-center gap-10 bg-gray-100 p-6 md:p-12 rounded-2xl shadow-lg">
        
        {/* Image Section */}
        <div className="w-full md:w-1/2">
          <Image 
            src={contact_image} 
            alt="Contracts Opportunities" 
            width={500} 
            height={300} 
            className="rounded-2xl w-full object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <BriefcaseIcon className="h-10 w-10 text-blue-600" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Contract Opportunities
            </h2>
          </div>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            Discover exclusive contract opportunities and grow your business with top clients. 
            Get access to high-value projects tailored to your expertise.Contract opportunities refer to temporary or project-based work agreements where individuals or businesses are hired for a specific period or task. These contracts outline the scope of work, duration, payment terms, and responsibilities of both parties.
          </p>
          <div className="flex justify-center md:justify-start">
            <Link href="/contact"><button className="bg-blue-600 text-white px-6 py-3 mt-4 rounded-lg hover:bg-blue-700 transition">
              Contact Now
            </button></Link>
          </div>
        </div>

      </div>
    </section>


    {/* Research Opportunities */}

    <div>
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16 px-4 sm:px-6 lg:px-8 mb-8 text-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">Research Opportunities</h2>
        <p className="text-lg sm:text-xl mb-10">
          Join groundbreaking research projects and collaborate with top experts worldwide.
        </p>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Image 1 */}
        <div className="relative group overflow-hidden rounded-xl shadow-lg h-80">
          <Image
            src={research_1}
            alt="International Collaboration"
            width={500}
            height={300}
            className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-lg font-semibold">International Collaboration with Explore</span>
          </div>
        </div>

        {/* Image 2 */} 
        <div className="relative group overflow-hidden rounded-xl shadow-lg h-80">
          <Image
            src={research_2}
            alt="Team Collaboration"
            width={500}
            height={300}
            className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-lg font-semibold">Collaborate with Experts</span>
          </div>
        </div>
      </div>
    </section>
    </div>
      </div>

    </div>
  )
}

export default Career
