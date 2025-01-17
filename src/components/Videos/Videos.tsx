"use client";

import React from "react";
import Image from "next/image";
import defaultResource from "@/asset/resource/resource1.svg"

// import { FaPlayCircle } from "react-icons/fa";
import { useGetResourceQuery } from "@/redux/Api/resourceApi";
import Link from "next/link";

const Videos = () => {
    const { data} = useGetResourceQuery({ type: "RESOURCE",limit:10, page:1});
    const Videos = data?.data;
 

  return (
    <div className="bg-[#F6F6F6] pt-[30px] md:pt-[60px] pb-[30px] md:pb-[60px] font-inter px-6">
      <div className="container mx-auto px-0">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          {/* <h2 className="text-[36px] font-medium text-default">Videos</h2> */}
          {/* <a href="#" className="text-blue-600 hover:underline text-[20px]">
            See All
          </a> */}
        </div>

        {/* Videos Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Videos?.map((video:any) => (
            <div
              key={video.id}
              className="bg-white rounded-lg overflow-hidden shadow hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image Section with Play Icon */}
              <div className="relative">
                <Image
                  src={video.fileUrl || defaultResource}
                  alt={video.title}
                  width={100}
                  height={100}
                  className="w-full h-[200px] object-cover"
                />
                {/* Play Icon
                <FaPlayCircle className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-5xl hover:opacity-100 transition-opacity duration-300 cursor-pointer" /> */}
              </div>

              {/* Content */}
              <div className="px-4">
                <h3 className="text-[24px] font-medium text-default mt-4">
                  {video.title}
                </h3>
                <p
                  className="text-gray mt-2"
                  dangerouslySetInnerHTML={{ __html: video.description }}
                />
                <div className="mt-6 pb-7">
                <Link href={`/media-details/${video.id}`} className="border border-[#DDDDDD] w-full py-3 px-2 text-center text-blue-600 font-medium rounded-[8px]">
                    View More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Videos;
