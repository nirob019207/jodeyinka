import React from "react";
import Image from "next/image";
import bookCover from "@/asset/resource/book1.png";
import { BsCloudDownload } from "react-icons/bs";
import profilePic from "@/asset/profilee.png";

const BookDetails = () => {
  const trendingItems = [
    "Top Cybersecurity Trends Shaping 2025",
    "The Rise of AI in Cybersecurity: Friend or Foe?",
    "Navigating the Cyber Threat Landscape: Emerging Challenges",
    "Ransomware Evolution: How to Stay One Step Ahead",
    "Cloud Security in the Age of Hybrid Work",
    "Zero Trust Architecture: The New Standard for Security",
  ];

  return (
    <div className=" font-inter p-6 md:p-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-0">
        {/* Book Details Section */}
        <div className="md:col-span-2">
          <div className="flex flex-col items-center md:flex-row gap-10">
            {/* Book Cover */}
            <div className="w-full md:w-1/3">
              <Image
                src={bookCover}
                alt="Book Cover"
                className="w-full h-auto rounded-lg"
              />
            </div>
            {/* Book Info */}
            <div className="flex-1">
              <h2 className="text-[28px] font-semibold text-default md:w-[325px] w-full">
                Cybersecurity For Beginners
              </h2>
              <p className=" text-[#090043] mt-1">
                <span className="text-[#38383899]">By</span> Sanjay Kumar Ray
              </p>
              {/* Buttons */}
              <div className="flex gap-4 mt-8">
                <button className="bg-gradient-to-l from-[#0061FF] to-[#003A99] text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-3">
                  <BsCloudDownload className="text-[22px]" /> Download Now
                </button>
                <button className="border border-[#09004380] px-6 py-3 rounded-lg font-medium text-[#090043]">
                  Read Online
                </button>
              </div>
              {/* Profile Info */}
            </div>
          </div>

          <div className="flex items-center gap-2 mt-6">
            <div className="bg-[#D9D9D9] rounded-full flex items-center justify-center w-[52px] h-[52px]">
            <Image
              src={profilePic}
              alt="Profile"
              className="w-[52px] h-[52px] rounded-full"
            />
            </div>
            <div>
              <p className="text-[#090043]">WSF</p>
              <p className="text-[#090043] text-sm">@wsf_Tech</p>
            </div>
          </div>
          <div>
          <input className="text-gray-500 text-sm border-b" placeholder="Add comment" />
          </div>
        </div>

        {/* Trending Section */}
        <div className="">
          <h3 className="text-[24px] font-semibold text-default mb-4">
            Trending
          </h3>
          <ul className="space-y-3">
            {trendingItems.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-default font-medium">{`0${
                  index + 1
                }`}</span>
                <p className="text-default">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
