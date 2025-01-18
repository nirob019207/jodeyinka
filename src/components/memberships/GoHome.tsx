"use client";
import { useRefreshTokenQuery } from "@/redux/Api/userApi";
import React, { useEffect } from "react";
import cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { setUser } from "@/redux/ReduxFunction";
import { useDispatch } from "react-redux";

import confetti from '@/asset/confetti.svg';
import { jwtDecode } from "jwt-decode";


interface DecodedToken {
  role: string;
  email: string;
}

export default function GoHome() {
  const { data: refresh } = useRefreshTokenQuery({});
  const router = useRouter();
  const dispatch = useDispatch();

  // Check if it's the first time the user has visited
  useEffect(() => {
    window.location.reload();
   
  }, []);

  
  const handleRefreshToken = () => {
    if (refresh?.data) {
      const decoded: DecodedToken = jwtDecode(refresh.data);
      const { role, email } = decoded;

      // Dispatch the user data to Redux
      dispatch(setUser({ role, token: refresh.data, email }));
      cookies.set("token", refresh.data, { expires: 7 }); // Set token in cookies

      // Push to homepage
      router.push("/");
    } else {
      console.error("No refresh token data available.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
        <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${confetti.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
      <div className="relative z-10 bg-white rounded-lg shadow-lg p-8 text-center max-w-md w-full">
        {/* Success Icon */}
       

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-[#090043] mb-4">
          Payment Successful!
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-base md:text-lg">
          Your payment was successful! Thank you for your transaction; a confirmation has been sent to your email.
        </p>
      </div>

      {/* Back to Home Button */}
      <button
        type="button"
        onClick={handleRefreshToken}
        className="text-blue-600 hover:underline text-lg font-medium"
      >
        Back to Home
      </button>
    </div>
  );
}
