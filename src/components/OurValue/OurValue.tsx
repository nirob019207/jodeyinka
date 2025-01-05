import React from "react";
import Image from "next/image";
import badge1 from "@/asset/about/badge1.svg";
import badge2 from "@/asset/about/badge2.svg";
import badge3 from "@/asset/about/badge3.svg";
import badge4 from "@/asset/about/badge4.svg";

const OurValue = () => {
  const values = [
    {
      icon: badge1,
      title: "Quality",
      description:
        "Delivering excellence in every line of code and pixel of design.",
    },
    {
      icon: badge2,
      title: "Integrity",
      description:
        "Maintaining the highest ethical standards in all our endeavors.",
    },
    {
      icon: badge3,
      title: "Innovation",
      description:
        "Constantly pushing boundaries and embracing new technologies.",
    },
    {
      icon: badge4,
      title: "Collaboration",
      description:
        "Working closely with our clients to bring their vision to life.",
    },
  ];

  return (
    <section className="bg-[#F6F6F6] py-[30px] md:py-[60px] px-6 md:px-0">
      <div className="container mx-auto px-0">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-medium text-default mb-8">
          Our Values
        </h2>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((value, index) => (
            <div
              key={index}
              className="flex items-start bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
            >
              {/* Icon */}
              <div className="w-[70px] h-[70px] flex-shrink-0 bg-[#09004333] rounded-lg shadow-md flex items-center justify-center mr-4">
                <Image
                  src={value.icon}
                  alt={value.title}
                  width={40}
                  height={40}
                />
              </div>

              {/* Content */}
              <div>
                <h3 className="text-xl md:text-[24px] font-medium text-default mb-2">
                  {value.title}
                </h3>
                <p className="text-[#475467]">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurValue;
