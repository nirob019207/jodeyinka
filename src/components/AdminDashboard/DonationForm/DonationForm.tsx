"use client"
import React from "react";

const DonationForm: React.FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Add your form submission logic here
    console.log("Form submitted");
  };

  return (
    <div className="px-16">
      {/* <h1 className="text-xl font-semibold mb-6">Donation Amount:</h1> */}

      <form onSubmit={handleSubmit}>
        {/* Donation Amount Dropdown */}
        <div className="mb-4 mt-12 w-[504px] mx-auto">
          <label className="text-darkBlack">
            Donation Amount
          </label>
          <select
            id="donationAmount"
            className="w-full p-3 border-[2px] border-[#E0E0E0] rounded-lg bg-gray-50 focus:outline-none bg-transparent mt-2"
          >
            <option value="$500">$500</option>
            <option value="$1000">$1000</option>
            <option value="$1500">$1500</option>
          </select>
        </div>

        {/* Title */}
        <div className="mb-4">
          <label className="text-darkBlack">
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="30 Flamez (0)"
            className="w-full p-3 border-[2px] border-[#E0E0E0] rounded-lg bg-gray-50 focus:outline-none bg-transparent mt-2"
          />
        </div>

        {/* Address */}
        <div className="mb-4">
          <label htmlFor="address" className="text-darkBlack">
            Address
          </label>
          <input
            id="address"
            type="text"
            placeholder="Address"
            className="w-full p-3 border-[2px] border-[#E0E0E0] rounded-lg bg-gray-50 focus:outline-none bg-transparent mt-2"
          />
        </div>

        {/* Date and Phone Number */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="date" className="text-darkBlack">
              Date
            </label>
            <input
              id="date"
              type="date"
              defaultValue="2024-12-12"
              className="w-full p-3 border-[2px] border-[#E0E0E0] rounded-lg bg-gray-50 focus:outline-none bg-transparent mt-2"
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="text-darkBlack">
              Phone Number
            </label>
            <input
              id="phoneNumber"
              type="text"
              placeholder="Phone Number"
              className="w-full p-3 border-[2px] border-[#E0E0E0] rounded-lg bg-gray-50 focus:outline-none bg-transparent mt-2"
            />
          </div>
        </div>

        {/* Comment */}
        <div className="mb-12" >
          <label htmlFor="comment" className="text-darkBlack">
            Comment
          </label>
          <textarea
            id="comment"
            placeholder="Writing something"
            rows={4}
            className="w-full p-3 border-[2px] border-[#E0E0E0] rounded-lg bg-gray-50 focus:outline-none bg-transparent mt-2"
          ></textarea>
        </div>

        {/* Submit Button */}
       <div className="text-center w-[200px] mx-auto">
       <button
          type="submit"
          className="w-full bg-[#0061FF] text-white py-3 rounded-lg px-8 text-center"
        >
          Submit
        </button>
       </div>
      </form>
    </div>
  );
};

export default DonationForm;
