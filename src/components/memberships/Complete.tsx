'use client';
import { useCompleteMutation } from '@/redux/Api/paypalApi';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useEffect, useRef } from 'react';
import { toast } from 'sonner';
import check from "@/asset/check.svg"
import confetti from "@/asset/confetti.svg"
import Image from 'next/image';
import Link from 'next/link';
import { useGetMeQuery } from '@/redux/Api/userApi';
import cookies from "js-cookie";
// import { setUser } from '@/redux/ReduxFunction';
// import { useDispatch } from 'react-redux';


export default function Complete() {
  const [complete] = useCompleteMutation();
  const { data} = useGetMeQuery({});
  // const dispatch=useDispatch()
  
    console.log("dlf",data?.data?.role);
  
    const role = data?.data?.role;
  const searchParams = useSearchParams();
  const router = useRouter();
  const hasExecuted = useRef(false); // To prevent multiple executions

  const userId = searchParams.get('userId');
  const purpose = searchParams.get('purpose');
  const token = searchParams.get('token');
  const PayerID = searchParams.get('PayerID');

  useEffect(() => {
    const handleComplete = async () => {
      if (!userId || !token || !PayerID) {
        console.error('Missing required query parameters');
        toast.error('Missing required payment details.');
        return;
      }

      try {
        await complete({
          userId,
          purpose,
          token,
          PayerID,
        }).unwrap();

         // Clear user data in Redux

    // Remove the token from cookies
    // cookies.remove("token");


        toast.success('Payment completed successfully!');
        setTimeout(() => {
          router.push('/'); // Redirect to the home page after successful payment
        }, 1000); // Delay of 2 seconds for user feedback
        
      } catch  {
        toast.error('Failed to complete the payment. Please try again.');
      }
    };
    cookies.set("role", role, { expires: 7, path: "/" });


    // Prevent double execution in strict mode
    if (!hasExecuted.current) {
      hasExecuted.current = true;
      handleComplete();
    }
  }, [userId, purpose, token, PayerID, complete, router,role]);

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gray-100 overflow-hidden">
      {/* Confetti Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${confetti.src})`, 
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Payment Box */}
      <div className="relative z-10 bg-white rounded-lg shadow-lg p-8 text-center max-w-md w-full">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <Image src={check} alt="Check" width={50} height={50} />
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-[#090043] mb-4">
          Payment Successful!
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-base md:text-lg">
          Your payment was successful! Thank you for your transaction; a
          confirmation has been sent to your email.
        </p>

        {/* Back to Home Link */}
        <div className="mt-8">
          <Link
            href="/"
            className="text-blue-600 hover:underline text-lg font-medium"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
