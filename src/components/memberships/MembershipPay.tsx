'use client';

import { usePaypalMutation } from "@/redux/Api/paypalApi"; // Adjust the import path based on your structure
import Image from "next/image";
import payment from "@/asset/payment.svg";

export default function MembershipPay() {

  const [paypal, { isLoading, isError }] = usePaypalMutation();

  const handlePayment = async () => {
    try {
      // Send the payment request to PayPal API
      const response = await paypal({
        purpose: "MEMBERSHIP",
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
    <div className="min-h-screen flex justify-center items-center bg-[#F5F5F5] rounded-lg">
      <div className="bg-white flex flex-col items-center md:flex-row justify-between p-6  max-w-7xl w-full">
        {/* Left Section - Image */}
        <div className="flex justify-center items-center w-full md:w-1/2">
          <Image
            src={payment.src}
            alt="Unlock Exclusive Benefits"
            width={300}
            height={300}
            className="w-auto h-auto object-contain"
          />
        </div>

        {/* Right Section - Payment Info */}
        <div className="w-full md:w-1/2 flex flex-col justify-start items-center text-gray-800">
          <h3 className="text-xl md:text-2xl font-semibold text-center">
            Unlock Exclusive Benefits
          </h3>
          <div className="bg-gray-50 shadow-md rounded-lg p-6 w-full">
            <div className="text-lg font-bold text-blue-600 mb-2 text-center">Membership</div>
            <div className="text-3xl font-bold text-center mb-6">
              $1 <span className="text-sm text-gray-600">/ Membership</span>
            </div>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Cutting-Edge Security Insights</li>
              <li>Resource Library Access</li>
              <li>AI-Powered Chatbot Support</li>
              <li>Trending Content Updates</li>
              <li>Community Engagement Forum</li>
              <li>Event Notifications & Calendar</li>
            </ul>
          </div>
          <button
            onClick={handlePayment}
            disabled={isLoading}
            className={`mt-6 bg-gradient-to-l from-blue-500 to-blue-600 text-white py-2 px-6 rounded-md shadow-md hover:from-blue-600 hover:to-blue-700 transition w-full${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Processing..." : "Payment"}
          </button>
          {isError && (
            <p className="text-red-500 mt-4">Payment failed. Please try again.</p>
          )}
        </div>
      </div>
    </div>
  );
}
