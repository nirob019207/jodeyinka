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
            At Of Ash and Fire, we strive to transform ideas into powerful digital solutions.
            Our mission is to empower businesses and individuals with cutting-edge technology,
            enabling them to thrive in the digital landscape.
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
            We envision a world where technology seamlessly integrates with human creativity,
            driving innovation and progress. Our goal is to be at the forefront of this digital
            revolution, crafting solutions that shape the future.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Mission;
