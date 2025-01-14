import { FaEdit } from "react-icons/fa";
import profile from "@/asset/admin/profileadmin.svg";
import Image from "next/image";

const Profile = () => {
  return (
    <div className="px-16">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-6">Account Profile</h1>
        <button className="bg-transparent border border-[#D0D5DD] rounded-[8px] flex items-center gap-2 p-2 text-darkGray">
          Edit
          <FaEdit className="mr-1" />
        </button>
      </div>

      {/* Account Header */}
      <div className="flex items-center mb-6">
        <Image
          src={profile}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover"
        />
        <div className="ml-4">
          <h2 className="text-2xl font-semibold text-darkBlack">Jake Jones</h2>
          <p className="text-darkGray">Product Manager</p>
          <p className="text-darkGray">Leeds, United Kingdom</p>
        </div>
      </div>

      {/* Personal Information */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h3 className="text-[24px] font-semibold mb-6">
            Personal Information
          </h3>
          <button className="bg-transparent border border-[#D0D5DD] rounded-[8px] flex items-center gap-2 p-2 text-darkGray">
            Edit
            <FaEdit className="mr-1" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-darkGray">First Name</label>
            <p className="text-darkBlack text-lg font-medium">Jake</p>
          </div>
          <div>
            <label className="text-darkGray">Last Name</label>
            <p className="text-darkBlack text-lg font-medium">Jones</p>
          </div>
          <div>
            <label className="text-darkGray">Email Address</label>
            <p className="text-darkBlack text-lg font-medium">jake@gmail.com</p>
          </div>
          <div>
            <label className="text-darkGray">Phone</label>
            <p className="text-darkBlack text-lg font-medium">+09 3454 346 46</p>
          </div>
        </div>
      </div>

      {/* Address Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h3 className="text-[24px] font-semibold mb-6">Address</h3>
          <button className="bg-transparent border border-[#D0D5DD] rounded-[8px] flex items-center gap-2 p-2 text-darkGray">
            Edit
            <FaEdit className="mr-1" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-darkGray">Address</label>
            <p className="text-darkBlack text-[18px] font-medium">27 Oak Street</p>
          </div>
          <div>
            <label className="text-darkGray">Apt/Suite</label>
            <p className="text-darkBlack text-[18px] font-medium">Apt 3B</p>
          </div>
          <div>
            <label className="text-darkGray">City</label>
            <p className="text-darkBlack text-[18px] font-medium">Manchester</p>
          </div>
          <div>
            <label className="text-darkGray">State</label>
            <p className="text-darkBlack text-[18px] font-medium">Greater Manchester</p>
          </div>
        </div>
      </div>

      {/* Password Section */}
      <div className="mb-12">
        <h3 className="text-[24px] font-semibold mb-6">Password</h3>
        <p className="text-blue-500 cursor-pointer">Change Password</p>
      </div>

      {/* Update Button */}
      <div className="text-center">
        {" "}
        <button className="bg-[#0061FF] text-white px-8 py-4 rounded hover:bg-blue-600">
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
