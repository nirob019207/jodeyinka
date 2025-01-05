import React from "react";
import Image from "next/image";
import news1 from "@/asset/media/news1.svg";
import news2 from "@/asset/media/news2.svg";
import news3 from "@/asset/media/news3.svg";
import news4 from "@/asset/media/news4.svg";
import news5 from "@/asset/media/news5.svg";
import news6 from "@/asset/media/news6.svg";
import { MdArrowRightAlt } from "react-icons/md";

const newsItems = [
  {
    id: 1,
    title: "What is happening in Syria? An expert explains",
    description:
      "Pulitzer Prize–winning journalist David Sanger previews the U.S.'s return to superpower conflict at GSF2024: Power Plays. He confronts the volatile rivalries with China and Russia...",
    image: news1,
  },
  {
    id: 2,
    title: "U.S. Scrambles to Navigate Perils of a New Syria",
    description:
      "Pulitzer Prize–winning journalist David Sanger previews the U.S.'s return to superpower conflict at GSF2024: Power Plays. He confronts the volatile rivalries with China and Russia...",
    image: news2,
  },
  {
    id: 3,
    title: "A Year of War Transformed Hezbollah",
    description:
      "Pulitzer Prize–winning journalist David Sanger previews the U.S.'s return to superpower conflict at GSF2024: Power Plays. He confronts the volatile rivalries with China and Russia...",
    image: news3,
  },
  {
    id: 4,
    title: "How Hezbollah Diversified Its Funding",
    description:
      "Pulitzer Prize–winning journalist David Sanger previews the U.S.'s return to superpower conflict at GSF2024: Power Plays. He confronts the volatile rivalries with China and Russia...",
    image: news4,
  },
  {
    id: 5,
    title: "New Cold Wars | Global Security Forum 2024",
    description:
      "Pulitzer Prize–winning journalist David Sanger previews the U.S.'s return to superpower conflict at GSF2024: Power Plays. He confronts the volatile rivalries with China and Russia...",
    image: news5,
  },
  {
    id: 6,
    title: "New Cold Wars | Global Security Forum 2024",
    description:
      "Pulitzer Prize–winning journalist David Sanger previews the U.S.'s return to superpower conflict at GSF2024: Power Plays. He confronts the volatile rivalries with China and Russia...",
    image: news6,
  },
];

const News = () => {
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

        {/* News Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((news) => (
            <div
              key={news.id}
              className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className="relative h-48">
                <Image
                  src={news.image}
                  alt={news.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
              {/* Content */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <h3 className="text-lg md:text-[24px] font-medium text-default mb-4">
                  {news.title}
                </h3>
                <p className="text-[#475467]  mb-9">{news.description}</p>
                <button className="px-4 py-3 flex items-center gap-2 text-white bg-gradient-to-l from-[#0061FF] to-[#003A99] rounded-xl w-[150px]">
                  Read More <MdArrowRightAlt className="text-[25px]"/>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;
