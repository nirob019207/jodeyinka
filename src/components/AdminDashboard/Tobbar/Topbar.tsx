"use client";
// import profile from "@/asset/admin/pro.jpg";
import Image from "next/image";
import hi from "@/asset/admin/hi.png";
import { useGetMeQuery } from "@/redux/Api/userApi";
// import { useState } from "react";
const Topbar = () => {
  const { data } = useGetMeQuery({});
  const userInformation = data?.data;
  return (
    <header className="bg-white shadow py-4 px-16 z-[50]">
      <div className="flex justify-between items-center">
        <h1 className="text-[#161616] flex items-center gap-2 text-[20px] font-medium">
          {/* Welcome Back, Admin!{" "} */}
          Welcome, {userInformation?.firstName} {userInformation?.lastName}
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
