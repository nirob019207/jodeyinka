"use client";
import React, { useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { Editor } from "@tinymce/tinymce-react";

const CreateEvent = () => {
  // Form state
  const [formData, setFormData] = useState({
    sponsorType1: "Silver",
    sponsorFee1: "$100",
    sponsorType2: "Silver",
    sponsorFee2: "$200",
    sponsorType3: "Silver",
    sponsorFee3: "$500",
    title: "30 Flamez (0)",
    address: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  // Handle changes to form fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle TinyMCE editor change
  const handleEditorChange = (content: string) => {
    setFormData((prevData) => ({
      ...prevData,
      description: content,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Map the form data to the backend format
    const backendData = {
      title: formData.title,
      description: formData.description,
      date: new Date().toISOString(),
      venue: formData.address,
      startTime: formData.startDate,
      endTime: formData.endDate,
      silverSponsorFee: parseFloat(formData.sponsorFee1.replace('$', '')),
      goldSponsorFee: parseFloat(formData.sponsorFee2.replace('$', '')),
      platinumSponsorFee: parseFloat(formData.sponsorFee3.replace('$', '')),
    };

    // Console log the mapped data
    console.log("Event data to send to backend:", backendData);
  };

  return (
    <div className="px-16">
      <h1 className="text-3xl font-semibold mb-6 border-b border-[#E0E0E0] pb-3">Create Event</h1>
      <div className="flex space-x-6">
        {/* Product Image Section */}
        <div className="border-dashed border-2 p-6 text-center w-[260px] h-[243px] rounded-[8px] flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-2">
            <FaCirclePlus className="text-4xl text-[#949494]" />
            <p className="text-darkBlack font-medium">Drag and drop</p>
          </div>
          <p className="text-darkBlack my-2">Or</p>
          <button className="bg-[#0061FF1A] text-darkBlack px-4 py-2 rounded mt-2">Select</button>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-6 w-full">
          {/* Sponsor Types and Fees */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sponsor Type 1 */}
            <div>
              <label className="block font-medium text-darkGray">Sponsor Type</label>
              <select
                name="sponsorType1"
                value={formData.sponsorType1}
                onChange={handleChange}
                className="mt-2 px-4 py-3 w-full border rounded-[8px] focus:outline-none text-darkGray bg-transparent"
              >
                <option>Silver</option>
                <option>Gold</option>
                <option>Platinum</option>
              </select>
              <label className="block font-medium text-darkGray mt-4">Fee</label>
              <input
                type="text"
                name="sponsorFee1"
                value={formData.sponsorFee1}
                onChange={handleChange}
                className="mt-2 px-4 py-3 w-full border rounded-[8px] focus:outline-none bg-transparent"
                placeholder="$100"
              />
            </div>

            {/* Sponsor Type 2 */}
            <div>
              <label className="block font-medium text-darkGray">Sponsor Type</label>
              <select
                name="sponsorType2"
                value={formData.sponsorType2}
                onChange={handleChange}
                className="mt-2 px-4 py-3 w-full border rounded-[8px] focus:outline-none text-darkGray bg-transparent"
              >
                <option>Silver</option>
                <option>Gold</option>
                <option>Platinum</option>
              </select>
              <label className="block font-medium text-darkGray mt-4">Fee</label>
              <input
                type="text"
                name="sponsorFee2"
                value={formData.sponsorFee2}
                onChange={handleChange}
                className="mt-2 px-4 py-3 w-full border rounded-[8px] focus:outline-none bg-transparent"
                placeholder="$200"
              />
            </div>

            {/* Sponsor Type 3 */}
            <div>
              <label className="block font-medium text-darkGray">Sponsor Type</label>
              <select
                name="sponsorType3"
                value={formData.sponsorType3}
                onChange={handleChange}
                className="mt-2 px-4 py-3 w-full border rounded-[8px] focus:outline-none text-darkGray bg-transparent"
              >
                <option>Silver</option>
                <option>Gold</option>
                <option>Platinum</option>
              </select>
              <label className="block font-medium text-darkGray mt-4">Fee</label>
              <input
                type="text"
                name="sponsorFee3"
                value={formData.sponsorFee3}
                onChange={handleChange}
                className="mt-2 px-4 py-3 w-full border rounded-[8px] focus:outline-none bg-transparent"
                placeholder="$500"
              />
            </div>
          </div>

          {/* Event Title */}
          <div>
            <label className="block font-medium text-darkGray">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-2 px-4 py-3 w-full border rounded-[8px] focus:outline-none bg-transparent"
              placeholder="30 Flamez (0)"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block font-medium text-darkGray">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-2 px-4 py-3 w-full border rounded-[8px] focus:outline-none text-darkGray bg-transparent"
              placeholder="Address"
            />
          </div>

          {/* Start Date and End Date */}
          <div className="flex gap-6">
            <div className="w-full">
              <label className="block font-medium text-darkGray">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="mt-2 px-4 py-3 w-full border rounded-[8px] focus:outline-none text-darkGray bg-transparent"
              />
            </div>
            <div className="w-full">
              <label className="block font-medium text-darkGray">End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="mt-2 px-4 py-3 w-full border rounded-[8px] focus:outline-none text-darkGray bg-transparent"
              />
            </div>
          </div>

          {/* Description Editor */}
          <div>
            <label className="block font-medium text-darkGray">Description</label>
            <Editor
              apiKey="g68nc1d1w7r6ws2cu6q6c6trlsejbpqf5dylpj1b8hjeoc7d" 
              initialValue="<p>Product description</p>"
              init={{
                height: 200,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                content_style:
                  "body { font-family:Arial, Helvetica, sans-serif; font-size:14px }",
              }}
              onEditorChange={handleEditorChange}
            />
          </div>

          {/* Submit Button */}
         <div className="text-center">
         <button
            type="submit"
            className="bg-[#0061FF] text-white px-6 py-2 rounded mt-6 "
          >
            Create Event
          </button>
         </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
