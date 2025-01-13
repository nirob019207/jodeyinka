"use client";
import React from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { Editor } from "@tinymce/tinymce-react";

const CreateEvent = () => {
  const handleEditorChange = (content: string) => {
    console.log("Content was updated:", content);
  };

  return (
    <div className="px-16">
      <h1 className="text-3xl font-semibold mb-6 border-b border-[#E0E0E0] pb-3">
        Create Event
      </h1>
      <div className="flex space-x-6">
        {/* Product Image Section */}
        <div className="border-dashed border-2 p-6 text-center w-[260px] h-[243px] rounded-[8px] flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-2">
            <FaCirclePlus className="text-4xl text-[#949494]" />
            <p className="text-darkBlack font-medium">Drag and drop</p>
          </div>
          <p className="text-darkBlack my-2">Or</p>
          <button className="bg-[#0061FF1A] text-darkBlack px-4 py-2 rounded mt-2">
            Select
          </button>
        </div>

        {/* Form Fields */}
        <div className="space-y-6 w-full">
          {/* Sponsor Types and Fees */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sponsor Type 1 */}
            <div>
              <label className="block font-medium text-darkGray">Sponsor Type</label>
              <select className="mt-2 px-4 py-3 w-full border rounded-[8px] focus:outline-none text-darkGray bg-transparent">
                <option>Silver</option>
                <option>Gold</option>
                <option>Platinum</option>
              </select>
              <label className="block font-medium text-darkGray mt-4">Fee</label>
              <input
                type="text"
                className="mt-2 px-4 py-3 w-full border rounded-[8px] focus:outline-none bg-transparent"
                placeholder="$100"
              />
            </div>

            {/* Sponsor Type 2 */}
            <div>
              <label className="block font-medium text-darkGray">Sponsor Type</label>
              <select className="mt-2 px-4 py-3 w-full border rounded-[8px] focus:outline-none text-darkGray bg-transparent">
                <option>Silver</option>
                <option>Gold</option>
                <option>Platinum</option>
              </select>
              <label className="block font-medium text-darkGray mt-4">Fee</label>
              <input
                type="text"
                className="mt-2 px-4 py-3 w-full border rounded-[8px] focus:outline-none bg-transparent"
                placeholder="$200"
              />
            </div>

            {/* Sponsor Type 3 */}
            <div>
              <label className="block font-medium text-darkGray">Sponsor Type</label>
              <select className="mt-2 px-4 py-3 w-full border rounded-[8px] focus:outline-none text-darkGray bg-transparent">
                <option>Silver</option>
                <option>Gold</option>
                <option>Platinum</option>
              </select>
              <label className="block font-medium text-darkGray mt-4">Fee</label>
              <input
                type="text"
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
              className="mt-2 px-4 py-3 w-full border rounded-[8px] focus:outline-none bg-transparent"
              placeholder="30 Flamez (0)"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block font-medium text-darkGray">Address</label>
            <input
              type="text"
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
                className="mt-2 px-4 py-3 w-full border rounded-[8px] focus:outline-none text-darkGray bg-transparent"
              />
            </div>
            <div className="w-full">
              <label className="block font-medium text-darkGray">End Date</label>
              <input
                type="date"
                className="mt-2 px-4 py-3 w-full border rounded-[8px] focus:outline-none text-darkGray bg-transparent"
              />
            </div>
          </div>

          {/* Description Editor */}
          <div>
            <label className="block font-medium text-darkGray">Description</label>
            <Editor
              apiKey="your-api-key" // You can get your API key from TinyMCE website
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
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
