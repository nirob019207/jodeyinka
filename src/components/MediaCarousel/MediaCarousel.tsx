"use client";

import React, { useState } from "react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import media1 from "@/asset/media/media-1.svg"
import media2 from "@/asset/media/media-2.svg"
import Image from "next/image";
import { MdArrowRightAlt } from "react-icons/md";

const MediaCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    slides: {
      perView: 2,
      spacing: 15,
    },
    slideChanged(sliderInstance) {
      setCurrentSlide(sliderInstance.track.details.rel);
    },
  });

  const slides = [
    {
      id: 1,
      title: "Web Apps Security",
      description:
        "Web application security is the practice of protecting websites and online services from threats that exploit vulnerabilities in their code or design.",
      image: media1, 
      alt: "Web Apps Security",
    },
    {
      id: 2,
      title: "Mobile Apps Security",
      description:
        "Mobile application security is the practice of protecting websites and online services from threats that exploit vulnerabilities in their code or design.",
      image: media2,
      alt: "Mobile Apps Security",
    },
    {
      id: 3,
      title: "Cloud Security",
      description:
        "Cloud security is the protection of data, applications, and infrastructures involved in cloud computing from cyber threats.",
      image: media1, 
      alt: "Cloud Security",
    },
    {
      id: 4,
      title: "Cloud Security",
      description:
        "Cloud security is the protection of data, applications, and infrastructures involved in cloud computing from cyber threats.",
      image: media2, 
      alt: "Cloud Security",
    },
  ];

  return (
    <div className="bg-[#F6F6F6] pb-[120px]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-[36px] font-medium text-default">Media</h2>
          <p className="text-gray mt-4 mb-6">
            We share our findings and insights on current events, risks, and
            responses.
          </p>
        </div>

        {/* Carousel */}
        <div ref={sliderRef} className="keen-slider">
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="keen-slider__slide bg-gray-100 rounded-[8px] overflow-hidden shadow-lg"
            >
              <div className="relative">
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  className="w-full h-[355px] object-cover"
                />
                <div className="absolute top-0 left-0 bg-[#FFFFFF1A] backdrop-blur-[24px] text-white px-4 py-2 text-[24px] font-medium">
                  {slide.title}
                </div>
                <div className="p-4 bg-[#FFFFFF1A] backdrop-blur-[24px] absolute bottom-0 left-0 w-[360px] rounded-bl-[8px]">
                <p className="text-[#FFFFFF]">{slide.description}</p>
                <div className="mt-1 flex justify-end">
                  <button className="px-4 py-2 bg-gradient-to-l from-[#0061FF] to-[#003A99] text-white font-medium rounded-lg hover:bg-blue-700 flex items-center">
                    Read More <span className="ml-2"><MdArrowRightAlt className="text-[24px]"/></span>
                  </button>
                </div>
              </div>
              </div>
              
            </div>
          ))}
        </div>

        {/* Arrows and Dots */}
        <div className="flex justify-end items-center mt-4 space-x-4">
          {/* Left Arrow */}
          <button
            onClick={() => slider.current?.prev()}
            className="w-10 h-10 flex items-center justify-center bg-gray-300 rounded-full hover:bg-gray-400"
          >
            <FaAngleLeft className="text-gray-700 text-[24px]" />
          </button>

          {/* Dots */}
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => slider.current?.moveToIdx(index)}
              className={`w-2 h-2 rounded-full ${
                currentSlide === index ? "bg-blue-600" : "bg-[#ABABAB]"
              }`}
            ></button>
          ))}

          {/* Right Arrow */}
          <button
            onClick={() => slider.current?.next()}
            className="w-10 h-10 flex items-center justify-center bg-gray-300 rounded-full hover:bg-gray-400"
          >
            <FaAngleRight  className="text-gray-700 text-[24px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MediaCarousel;
