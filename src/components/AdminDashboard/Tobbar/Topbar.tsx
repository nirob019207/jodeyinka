"use client";
import { AiOutlineMenu } from "react-icons/ai"; // Hamburger icon
import Image from "next/image";
import hi from "@/asset/admin/hi.png";
import { useGetMeQuery } from "@/redux/Api/userApi";

const Topbar: React.FC<{ onHamburgerClick: () => void }> = ({ onHamburgerClick }) => {
  const { data } = useGetMeQuery({});
  const userInformation = data?.data;

  return (
    <header className="bg-white shadow py-4 px-6 lg:px-16  w-full">
      <div className="flex justify-between items-center flex-wrap">
        {/* Hamburger Icon for Mobile */}
        <button
          className="lg:hidden text-2xl text-gray-700"
          onClick={onHamburgerClick}
        >
          <AiOutlineMenu />
        </button>

        {/* Welcome Message */}
        <h1 className="text-[#161616] flex items-center gap-2 text-[16px] sm:text-[20px] font-medium">
          Welcome, {userInformation?.firstName || "User"} {userInformation?.lastName || ""}
          <Image className="w-6 sm:w-8" src={hi} alt="welcome image" />
        </h1>
      </div>
    </header>
  );
};

export default Topbar;
