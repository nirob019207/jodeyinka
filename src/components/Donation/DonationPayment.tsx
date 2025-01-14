"use client"
import Image from "next/image";
import payment from "@/asset/payment.svg";
import { MdClose } from "react-icons/md";
import { SquareDonate } from "./SquareDonate";
import { useState } from "react";

export const DonationPayment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [price, setPrice] = useState(""); // State for donation amount

  const handleOpenModal = () => {
    if (!price || Number(price) <= 0) {
      setError("Please enter a valid donation amount.");
      return;
    }
    setError(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setError(null); // Reset error when closing modal
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="bg-white flex justify-between p-6 shadow-lg rounded-lg max-w-4xl w-full">
        {/* Header */}
        <div className="flex justify-center items-center w-1/2">
          <Image
            src={payment.src}
            alt="Donate"
            width={80}
            height={80}
            className="w-auto h-auto object-contain"
          />
        </div>

        {/* Donation Form */}
        <div className="w-1/2 flex flex-col justify-center items-center">
          {/* Title */}
          <h4 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Make a Donation
          </h4>
          <p className="text-center text-gray-600 mb-6">
            Your contribution helps us make a difference.
          </p>

          {/* Input and Button */}
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleOpenModal();
            }}
          >
            <div>
              <label
                htmlFor="donation"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Donation Amount
              </label>
              <input
                type="number"
                id="donation"
                placeholder="$10"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
              />
              {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white text-lg font-medium py-3 rounded-lg shadow-md hover:bg-primary-dark transition"
            >
              Proceed to Payment
            </button>
          </form>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <div className="bg-white shadow text-red-500 rounded-full p-2">
                <MdClose />
              </div>
            </button>

            {/* Pass the dynamic price to SquarePaymentForm */}
            <SquareDonate
              price={Number(price)} // Use the dynamic price from state
              handleCloseModal={handleCloseModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};
