import React from "react";
import { FaCirclePlus } from "react-icons/fa6";

const Resource = () => {
    return (
        <div className="px-16">
            {/* Header */}
            <h1 className="text-3xl font-semibold mb-6 border-b border-[#E0E0E0] pb-3">
                Create Resource
            </h1>

            {/* Main Container */}
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

                {/* Form Section */}
                <form className="flex-1">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        {/* Title */}
                        <div className="col-span-2">
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                placeholder="30 Flamez (0)"
                                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Date */}
                        <div className="col-span-2">
                            <label
                                htmlFor="date"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Date
                            </label>
                            <input
                                type="text"
                                id="date"
                                placeholder="Address"
                                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Description */}
                        <div className="col-span-2">
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Description
                            </label>
                            <textarea
                                id="description"
                                placeholder="Product description"
                                rows={4}
                                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            ></textarea>
                        </div>
                    </div>

                    {/* Save Button */}
                   <div className="text-center col-span-full mt-11">
                   <button
                        type="submit"
                        className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Save
                    </button>
                   </div>
                </form>
            </div>
        </div>
    );
};

export default Resource;
