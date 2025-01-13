"use client";

import React from "react";
import { usePaypalMutation } from "@/redux/Api/paypalApi"; // Adjust import path based on your structure
import { useParams, useRouter } from "next/navigation";
import { useEventDetailsQuery } from "@/redux/Api/eventApi";

interface Plan {
  price: number;
  title: string;
  isAvailable: boolean;
}

const Sponsorship: React.FC = () => {
  const router = useRouter();
  const id = useParams();
  const { data: sponsor, isLoading: isFetchingEvent } = useEventDetailsQuery({ id: id?.id });
  const sponsors = sponsor?.data;

  const [paypal, { isLoading: isProcessingPayment }] = usePaypalMutation();

  const plans: Plan[] = [
    
    {
      title: "Silver",
      price: sponsors?.silverSponsorFee || 0,
      isAvailable: sponsors?.silverSponsorAvailable || false,
    },
    {
      title: "Gold",
      price: sponsors?.goldSponsorFee || 0,
      isAvailable: sponsors?.goldSponsorAvailable || false,
    },
    {
      title: "Platinum",
      price: sponsors?.platinumSponsorFee || 0,
      isAvailable: sponsors?.platinumSponsorAvailable || false,
    },
  ];

  const handlePayment = async (plan: Plan) => {
    try {
      const response = await paypal({
        purpose: plan.title.toUpperCase(),
        amount: plan.price.toString(),
      }).unwrap();

      if (response.success) {
        const approvalLink = response.data.links.find((link: any) => link.rel === "approve")?.href;

        if (approvalLink) {
          window.location.href = approvalLink;
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
    <div className="bg-[#F6F6F6] pt-[30px] md:pt-[60px] pb-[100px] md:pb-[200px]">
      <div className="container mx-auto md:px-0 text-center px-6">
        {/* Header */}
        <h1 className="text-3xl md:text-[36px] font-medium text-default mb-4">
          Choose Your Sponsorship Plan
        </h1>
        <p className="text-gray mb-12 w-full md:w-[738px] mx-auto">
          Protect what matters most with tailored membership options designed
          for individuals and organizations committed to cybersecurity excellence.
        </p>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-[24px] shadow-lg px-6 py-9 border ${
                index === 3 ? "border-yellow-500" : "border-[#DADADA]"
              }`}
            >
              <h2 className="text-4xl font-bold text-[#FFAE00] mb-[22px]">
                ${plan.price}{" "}
                <span className="text-[#090043] text-xl md:text-[24px]">  
                  / {plan.title}
                </span>
              </h2>

              <button
                onClick={() => handlePayment(plan)}
                disabled={isProcessingPayment || !plan.isAvailable}
                className={`w-full ${
                  plan.isAvailable
                    ? "bg-gradient-to-l from-[#0061FF] to-[#003A99]"
                    : "bg-gray-400 cursor-not-allowed"
                } text-white font-medium py-3 rounded-lg transition`}
              >
                {isProcessingPayment ? "Processing..." : plan.isAvailable ? "Pay Now" : "Unavailable"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sponsorship;
