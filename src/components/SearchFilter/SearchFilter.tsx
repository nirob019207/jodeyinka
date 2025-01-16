// components/SearchFilter.js
import React from "react";
import { FiSearch } from "react-icons/fi";
import filter from "@/asset/resource/filter.svg"
import Image from "next/image";

const SearchFilter = () => {
  return (
    <div className="bg-[#F6F6F6] pt-[30px] md:pt-[60px] pb-[60px] font-inter">
      <div className="container mx-auto px-0 flex flex-col md:flex-row justify-between items-center">
        {/* Left Section - Title */}
        <h2 className="text-2xl md:text-4xl font-medium text-default mb-4 md:mb-0">
          Resources
        </h2>

        {/* Right Section - Search and Filter */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Search Input */}
          {/* <div className="relative w-full md:w-auto">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#66708580]" />
            <input
              type="text"
              placeholder="Search here"
              className="w-full md:w-[300px] lg:w-[400px] pl-12 pr-4 py-2 border rounded-xl border-[#66708580] text-sm text-[#667085] focus:outline-none focus:ring-2 focus:ring-[#90CDF4] focus:border-transparent"
            />
          </div> */}

          {/* Filter Button */}
          {/* <button className="w-[167px] flex items-center justify-between px-4 py-2 border rounded-xl border-[#66708580] text-sm text-[#1D2939] hover:bg-[#E4E4E4]">
            <span>Filter</span>
           <Image src={filter} alt="filter logo"/>
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
