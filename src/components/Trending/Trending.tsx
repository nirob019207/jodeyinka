"use client";

import React from "react";
import ai from "@/asset/trending/ai.svg";
import cyber from "@/asset/trending/cyber.svg";
import Image from "next/image";
import { MdArrowRightAlt } from "react-icons/md";

const Trending = () => {
  const trendingItems = [
    {
      id: 1,
      title: "AI-Powered Threat Detection",
      description:
        "As IoT devices increasingly rely on cloud storage and services. The voice as a form of authentication. As IoT devices increasingly rely on cloud storage and services. The voice as a form of authentication.",
      image: ai,
      overlay: "bg-[#090043CC]",
    },
    {
      id: 2,
      title: "Cyber Sentinel Collective",
      description:
        "As IoT devices increasingly rely on cloud storage and services. The voice as a form of authentication. As IoT devices increasingly rely on cloud storage and services. The voice as a form of authentication.",
      image: cyber,
      overlay: "bg-[#FFFFFFCC]",
    },
  ];

  return (
    <div className="bg-[#F6F6F6] pb-[60px] md:pb-[120px]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-[36px] font-medium text-default">Trending</h2>
          <p className="text-gray mt-4 mb-6">
            Web apps, mobile apps, and IoT security are focusing on emerging
            trends like Zero Trust models, end-to-end encryption, and AI-powered
            threat detection to combat evolving cyber threats.
          </p>
        </div>

        {/* Trending Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trendingItems.map((item) => (
            <div
              key={item.id}
              className="relative bg-white rounded-lg overflow-hidden shadow-lg h-[355px]"
            >
              {/* Background Image */}
              <Image
                src={item.image}
                alt={item.title}
                className="w-full h-60 object-cover"
              />

              {/* Overlay and Title */}
              <div
                className={`absolute top-0 left-0  px-4 py-2 text-[#FFFFFF] bg-[#FFFFFF33] backdrop-blur-[20px] text-[24px] font-semibold`}
              >
                {item.title}
              </div>

              {/* Description */}
              <div
                className={`absolute bottom-0 left-[71px] w-[406px] p-6 rounded-[8px] mx-auto text-white ${item.overlay}`}
              >
                <p
                  className={`${
                    item.overlay === "bg-[#090043CC]"
                      ? "text-[#FFFFFF]"
                      : "text-[#545454]"
                  }`}
                >
                  {item.description}
                </p>
                <div className="mt-6 flex justify-end">
                  <button className={`px-4 py-2 font-medium  flex items-center ${
                    item.overlay === "bg-[#090043CC]"
                      ? "text-[#FFFFFF]"
                      : "text-[#0061FF]"
                  }`}>
                    Read More <span className="ml-2"><MdArrowRightAlt className="text-[24px]"/></span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trending;
