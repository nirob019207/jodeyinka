"use client";

import React, { useState } from "react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

import Image from "next/image";
import { MdArrowRightAlt } from "react-icons/md";
import { useGetResourceQuery } from "@/redux/Api/resourceApi";
import Link from "next/link";

const MediaCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data, isLoading, isError } = useGetResourceQuery({
    type: "MEDIA",
    limit: 5,
    page: 1,
  });
  const slides = data?.data;

  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    breakpoints: {
      "(min-width: 640px)": {
        slides: { perView: 1, spacing: 15 },
      },
      "(min-width: 768px)": {
        slides: { perView: 2, spacing: 15 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 2, spacing: 15 },
      },
    },
    slides: {
      perView: 1,
      spacing: 15,
    },
    slideChanged(sliderInstance) {
      setCurrentSlide(sliderInstance.track.details.rel);
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full border-t-4 border-blue-500 h-16 w-16"></div>
      </div>
    );
  }

  if (isError) return <p>Something went wrong!</p>;

  return (
    <div className="bg-[#F6F6F6] pb-[60px] md:pb-[50px] font-inter px-6 md:px-0">
      <div className="container mx-auto px-0">
        <div className="mb-8">
          <h2 className="text-[36px] md:text-[36px] font-medium text-default text-center md:text-start">
            Media
          </h2>
          <p className="text-gray mt-4 mb-6 text-sm md:text-base text-center md:text-start">
            We share our findings and insights on current events, risks, and
            responses.
          </p>
        </div>

        <div ref={sliderRef} className="keen-slider">
          {slides?.map((slide: any) => (
            <div
              key={slide.id}
              className="keen-slider__slide bg-gray-100 rounded-[8px] overflow-hidden shadow-lg"
            >
              <div className="relative">
                <Image
                  src={slide.fileUrl}
                  alt={slide.title || "Media"}
                  width={240}
                  height={240}
                  className="w-full h-[240px] md:h-[355px] object-cover"
                />
                <div className="absolute top-0 left-0 bg-[#FFFFFF1A] backdrop-blur-[24px] text-white px-4 py-2 text-[16px] md:text-[24px] font-medium">
                  {slide.title}
                </div>
                <div className="p-4 bg-[#FFFFFF1A] backdrop-blur-[24px] absolute bottom-0 left-0 w-full md:w-[360px] rounded-bl-[8px]">
                  <p
                    className="text-[#FFFFFF] text-sm md:text-base"
                    dangerouslySetInnerHTML={{
                      __html: slide.description || "",
                    }}
                  />
                  <div className="mt-1 flex justify-end">
                    <Link href={`/media-details/${slide.id}`}>
                      <button className="px-4 py-2 bg-gradient-to-l from-[#0061FF] to-[#003A99] text-white font-medium rounded-lg hover:bg-blue-700 flex items-center">
                        Read More{" "}
                        <span className="ml-2">
                          <MdArrowRightAlt className="text-[20px] md:text-[24px]" />
                        </span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center md:justify-end items-center mt-4 space-x-4">
          <button
            onClick={() => slider.current?.prev()}
            className="w-10 h-10 flex items-center justify-center bg-gray-300 rounded-full hover:bg-gray-400"
          >
            <FaAngleLeft className="text-gray-700 text-[20px] md:text-[24px]" />
          </button>

            {slides?.map((_: any, index: number) => (
            <button
              key={index}
              onClick={() => slider.current?.moveToIdx(index)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${
              currentSlide === index ? "bg-blue-600" : "bg-[#ABABAB]"
              }`}
            ></button>
            ))}

          <button
            onClick={() => slider.current?.next()}
            className="w-10 h-10 flex items-center justify-center bg-gray-300 rounded-full hover:bg-gray-400"
          >
            <FaAngleRight className="text-gray-700 text-[20px] md:text-[24px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MediaCarousel;
