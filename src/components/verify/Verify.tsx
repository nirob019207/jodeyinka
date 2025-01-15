'use client';
import { useRequestVerifyQuery } from '@/redux/Api/userApi';
import { useSearchParams, useRouter, useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { toast } from 'sonner';
import check from "@/asset/check.svg";
import confetti from "@/asset/confetti.svg";
import Image from 'next/image';
import Link from 'next/link';

export default function Verify() {
  const {token} = useParams();
  const router = useRouter();
  console.log(token)

  const { data: verifyData, isLoading, isError, error } = useRequestVerifyQuery(token || '');

  useEffect(() => {
    if (!token) {
      toast.error('Invalid or missing token.');
      router.push('/'); // Redirect if no token is found
      return;
    }

    if (isError) {
      toast.error('Verification failed. Please try again.');
      console.error('Verification Error:', error);
    } else if (verifyData) {
      toast.success('Verification successful!');
      setTimeout(() => {
        router.push('/'); // Redirect to home after verification
      }, 2000);
    }
  }, [token, verifyData, isError, error, router]);

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gray-100 overflow-hidden">
      {/* Confetti Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${confetti.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>

      {/* Verification Box */}
      <div className="relative z-10 bg-white rounded-lg shadow-lg p-8 text-center max-w-md w-full">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <Image src={check} alt="Check" width={50} height={50} />
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-[#090043] mb-4">
          {isLoading ? 'Verifying...' : verifyData ? 'Verification Successful!' : 'Verification Failed'}
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-base md:text-lg">
          {isLoading
            ? 'Please wait while we verify your email...'
            : verifyData
            ? 'Your email verification was successful! Thank you for confirming your account.'
            : 'Unfortunately, your email verification failed. Please try again.'}
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
