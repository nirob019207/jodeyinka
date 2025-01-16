"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useGetResourceQuery } from "@/redux/Api/resourceApi";
import CardSkeleton from "../CardSkelaton/CardSkeleton";

interface Resource {
  id: string;
  fileUrl: string;
  title: string;
  description: string;
}

const Resources = () => {
  const { data, isLoading, isError } = useGetResourceQuery({
    type: "RESOURCE",
    limit: 3,
    page:"",
  });
  const resources = data?.data || []; // Ensure resources is always an array

  return (
    <div className="bg-[#F6F6F6] pb-[60px] md:pb-[120px] font-inter px-6">
      <div className="container mx-auto px-0">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[36px] font-medium text-default">Resources</h2>
          <Link
            href="/resources"
            className="text-blue-600 hover:underline text-[20px]"
          >
            See All
          </Link>
        </div>

        {/* Resource Cards */}
          {isLoading ? (
            <CardSkeleton cards={3} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources?.map((resource: Resource) => (
                <div
                  key={resource?.id}
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
            {/* Image */}
            <Image
              src={resource?.fileUrl}
              alt={resource?.title}
              className="w-full h-[200px] object-cover"
              width={300}
              height={200}
            />

                {/* Content */}
                <div className="px-4">
                  <h3 className="text-[24px] font-medium text-default mt-4">
                    {resource?.title}
                  </h3>
                  <p
                    className="text-gray mt-2"
                    dangerouslySetInnerHTML={{ __html: resource?.description }}
                  />
                  <div className="mt-6 pb-7">
                    <Link
                      href={`/media-details/${resource?.id}`}
                      className="border border-[#DDDDDD] w-full py-3 px-3 text-center text-blue-600 font-medium rounded-[8px]"
                    >
                      View More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            </div>
          )}
      </div>
    </div>
  );
};

export default Resources;
