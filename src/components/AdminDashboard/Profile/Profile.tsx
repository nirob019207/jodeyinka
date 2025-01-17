"use client";

import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import profile from "@/asset/admin/profileadmin.svg";
import Image from "next/image";
import { useGetMeQuery, useUpdateProfileMutation, useChangePasswordMutation } from "@/redux/Api/userApi";
import { toast } from "sonner";

const Profile = () => {
  const { data, isLoading } = useGetMeQuery({});
  const [updateProfile] = useUpdateProfileMutation();
  const [changePassword] = useChangePasswordMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);

  // Set the initial state for userInfo to ensure it's always controlled
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    avatarUrl: "",
  });

  const [avatar, setAvatar] = useState<File | null>(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (data?.data) {
      setUserInfo({
        firstName: data.data.firstName || "",
        lastName: data.data.lastName || "",
        email: data.data.email || "",
        address: data.data.address || "",
        avatarUrl: data.data.avatarUrl || "",
      });
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedAvatar = e.target.files[0];
      setAvatar(selectedAvatar);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleUpdateClick = async () => {
    try {
      // Prepare updated data
      const updatedData = {
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        address: userInfo.address,
        avatarUrl: avatar ? URL.createObjectURL(avatar) : userInfo.avatarUrl || null, 
      };

      // Call API to update profile
      const response = await updateProfile(updatedData).unwrap();
      // console.log("response",response)

      if (response.success) {
        toast.success("Profile updated successfully!");
        setIsEditing(false);
      } else {
        toast.error("Error updating profile. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred while updating your profile.");
    }
  };

  const handleChangePasswordSubmit = async () => {
    try {
      if (data?.data?.password !== currentPassword) {
        toast.error("Your current password is incorrect.");
        return;
      }

      const response = await changePassword({
        password: currentPassword,
        newPassword,
      }).unwrap();

      if (response.success) {
        toast.success("Password changed successfully!");
        setIsChangePasswordModalOpen(false);
        setCurrentPassword("");
        setNewPassword("");
      } else {
        toast.error("Error changing password.");
      }
    } catch {
      toast.error("An error occurred while changing the password.");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-16 py-8 shadow rounded-lg">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-6">Account Profile</h1>
        <button
          onClick={handleEditClick}
          className="bg-transparent border border-[#D0D5DD] rounded-[8px] flex items-center gap-2 p-2 text-darkGray"
        >
          Edit
          <FaEdit className="mr-1" />
        </button>
      </div>

      <div className="flex items-center mb-6">
        {isEditing ? (
          <input
            type="file"
            name="avatar"
            onChange={handleAvatarChange}
            className="text-darkBlack mt-2 p-2 w-full border rounded-[8px] focus:outline-none bg-transparent"
          />
        ) : (
          <Image
            src={avatar ? URL.createObjectURL(avatar) : userInfo.avatarUrl || profile}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
            width={20}
            height={20}
          />
        )}
        <div className="ml-4">
          <h2 className="text-2xl font-semibold text-darkBlack">
            {userInfo.firstName} {userInfo.lastName}
          </h2>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h3 className="text-[24px] font-semibold mb-6">Personal Information</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-darkGray">First Name</label>
            {isEditing ? (
              <input
                type="text"
                name="firstName"
                value={userInfo.firstName}
                onChange={handleChange}
                className="text-darkBlack text-lg font-medium mt-2 px-4 py-3 w-full border rounded-[8px] focus:outline-none bg-transparent"
              />
            ) : (
              <p className="text-darkBlack text-lg font-medium">{userInfo.firstName}</p>
            )}
          </div>
          <div>
            <label className="text-darkGray">Last Name</label>
            {isEditing ? (
              <input
                type="text"
                name="lastName"
                value={userInfo.lastName}
                onChange={handleChange}
                className="text-darkBlack text-lg font-medium mt-2 px-4 py-3 w-full border rounded-[8px] focus:outline-none bg-transparent"
              />
            ) : (
              <p className="text-darkBlack text-lg font-medium">{userInfo.lastName}</p>
            )}
          </div>
          <div>
            <label className="text-darkGray">Email Address</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleChange}
                className="text-darkBlack text-lg font-medium mt-2 px-4 py-3 w-full border rounded-[8px] focus:outline-none bg-transparent"
              />
            ) : (
              <p className="text-darkBlack text-lg font-medium">{userInfo.email}</p>
            )}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h3 className="text-[24px] font-semibold mb-6">Address</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-darkGray">Address</label>
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={userInfo.address}
                onChange={handleChange}
                className="text-darkBlack text-lg font-medium mt-2 px-4 py-3 w-full border rounded-[8px] focus:outline-none bg-transparent"
              />
            ) : (
              <p className="text-darkBlack text-[18px] font-medium">{userInfo.address}</p>
            )}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h3 className="text-[24px] font-semibold mb-6">Password</h3>
        </div>
        <button
          onClick={() => setIsChangePasswordModalOpen(true)}
          className="text-blue-500 cursor-pointer"
        >
          Change Password
        </button>
      </div>

      {isEditing && (
        <div className="text-center">
          <button
            onClick={handleUpdateClick}
            className="bg-[#0061FF] text-white px-8 py-4 rounded hover:bg-blue-600"
          >
            Update Profile
          </button>
        </div>
      )}

      {isChangePasswordModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h3 className="text-lg font-semibold">Change Password</h3>
            <div className="mt-4">
              <label className="block text-sm">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full p-2 mt-2 border rounded-md"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2 mt-2 border rounded-md"
              />
            </div>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setIsChangePasswordModalOpen(false)}
                className="bg-gray-300 text-black py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleChangePasswordSubmit}
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
