"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useEventDetailsQuery } from "@/redux/Api/eventApi";
import SquarePaymentForm from "./SquarePaymentForm";
import { MdClose } from "react-icons/md";

interface Plan {
  price: number;
  title: string;
  isAvailable: boolean;
}

const Sponsorship: React.FC = () => {
  const { id } = useParams();
  const { data: sponsor } = useEventDetailsQuery({
    id: id as string,
  });

  const sponsors = sponsor?.data;

  const plans: Plan[] = [
    {
      title: "SILVER",
      price: sponsors?.event?.silverSponsorFee || 0,
      isAvailable: sponsors?.event?.silverSponsorAvailable || false,
    },
    {
      title: "GOLD",
      price: sponsors?.event?.goldSponsorFee || 0,
      isAvailable: sponsors?.event?.goldSponsorAvailable || false,
    },
    {
      title: "PLATINUM",
      price: sponsors?.event?.platinumSponsorFee || 0,
      isAvailable: sponsors?.event?.platinumSponsorAvailable || false,
    },
  ];

  const [selectedPlan, setSelectedPlan] = React.useState<Plan | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isPaymentDone, setIsPaymentDone] = React.useState(false); // New state to track payment status

  // Check if any plan was already selected and paid for in localStorage
  const paidPlan = localStorage.getItem("paidPlan");

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPlan(null);
  };

  React.useEffect(() => {
    // Disable the select buttons if a plan has been paid for
    if (paidPlan) {
      setIsPaymentDone(true); // Set payment status to true when a plan has been paid for
      const plan = plans.find((plan) => plan.title === paidPlan);
      if (plan) {
        setSelectedPlan(plan);
      }
    }
  }, [plans, paidPlan]);

  const handlePaymentSuccess = (planTitle: string) => {
    // Save the paid plan to localStorage
    localStorage.setItem("paidPlan", planTitle);
    setSelectedPlan(plans.find((plan) => plan.title === planTitle) || null);
    setIsPaymentDone(true); // Set payment status to true once payment is successful
  };

  return (
    <div className="bg-[#F6F6F6] pt-[30px] md:pt-[60px] pb-[100px] md:pb-[200px]">
      <div className="container mx-auto md:px-0 text-center px-6">
        <h1 className="text-3xl md:text-[36px] font-medium text-default mb-4">
          Choose Your Sponsorship Plan
        </h1>
        <p className="text-gray mb-12 w-full md:w-[738px] mx-auto">
          Protect what matters most with tailored membership options designed
          for individuals and organizations committed to cybersecurity
          excellence.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-[24px] shadow-lg px-6 py-9 border ${
                index === 2 ? "border-yellow-500" : "border-[#DADADA]"
              }`}
            >
              <h2 className="text-4xl font-bold text-[#FFAE00] mb-[22px]">
                ${plan.price}{" "}
                <span className="text-[#090043] text-xl md:text-[24px]">
                  / {plan.title}
                </span>
              </h2>

              <button
                onClick={() => {
                  if (!paidPlan) {
                    setSelectedPlan(plan);
                    setIsModalOpen(true); 
                  }
                }}
                disabled={isPaymentDone || paidPlan === plan.title} // Disable if any plan has been paid for
                className={`w-full bg-gradient-to-l from-[#0061FF] to-[#003A99] py-3 px-4 rounded-lg text-white ${
                  isPaymentDone || paidPlan === plan.title
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
               { paidPlan === plan.title ? "Payment Compelete" : "Select Plan"}
              </button>
            </div>
          ))}
        </div>

        {/* Modal */}
        {isModalOpen && selectedPlan && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-lg relative">
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <div className="bg-white shadow text-red-500 rounded-md p-1">
                  <MdClose />
                </div>
              </button>
              <SquarePaymentForm
                price={selectedPlan.price}
                type={selectedPlan.title}
                handleCloseModal={handleCloseModal}
                onPaymentSuccess={() => handlePaymentSuccess(selectedPlan.title)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sponsorship;
