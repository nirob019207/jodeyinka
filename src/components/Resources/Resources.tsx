"use client";

import React from "react";
import Image from "next/image";
import resource1 from "@/asset/resource/resource1.svg"
import resource2 from "@/asset/resource/resource2.svg"
import resource3 from "@/asset/resource/resource3.svg"
const Resources = () => {
  const resources = [
    {
      id: 1,
      title: "Ransomware",
      description:
        "Ransomware attacks are heavily targeted toward individuals or businesses with poor cybersecurity practices and ineffective security programs.",
      image: resource1,
    },
    {
      id: 2,
      title: "Phishing attacks",
      description:
        "Phishing attacks continue to pose a significant threat to businesses, with research by Acronis finding the number of email-based attacks on the rise.",
      image: resource2,
    },
    {
      id: 3,
      title: "Cloud vulnerabilities",
      description:
        "Cloud vulnerabilities. As more and more organizations move their data to the cloud, cloud vulnerabilities have become a significant source of cybersecurity concerns.",
      image: resource3,
    },
  ];

  return (
    <div className="bg-[#F6F6F6] pb-[60px] md:pb-[120px] font-inter px-6">
      <div className="container mx-auto px-0">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[36px] font-medium text-default">Resources</h2>
          <a href="#" className="text-blue-600 hover:underline text-[20px]">
            See All
          </a>
        </div>

        {/* Resource Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image */}
              <Image
                src={resource.image}
                alt={resource.title}
                className="w-full h-[200px] object-cover"
              />

              {/* Content */}
              <div className="px-4">
                <h3 className="text-[24px] font-medium text-default mt-4">
                  {resource.title}
                </h3>
                <p className="text-gray mt-2">
                  {resource.description}
                </p>
                <div className="mt-6 pb-7">
                  <button
                    className="border border-[#DDDDDD] w-full py-3 text-center text-blue-600  font-medium rounded-[8px]"
                  >
                    View More
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

export default Resources;
