import React from 'react';
import Image from 'next/image';
import mission1 from '@/asset/about/mission1.svg';
import mission2 from '@/asset/about/mission2.svg';

const Mission = () => {
  return (
    <div className="bg-[#090043] py-[60px] px-6 md:px-0">
      <div className="container mx-auto px-0  grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mission Section */}
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl md:text-[36px] font-semibold mb-4 text-[#FFFFFF]">Our Mission</h2>
          <p className="text-[#BDBDBD]">
          &quot;Our mission is to empower individuals, organizations, and communities with the knowledge, tools, and resources to navigate the digital world securely. Through education, advocacy, and innovation, we strive to reduce cyber threats, promote privacy, and enhance resilience against evolving digital risks, ensuring a safer and more inclusive cyberspace for all.&quot;

          </p>
        </div>
        <div className="flex justify-center">
          <Image
            src={mission1}
            alt="Our Mission"
            width={550}
            height={350}
            className="rounded-lg shadow-md"
          />
        </div>

        {/* Vision Section */}
        <div className="flex justify-center order-last md:order-none">
          <Image
            src={mission2}
            alt="Our Vision"
            width={550}
            height={350}
            className="rounded-lg shadow-md"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl md:text-[36px] font-semibold mb-4 text-[#FFFFFF]">Our Vision</h2>
          <p className="text-[#BDBDBD]">
              &quot;Empowering a secure digital future where individuals, communities, and organizations can thrive without fear of cyber threats. We envision a world where cybersecurity knowledge and resources are accessible to all, fostering resilience, trust, and innovation in a connected society.&quot;
            </p>
          </div>
      </div>
    </div>
  );
};

export default Mission;
