import React from "react";
import Image from "next/image";

import aboutImage from "@/asset/about/about.svg";
import membership from "@/asset/about/membership.svg";
import { MdArrowRightAlt } from "react-icons/md";
import chatbot from "@/asset/chatbot.svg"

const AboutUs = () => {
  return (
    // absolute code : absolute mx-auto md:ml-[352px] top-[500px]
    <div className="bg-[#F6F6F6]">
      <div className="container px-0  flex flex-col lg:flex-row  relative bottom-[90px] md:bottom-[176px] ">
        {/* About Us Section */}
        <div className="bg-[#DEE8F7] rounded-bl-xl rounded-br-xl shadow-lg flex-1 relative">
          <div className="absolute top-0 left-0 w-full bg-gradient-to-l from-[#0061FF] to-[#003A99] text-white py-2 px-4">
            <h2 className="text-[36px] font-semibold">About Us</h2>
          </div>
          <Image
            src={aboutImage}
            alt="About Us"
            width={560}
            className="w-full overflow-hidden h-auto pt-16"
          />
          <div className="px-[23px]">
            <h2 className="text-[20px] font-medium my-6">
              Welcome to WSF – Your Hub for Connection, Collaboration, and
              Community!
            </h2>
            <p className="text-[#475467] text-base">
              Welcome to WSF – Your Hub for Connection, Collaboration, and
              Community! Dive into a space designed just for you. Whether you're
              looking to engage with like-minded individuals, plan exciting
              events, or access a treasure trove of valuable resources, we've
              created a platform tailored to fuel your passions and meet your
              needs.
            </p>
          </div>
          <div className="flex items-center justify-end pt-7 pb-6 text-blue-600 font-medium">
            <a href="#" className="flex items-center gap-1">
              See more
              <MdArrowRightAlt className="mr-6 text-[24px]" />
            </a>
          </div>
        </div>

        {/* Membership Section */}
        <div className="bg-white rounded-bl-xl rounded-br-xl shadow-lg flex-1 relative">
          <div className="absolute top-0 left-0 w-full bg-[#FFFFFF] text-[#1D2939] py-2 px-4 z-30">
            <h2 className="text-[36px] font-semibold">Membership</h2>
          </div>
          <div className="relative overflow-hidden">
            <Image
              src={membership}
              alt="Membership"
              width={500}
              className="w-full overflow-hidden pt-[59px] relative z-10"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-[#09004380] to-[#09004380] z-10"></div>
            <div className="absolute inset-0 flex items-center justify-center px-6 z-20 pt-16">
              <p className="text-[#FFFFFF] text-[20px] lg:text-[24px] font-medium text-center">
                Join our Lifetime Membership for just $1! Enjoy exclusive perks
                like personalized support, premium content, and early access to
                new features.
              </p>
            </div>
          </div>
          <ul className="text-gray-700 py-3 px-6 relative z-10">
            <div className="flex gap-1 mb-2">
              <MdArrowRightAlt className=" text-[24px] text-[#0B75D5]" />
              <p className="text-[#475467]">
                <span className="font-medium text-[#1D2939]">
                  {" "}
                  Exclusive Content:
                </span>{" "}
                Use points to unlock special articles, videos, or features.
              </p>
            </div>
            <div className="flex gap-1 mb-2">
              <MdArrowRightAlt className=" text-[24px] text-[#0B75D5]" />
              <p className="text-[#475467]">
                <span className="font-medium text-[#1D2939]">Discounts:</span>{" "}
                Redeem points for discounts on products, services, or events.
              </p>
            </div>
            <div className="flex gap-1 mb-2">
              <MdArrowRightAlt className=" text-[24px] text-[#0B75D5]" />
              <p className="text-[#475467]">
                <span className="font-medium text-[#1D2939]">Challenges:</span>{" "}
                Participate in challenges or activities that let you earn even
                more points.
              </p>
            </div>
            <div className="flex gap-1 mb-2">
              <MdArrowRightAlt className="text-[24px] text-[#0B75D5]" />
              <p className="text-[#475467]">
                <span className="font-medium text-[#1D2939]">
                  Secure Payment System:
                </span>{" "}
                Make transactions easy with our reliable and secure payment
                processing.
              </p>
            </div>
          </ul>
          <div className="flex items-center justify-end mt-4 mb-4 md:mb-0 text-blue-600 font-medium">
            <a href="#" className="flex items-center">
              See more
              <MdArrowRightAlt className="mr-9 text-[24px]" />
            </a>
          </div>

          <div className="w-20 h-20 flex items-center justify-center p-5 bg-[#090043] rounded-full absolute left-[560px] bottom-[120px]">
          <Image src={chatbot} alt="chatbot icon"/>
        </div>
        </div>
        
      </div>
      
    </div>
  );
};

export default AboutUs;
