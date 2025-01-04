import React from "react";
import logo from "@/asset/logo.svg";
import searchIcon from "@/asset/icon/search.png";
import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="bg-[#090043] font-inter">
      <div className="container mx-auto bg-[#00000080] flex justify-between pt-[100px] pb-[350px] px-0">
        <div className="md:w-[548px] w-full">
          <Image src={logo} alt="Logo" />
          <h1 className="text-[24px] md:text-[32px] lg:text-[45px] font-medium text-[#F2F4F7] mt-6 md:mt-12 text-center">
            Exclusive Memberships, Best Opportunities
          </h1>
        </div>
        <div>
          <div className="flex items-center justify-end gap-6">
            <button className="px-4 py-2 text-white bg-[#667085] rounded-xl backdrop-blur-xl w-[136px]">
              Sing up
            </button>
            <button className="px-4 py-2 text-white bg-gradient-to-l from-[#0061FF] to-[#003A99] rounded-xl w-[140px]">
              Member login
            </button>
          </div>
          <div className="relative w-full md:w-[548px] my-8">
            {/* Search Icon */}
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Image
                src={searchIcon}
                alt="Search Icon"
                width={24}
                height={24}
              />
            </div>

            {/* Input Field */}
            <input
              type="text"
              placeholder="Search here"
              className="w-full pl-10  px-4 py-2 text-white bg-transparent border border-[#667085] rounded-xl"
            />
          </div>
          <nav className="bg-gray-800/80 backdrop-blur-lg rounded-xl px-[89px] py-3 flex justify-around items-center text-white shadow-lg">
            <Link href="#about-us" className="hover:text-blue-400">
              About Us
            </Link>
            <Link href="#media" className="hover:text-blue-400">
              Media
            </Link>
            <Link href="#contact" className="hover:text-blue-400">
              Contact
            </Link>
            <Link href="#blog" className="hover:text-blue-400">
              Blog
            </Link>
            <Link href="#contact" className="hover:text-blue-400">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};
