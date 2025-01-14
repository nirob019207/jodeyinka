"use client";
import profile from "@/asset/admin/pro.jpg";
import Image from "next/image";
import hi from "@/asset/admin/hi.png";
import { useState } from "react";
const Topbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // toggledrop down

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    console.log("logout successfully");
  };

  return (
    <header className="bg-white shadow py-4 px-16">
      <div className="flex justify-between items-center">
        <h1 className="text-[#161616] flex items-center gap-2">
          Welcome Back, Admin!{" "}
          <Image className="w-6" src={hi} alt="welcome image" />
        </h1>
        <div className="relative">
          <div onClick={toggleDropdown} className="w-16 h-16 rounded-full cursor-pointer">
            <Image src={profile} alt="profile image" />
          </div>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-green-100 text-black rounded-md shadow-lg w-[150px] z-[100]">
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
