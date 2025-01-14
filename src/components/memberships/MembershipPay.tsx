'use client';

import { usePaypalMutation } from "@/redux/Api/paypalApi"; // Adjust the import path based on your structure
import { useRouter } from "next/navigation";
import Image from "next/image";
import payment from "@/asset/payment.svg";




export default function MembershipPay() {
    const router = useRouter();
  const [paypal, { isLoading, isError, error }] = usePaypalMutation();

  const handlePayment = async () => {
    try {
      // Send the payment request to PayPal API
      const response = await paypal({
        purpose: "DONATE",
        amount: "1",
      }).unwrap();

      // Handle success
      console.log("Payment successful:", response);

      if (response.success) {
        // Find the approval link and redirect the user
        const approvalLink = response.data.links.find(
          (link: any) => link.rel === "approve"
        )?.href;

        if (approvalLink) {
          window.location.href = approvalLink; // Redirect to PayPal approval page
        } else {
          console.error("Approval link not found.");
        }
      } else {
        console.error("Payment creation failed.");
      }
    } catch (err) {
      console.error("Payment error:", err);
    }
  };
  return (
    <div>
        <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="bg-white flex flex-col md:flex-row justify-between p-6 shadow-lg rounded-lg max-w-4xl w-full">
        {/* Left Section - Image */}
        <div className="flex justify-center items-center w-full md:w-1/2 mb-6 md:mb-0">
          <Image
            src={payment.src}
            alt="Donate"
            width={200}
            height={200}
            className="w-auto h-auto object-contain"
          />
        </div>

        {/* Right Section - Payment Info */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center">
          <h4 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Make a Donation
          </h4>
          <p className="text-center text-gray-600 mb-6">
            Your contribution helps us make a difference.
          </p>
          <button
            onClick={handlePayment}
            disabled={isLoading}
            className={`bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-lg transition ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Processing..." : "Pay Now"}
          </button>
          {isError && (
            <p className="text-red-500 mt-4">Payment failed. Please try again.</p>
          )}
        </div>
      </div>
    </div>
        
    </div>
  )
}


