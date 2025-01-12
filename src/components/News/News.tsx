'use client';
import React from "react";
import Image from "next/image";
import { MdArrowRightAlt } from "react-icons/md";
import { useGetResourceQuery } from "@/redux/Api/resourceApi";
import Link from "next/link";

const News = () => {
  const { data, isLoading, isError } = useGetResourceQuery({ type: "MEDIA" });
  const newsItems = data?.data;

  return (
    <section className="bg-[#F6F6F6] pt-[50px] pb-[30px] md:pt-[100px] md:pb-[60px] font-inter px-6 md:px-0">
      <div className="container mx-auto px-0">
        {/* Header */}
        <div className="text-center md:text-start">
          <h2 className="text-3xl md:text-4xl font-bold text-default">Media</h2>
          <p className="text-[#545454] mt-4 mb-6">
            We share our findings and insights on current events, risks, and
            responses.
          </p>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg overflow-hidden animate-pulse"
              >
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="text-center col-span-12 w-ful h-96 bg-white mt-6">
            Failed to load news items. Please try again later.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems?.map((news) => (
              <div
                key={news.id}
                className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
              >
                {/* Image */}
                <div className="relative h-48">
                  <Image
                    src={news.fileUrl}
                    alt={news.title || "Media"}
                    width={240}
                    height={240}
                    className="w-full object-cover h-full"
                  />
                </div>
                {/* Content */}
                <div className="p-6 flex flex-col justify-between flex-1">
                  <h3 className="text-lg md:text-[24px] font-medium text-default mb-4">
                    {news.title}
                  </h3>
                  <p className="text-[#475467] mb-9">{news.description}</p>
                  <Link href={`/media-details/${news.id}`} className="px-4 py-3 flex items-center gap-2 text-white bg-gradient-to-l from-[#0061FF] to-[#003A99] rounded-xl w-[150px]">
                    Read More <MdArrowRightAlt className="text-[25px]" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default News;
