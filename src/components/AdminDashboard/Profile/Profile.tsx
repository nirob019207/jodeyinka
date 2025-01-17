"use client";

import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import profile from "@/asset/admin/profileadmin.svg";
import Image from "next/image";
import {
  useGetMeQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} from "@/redux/Api/userApi";
import { toast } from "sonner";

const Profile = () => {
  const { data, isLoading } = useGetMeQuery({});
  const [updateProfile] = useUpdateProfileMutation();
  const [changePassword] = useChangePasswordMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);

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
      setAvatar(e.target.files[0]);
    }
  };

  // handle profile update funtionality 
  const handleUpdateClick = async () => {
    try {
      // Convert avatar to base64 string if a new avatar is selected
      let avatarBase64 = userInfo.avatarUrl;
  
      if (avatar) {
        const reader = new FileReader();
        await new Promise((resolve, reject) => {
          reader.onload = () => {
            avatarBase64 = reader.result as string;
            resolve(true);
          };
          reader.onerror = () => {
            toast.error("Failed to process the image.");
            reject();
          };
          reader.readAsDataURL(avatar);
        });
      }
  
      // Prepare the updated data object
      const updatedData = {
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        address: userInfo.address,
        avatarUrl: avatarBase64, 
      };
  
      // Call the API to update the profile
      const response = await updateProfile(updatedData).unwrap();
      if (response.success) {
        toast.success("Profile updated successfully!");
  
        // Update the userInfo state with the latest data
        setUserInfo((prev) => ({
          ...prev,
          avatarUrl: response.data.avatarUrl,
        }));
  
        setAvatar(null); 
        setIsEditing(false); 
      } else {
        toast.error("Error updating profile. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred while updating your profile.");
    }
  };
  

  // handle change password funtionality
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
    <div className="p-4 md:p-8 lg:p-16 bg-transparent shadow rounded-lg">
      <div className="flex flex-col sm:flex-row items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4 sm:mb-0">Account Profile</h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-2 border border-gray-300 rounded px-4 py-2 text-sm font-medium hover:bg-gray-100"
        >
          <FaEdit />
          Edit
        </button>
      </div>

      <div className="flex flex-col lg:flex-row items-center mb-8 gap-6">
        <div className="relative w-24 h-24 lg:w-32 lg:h-32 rounded-full">
          {isEditing ? (
            <input
              type="file"
              name="avatar"
              onChange={handleAvatarChange}
              className="absolute inset-0 opacity-50  cursor-pointer"
            />
          ) : (
            <Image
              src={avatar ? URL.createObjectURL(avatar) : userInfo.avatarUrl || profile}
              alt="Profile"
              className="rounded-full object-cover"
              layout="fill"
            />
          )}
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-xl font-semibold">
            {userInfo.firstName} {userInfo.lastName}
          </h2>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600">First Name</label>
            {isEditing ? (
              <input
                type="text"
                name="firstName"
                value={userInfo.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
              />
            ) : (
              <p>{userInfo.firstName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm text-gray-600">Last Name</label>
            {isEditing ? (
              <input
                type="text"
                name="lastName"
                value={userInfo.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
              />
            ) : (
              <p>{userInfo.lastName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm text-gray-600">Email</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
              />
            ) : (
              <p>{userInfo.email}</p>
            )}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Address</h3>
        <div>
          <label className="block text-sm text-gray-600">Address</label>
          {isEditing ? (
            <input
              type="text"
              name="address"
              value={userInfo.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
          ) : (
            <p>{userInfo.address}</p>
          )}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Password</h3>
        <button
          onClick={() => setIsChangePasswordModalOpen(true)}
          className="text-blue-500"
        >
          Change Password
        </button>
      </div>

      {isEditing && (
        <div className="text-center">
          <button
            onClick={handleUpdateClick}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Update Profile
          </button>
        </div>
      )}

      {isChangePasswordModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-slate-100 p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Change Password</h3>
            <div>
              <label className="block text-sm">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded"
              />
            </div>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setIsChangePasswordModalOpen(false)}
                className="px-4 py-2 border rounded text-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleChangePasswordSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
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
