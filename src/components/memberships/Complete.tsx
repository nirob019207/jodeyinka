'use client';
import { useCompleteMutation } from '@/redux/Api/paypalApi';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import confetti from '@/asset/confetti.svg';

export default function Complete() {
  const [complete] = useCompleteMutation();
  const [isLoading, setIsLoading] = useState(false); // State for loading
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

      setIsLoading(true); // Start loading

      try {
        await complete({
          userId,
          purpose,
          token,
          PayerID,
        }).unwrap();

        toast.success('Payment completed successfully!');
        setTimeout(() => {
          router.replace('/gohome'); // Use replace to avoid causing a window reload
        }, 1000);
      } catch {
        toast.error('Failed to complete the payment. Please try again.');
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    // Prevent double execution in strict mode
    if (!hasExecuted.current) {
      hasExecuted.current = true;
      handleComplete();
    }
  }, [userId, purpose, token, PayerID, complete, router]);

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

      <div className="relative z-10 bg-white rounded-lg shadow-lg p-8 text-center max-w-md w-full">
        {isLoading ? (
          // Skeleton Loader
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-4/5 mx-auto"></div>
          </div>
        ) : (
          <div>
            {/* Content after successful payment */}
            <h2 className="text-lg font-semibold text-gray-800">
              Completing Payment...
            </h2>
            <p className="text-sm text-gray-600">
              Please wait while we process your payment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
