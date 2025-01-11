import React from "react";

interface Plan {
  price: number;
  title: string;
  features: string[];
}

const Sponsorship: React.FC = () => {
  const plans: Plan[] = [
    {
      price: 250,
      title: "Silver",
      features: [
        "Unlock all the features",
        "24/7 Customer Support",
        "Access to Pro Group",
        "Cancel anytime you want to",
        "VIP Title",
      ],
    },
    {
      price: 450,
      title: "Gold",
      features: [
        "Unlock all the features",
        "24/7 Customer Support",
        "Access to Pro Group",
        "Cancel anytime you want to",
        "VIP Title",
      ],
    },
    {
      price: 550,
      title: "Platinum",
      features: [
        "Unlock all the features",
        "24/7 Customer Support",
        "Access to Pro Group",
        "Cancel anytime you want to",
        "VIP Title",
      ],
    },
  ];

  return (
    <div className="bg-[#F6F6F6] pt-[30px] md:pt-[60px] pb-[100px] md:pb-[200px]">
      <div className="container mx-auto md:px-0 text-center px-6">
        {/* Header */}
        <h1 className="text-3xl md:text-[36px] font-medium text-default mb-4">
          Choose Your Sponsorship Plan
        </h1>
        <p className="text-gray mb-12 w-full md:w-[738px] mx-auto">
          Protect what matters most with tailored membership options designed
          for individuals and organizations committed to cybersecurity
          excellence.
        </p>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-[24px] shadow-lg px-6 py-9 border ${
                index === 1 ? "border-yellow-500" : "border-[#DADADA]"
              }`}
            >
              <h2 className="text-4xl font-bold text-[#FFAE00] mb-[22px]">
                ${plan.price} <span className="text-[#090043] text-xl md:text-[24px]">/ {plan.title}</span>
              </h2>
              <ul className="text-[#09004380] space-y-4 mb-12">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center ml-[75px] md:w-[240px] mx-auto w-full">
                    <span className="text-lg">•</span>
                    <span className="ml-2">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full bg-gradient-to-l from-[#0061FF] to-[#003A99] text-white font-medium py-3 rounded-lg transition">
                Pay Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sponsorship;
