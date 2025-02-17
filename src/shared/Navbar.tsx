"use client";
import React, { useState } from "react";
import logo from "@/asset/Forum_Logo-2.png";
import Image from "next/image";
import Link from "next/link";
import banner from "@/asset/banner.svg";
import anotherBanner from "@/asset/anotherBanner.svg";
import { FiBell, FiMenu, FiX } from "react-icons/fi";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useGetMeQuery, useGetnotifyQuery } from "@/redux/Api/userApi";
import profileavater from "@/asset/profilavater.webp";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/ReduxFunction";
import cookies from "js-cookie";

export const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const { data, isLoading } = useGetMeQuery({});

  const userInformation = data?.data;

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const pathname = usePathname();
  const { id } = useParams();

  // Dynamic background image and padding based on route
  const routeSettings: {
    [key: string]: { background: string; paddingBottom: string };
  } = {
    "/": { background: banner.src, paddingBottom: "350px" },
    "/about-us": { background: anotherBanner.src, paddingBottom: "83px" },
    "/media": { background: anotherBanner.src, paddingBottom: "83px" },
    "/event": { background: anotherBanner.src, paddingBottom: "83px" },
    "/resources": { background: anotherBanner.src, paddingBottom: "83px" },
    "/blog": { background: anotherBanner.src, paddingBottom: "83px" },
    "/download-pdf": { background: anotherBanner.src, paddingBottom: "83px" },
    "/contact": { background: anotherBanner.src, paddingBottom: "83px" },
    [`/media-details/${id}`]: {
      background: anotherBanner.src,
      paddingBottom: "83px",
    },
    [`/event-details/${id}`]: {
      background: anotherBanner.src,
      paddingBottom: "83px",
    },
    "/career": { background: anotherBanner.src, paddingBottom: "83px" },
  };

  const currentSettings = routeSettings[pathname as string] || {
    background: banner.src,
    paddingBottom: "350px",
  };

  // toggledrop down

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const { data: notifications } = useGetnotifyQuery({});
  const birthdayNotifications =
    notifications?.data?.birthdayNotifications || [];
  const anniversaryNotifications =
    notifications?.data?.memberAnniversaryNotifications || [];
  const totalNotifications =
    birthdayNotifications.length + anniversaryNotifications.length;

  const toggleNotifDropdown = () => setIsNotifOpen(!isNotifOpen);

  // const dispatch = useDispatch()

  const handleLogout = () => {
    // Clear user data in Redux
    dispatch(setUser({ role: null, token: null, email: null }));

    // Remove the token from cookies
    cookies.remove("token");
    cookies.remove("role");
    cookies.remove("_grecaptcha");

    localStorage.removeItem("_grecaptcha");
    localStorage.clear();
    window.location.reload();

    toast.success("Logged out successfully!");
    router.push("/login");
  };

  // Function to determine active link
  const isActive = (href: string) => pathname === href;

  const getYears = (createdAt: string) => {
    const joinDate = new Date(createdAt);
    const currentDate = new Date();
    return currentDate.getFullYear() - joinDate.getFullYear();
  };

  return (
    <div className="bg-[#090043] font-inter relative">
      {/* Desktop Banner Section */}
      <div
        style={{
          backgroundImage: `url(${currentSettings.background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          paddingBottom: currentSettings.paddingBottom,
        }}
        className={`container mx-auto flex flex-col lg:flex-row justify-between pt-[50px] md:pt-[50px]  px-0`}
      >
        {/* Left Section (Logo and Text) */}
        <div className="md:w-[548px] w-full text-center lg:text-left">
          <div className="flex items-center justify-between ml-4 px-6 md:px-0" >
            <Link href={"/"}>
              <Image
                className="w-12 md:w-20 rounded-sm"
                src={logo}
                alt="Logo"
              />
            </Link>

            {/* Hamburger Menu for Mobile */}
            <button
              className="lg:hidden text-white text-2xl"
              onClick={toggleDrawer}
            >
              {isDrawerOpen ? "" : <FiMenu className="text-[30px]" />}
            </button>
          </div>
          <h1 className="text-[24px] md:text-[32px] lg:text-[45px] font-medium text-[#F2F4F7] mt-12 md:mt-12 text-center">
            Exclusive Memberships, Best Opportunities
          </h1>
        </div>

        {/* Right Section (Buttons and Search) */}
        <div className="mt-8 lg:mt-0 relative">
          <div className="flex items-center justify-between lg:justify-end gap-6">
            {/* Buttons */}
            {isLoading ? (
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-white"></div>
              </div>
            ) : userInformation ? (
              <div className="relative flex gap-2 items-center justify-center">
                <div
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={toggleDropdown}
                >
                  <h1 className="text-white">{userInformation.firstName}</h1>
                  <div className="w-12 h-12 bg-[#D9D9D9] rounded-full overflow-hidden relative">
                    <Image
                      src={userInformation?.imageUrl || profileavater}
                      className="rounded-full"
                      alt="Profile"
                      width={48}
                      height={48}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-6">
                    {/* Notification Icon */}
                    <div className="relative">
                      <button
                        className="text-white text-2xl relative"
                        onClick={toggleNotifDropdown}
                      >
                        <FiBell />
                        {totalNotifications > 0 && (
                          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                            {totalNotifications}
                          </span>
                        )}
                      </button>
                      {isNotifOpen && (
                        <div className="absolute right-0 mt-2 bg-white text-black rounded-md shadow-lg w-[250px] z-50 p-3">
                          <div className="mt-2">
                            {birthdayNotifications.length === 0 &&
                            anniversaryNotifications.length === 0 ? (
                              <p className="text-sm text-center text-gray-500 p-2">
                                No notifications
                              </p>
                            ) : (
                              <>
                                {birthdayNotifications.map(
                                  (notif: any, index: any) => (
                                    <p
                                      key={index}
                                      className="text-sm border-b p-2"
                                    >
                                      🎂 {notif.firstName} {notif.lastName}{" "}
                                      Birthday today!
                                    </p>
                                  )
                                )}
                                {anniversaryNotifications.map(
                                  (notif: any, index: any) => (
                                    <p
                                      key={index}
                                      className="text-sm border-b p-2"
                                    >
                                      🎉 Celebrating {notif.firstName}{" "}
                                      {notif.lastName} for{" "}
                                      {getYears(notif.createdAt)} year(s) of
                                      being part of our community!
                                    </p>
                                  )
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {isDropdownOpen && (
                <div className="absolute right-0 mt-36  bg-white text-black rounded-md shadow-lg w-[150px] z-50">
                  {userInformation.role !== "MEMBER" &&
                    userInformation.role === "SPONSOR" &&
                    userInformation.sponsorStatus === "pending" && (
                      <Link href="/membership" className="block px-4 py-2 hover:bg-gray-200">
                        Membership
                      </Link>
                    )}
                  <Link
                    href={userInformation.role === "ADMIN" ? "/admin/dashboard" : "/admin/profile"}
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    Dashboard
                  </Link>
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-200" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
              </div>
            ) : (
              <div className="flex items-center gap-6 text-center">
                <Link
                  href={"/register"}
                  className="px-4 py-2  text-white bg-[#FFFFFF1A] rounded-xl backdrop-blur-[24px] border border-[#667085] w-[136px] hidden md:flex"
                >
                  Sign up
                </Link>
                <Link
                  href={"/login"}
                  className="px-4 py-2 text-white bg-gradient-to-l from-[#0061FF] to-[#003A99] rounded-xl w-[140px] hidden md:flex"
                >
                  Login
                </Link>
              </div>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex bg-[#FFFFFF1A] backdrop-blur-[4px] rounded-xl px-[45px] py-3 mt-6 gap-6  items-center text-white shadow-lg">
            <Link
              href="/"
              className={`hover:text-blue-400 ${
                isActive("/") ? "text-blue-400 font-bold" : ""
              }`}
            >
              Home
            </Link>
            <Link
              href="/about-us"
              className={`hover:text-blue-400 ${
                isActive("/about-us") ? "text-blue-400 font-bold" : ""
              }`}
            >
              About Us
            </Link>
            <Link
              href="/media"
              className={`hover:text-blue-400 ${
                isActive("/media") ? "text-blue-400 font-bold" : ""
              }`}
            >
              Media
            </Link>
            <Link
              href="/event"
              className={`hover:text-blue-400 ${
                isActive("/event") ? "text-blue-400 font-bold" : ""
              }`}
            >
              Event
            </Link>
            <Link
              href="/resources"
              className={`hover:text-blue-400 ${
                isActive("/resources") ? "text-blue-400 font-bold" : ""
              }`}
            >
              Resource
            </Link>
            <Link
              href="/career "
              className={`hover:text-blue-400 ${
                isActive("/career") ? "text-blue-400 font-bold" : ""
              }`}
            >
              Career
            </Link>
            <Link
              href="/contact"
              className={`hover:text-blue-400 ${
                isActive("/contact") ? "text-blue-400 font-bold" : ""
              }`}
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <div
        className={`fixed top-0 left-0 h-full w-[80%] bg-[#090043] text-white transform ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex items-center justify-between px-4 pt-10 pb-5 border-b border-gray-700">
          <Image className="w-12 md:w-20" src={logo} alt="Logo" />
          <button className="text-2xl" onClick={toggleDrawer}>
            <FiX className="text-[30px]" />
          </button>
        </div>
        <div className="flex flex-col gap-6 mt-6 px-4">
          <Link href="/about-us" className="hover:text-blue-400">
            About Us
          </Link>
          <Link href="/media" className="hover:text-blue-400">
            Media
          </Link>
          <Link href="/event" className="hover:text-blue-400">
            Event
          </Link>
          <Link href="/resources" className="hover:text-blue-400">
            Resource
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
          <button className="px-4 py-2 text-white bg-transparent rounded-xl border border-[#667085] w-[136px]">
            Sign up
          </button>
          <button className="px-4 py-2 text-white bg-gradient-to-l from-[#0061FF] to-[#003A99] rounded-xl w-[140px]">
            Member login
          </button>
        </div>
      </div>

      {/* Overlay for Drawer */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleDrawer}
        ></div>
      )}
    </div>
  );
};
