"use client";
import { useRefreshTokenQuery } from "@/redux/Api/userApi";
import cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { setUser } from "@/redux/ReduxFunction";
import { useDispatch } from "react-redux";

import confetti from '@/asset/confetti.svg';
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import { useState } from "react";


interface DecodedToken {
  role: string;
  email: string;
}

export default function GoHome() {
  const { data: refresh } = useRefreshTokenQuery({});
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();



  
  const handleRefreshToken = () => {
    setLoading(true); // Set the loader to true
    
    if (refresh?.data) {
      const decoded: DecodedToken = jwtDecode(refresh.data);
      const { role, email } = decoded;
  
      // Dispatch the user data to Redux
      dispatch(setUser({ role, token: refresh.data, email }));
      cookies.set("token", refresh.data, { expires: 7 }); // Set token in cookies
  
      // Show loader for 1 second
      setTimeout(() => {
        // Push to homepage after 1 second
        router.push("/");
  
        setLoading(false); // Hide the loader
        toast.success('Token refreshed and redirected!'); // Success toast message
      }, 1000);
    } else {
      console.error("No refresh token data available.");
      setLoading(false); // Hide loader in case of error
      toast.error('Failed to refresh token.'); // Error toast message
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
        {/* Loading State */}
        {loading && <div className="mb-4">Loading...</div>}

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-[#090043] mb-4">
          Payment Successful!
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-base md:text-lg">
          Your payment was successful! Thank you for your transaction; a confirmation has been sent to your email.
        </p>
        <button
        type="button"
        onClick={handleRefreshToken}
        className="text-blue-600 hover:underline text-lg font-medium z-50"
      >
        Back to Home
      </button>
      </div>

      {/* Back to Home Button */}
      
    </div>
  );
}
