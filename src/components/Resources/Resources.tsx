"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useGetResourceQuery } from "@/redux/Api/resourceApi";

const Resources = () => {
  const { data, isLoading, isError } = useGetResourceQuery({ type: "RESOURCE",limit:3 });
  const resources = data?.data; // Show only the latest 3 resources

  return (
    <div className="bg-[#F6F6F6] pb-[60px] md:pb-[120px] font-inter px-6">
      <div className="container mx-auto px-0">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[36px] font-medium text-default">Resources</h2>
          <Link href="/resources" className="text-blue-600 hover:underline text-[20px]">
            See All
          </Link>
        </div>

        {/* Resource Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            // Skeleton Loading
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-lg p-4 animate-pulse"
              >
                <div className="w-full h-[200px] bg-gray-300 rounded"></div>
                <div className="mt-4 h-[24px] bg-gray-300 rounded"></div>
                <div className="mt-2 h-[18px] bg-gray-300 rounded"></div>
                <div className="mt-6 h-[44px] bg-gray-300 rounded"></div>
              </div>
            ))
          ) : isError ? (
            <p className="text-red-500 text-center col-span-3">
              Something went wrong. Please try again later.
            </p>
          ) : (
            resources.map((resource) => (
              <div
                key={resource.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                {/* Image */}
                <Image
                  src={resource?.fileUrl}
                  alt={resource.title}
                  className="w-full h-[200px] object-cover"
                  width={300}
                  height={200}
                />

                {/* Content */}
                <div className="px-4">
                  <h3 className="text-[24px] font-medium text-default mt-4">
                    {resource.title}
                  </h3>
                  <p className="text-gray mt-2">{resource?.description}</p>
                  <div className="mt-6 pb-7">
                  <Link href={`/media-details/${resource?.id}`}
                  className="border border-[#DDDDDD] w-full py-3 px-3 text-center text-blue-600 font-medium rounded-[8px]"
                    >
                      View More
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Resources;
