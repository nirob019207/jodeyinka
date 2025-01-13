"use client";
import Sidebar from "@/components/AdminDashboard/Sidebar/Sidebar";
import Topbar from "@/components/AdminDashboard/Tobbar/Topbar";
// import Link from "next/link";
import { usePathname } from "next/navigation";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // const pathname = usePathname(); // Get the current path

  return (
   <div className="bg-[#F6F6F6] font-inter">
     <div className="flex h-screen ">
      {/* Sidebar */}
     <Sidebar/>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
      <Topbar/>

        {/* Content */}
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto font-inter">{children}</main>
      </div>
    </div>
   </div>
  );
};

export default Layout;
