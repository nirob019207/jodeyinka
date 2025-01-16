"use client";
import profile from "@/asset/admin/pro.jpg";
import Image from "next/image";
import hi from "@/asset/admin/hi.png";
import { useState } from "react";
const Topbar = () => {
  return (
    <header className="bg-white shadow py-4 px-16">
      <div className="flex justify-between items-center">
        <h1 className="text-[#161616] flex items-center gap-2">
          {/* Welcome Back, Admin!{" "} */}
          <Image className="w-6" src={hi} alt="welcome image" />
        </h1>
        <div>
          <div className="w-16 h-16 rounded-full cursor-pointer">
           
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
