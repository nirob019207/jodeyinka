'use client';
import { useCompleteMutation } from '@/redux/Api/paypalApi';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useEffect, useRef } from 'react';
import { toast } from 'sonner';

export default function Complete() {
  const [complete] = useCompleteMutation();
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
        const response = await complete({
          userId,
          purpose,
          token,
          PayerID,
        }).unwrap();

        toast.success('Payment completed successfully!');
        setTimeout(() => {
          router.push('/'); // Redirect to the home page after successful payment
        }, 2000); // Delay of 2 seconds for user feedback
      } catch (err) {
        toast.error('Failed to complete the payment. Please try again.');
      }
    };

    // Prevent double execution in strict mode
    if (!hasExecuted.current) {
      hasExecuted.current = true;
      handleComplete();
    }
  }, [userId, purpose, token, PayerID, complete, router]);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div>
        <h1 className="text-2xl font-bold mb-4">Completing Your Payment...</h1>
        <p className="text-gray-600">Please wait while we process your payment.</p>
      </div>
    </div>
  );
}
