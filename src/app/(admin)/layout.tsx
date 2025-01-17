"use client";
import { useState } from "react";
import Sidebar from "@/components/AdminDashboard/Sidebar/Sidebar";
import Topbar from "@/components/AdminDashboard/Tobbar/Topbar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="bg-[#F6F6F6] font-inter">
      <div className="md:flex h-screen lg:flex-row">
        {/* Sidebar */}
        <div
          className={`lg:w-72 w-full bg-white max-h-screen px-2 transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "transform-none" : "-translate-x-full"
          } lg:translate-x-0`}
        >
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <Topbar onHamburgerClick={toggleSidebar} />

          <main className="flex-1 p-4 sm:p-6 bg-gray-100 overflow-y-auto font-inter overflow-x-hidden">
            {children}
          </main>
        </div>
      </div>

      {/* Overlay for Mobile Sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Layout;
