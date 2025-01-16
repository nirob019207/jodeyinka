import React from "react";

const EventRegister = () => {
  return (
    <div
      className="relative py-[133px] flex items-center justify-center font-inter"
      id="cyber"
    >
      <div className="text-center text-white px-4">
        <h1 className="text-[24px] md:text-[48px] font-semibold mb-3">
        Exclusive Event Registration
        </h1>
        <p className="text-[#FFFFFF mb-9 w-full md:w-[550px] mx-auto">
        Join us for an unforgettable event designed to inspire, connect, and engage. Reserve your spot now and be part of an experience that blends learning, networking, and entertainment in a unique and impactful way!
        </p>
        <button className="px-4 py-2 text-white bg-gradient-to-l from-[#0061FF] to-[#003A99] rounded-xl w-[140px]">
          Register Now
        </button>
      </div>
    </div>
  );
};

export default EventRegister;
