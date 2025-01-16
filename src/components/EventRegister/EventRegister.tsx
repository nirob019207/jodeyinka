"use client";
import { useState } from "react";
import { useRegisterForEventMutation } from "@/redux/Api/eventApi";
import { useParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const EventRegister = () => {
  const { id } = useParams();
  const [registerForEvent] = useRegisterForEventMutation();
  const [showModal, setShowModal] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegister = async () => {
    const response = await registerForEvent(id).unwrap();
    if (response.success) {
      toast.success("Event registered successfully");
      setIsRegistered(true);
      setShowModal(false);
    }
  };

  return (
    <div
      className="relative py-[133px] flex items-center justify-center font-inter"
      id="cyber"
    >
      <div className="text-center text-white px-4">
        <h1 className="text-[24px] md:text-[48px] font-semibold mb-3">
          Exclusive Event Registration
        </h1>
        <p className="text-[#FFFFFF] mb-9 w-full md:w-[550px] mx-auto">
          Join us for an unforgettable event designed to inspire, connect, and
          engage. Reserve your spot now and be part of an experience that blends
          learning, networking, and entertainment in a unique and impactful way!
        </p>
        <button
          onClick={() => setShowModal(true)} // Show the modal on button click
          className={`px-4 py-2 text-white bg-gradient-to-l from-[#0061FF] to-[#003A99] rounded-xl w-[140px] ${isRegistered ? 'bg-slate-400 cursor-not-allowed' : ''}`} 
          disabled={isRegistered} 
        >
          {isRegistered ? 'Registered' : 'Register Now'}
        </button>
      </div>

      {/* Modal */}
      {showModal && !isRegistered && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <h2 className="text-xl font-semibold text-center mb-4">
              Are you sure you want to register?
            </h2>
            <p className="text-center mb-6">
              By registering, you are confirming your spot for this exclusive event.
            </p>
            <div className="flex justify-around">
              <button
                onClick={handleRegister}
                className="px-6 py-2 bg-gradient-to-l from-[#0061FF] to-[#003A99] text-white rounded-lg"
              >
                Yes, Register
              </button>
              <button
                onClick={() => setShowModal(false)} // Close the modal
                className="px-6 py-2 bg-gray-400 text-white rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventRegister;
