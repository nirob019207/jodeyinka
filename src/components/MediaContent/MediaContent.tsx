import React from "react";
import Image from "next/image";
import mediaContent from "@/asset/media/media-content.svg";
import download from "@/asset/media/download.svg";
import comment from "@/asset/media/comment.svg";
import dots from "@/asset/media/dots.svg";

const comments = [
  {
    id: 1,
    name: "@wsf_Tech",
    message: "Our goal is a win-win relationship with our customers.",
  },
  {
    id: 2,
    name: "@wsf_Tech",
    message: "It's very nice.",
  },
  {
    id: 3,
    name: "@wsf_Tech",
    message: "Would like to say that your support has been fantastic.",
  },
  {
    id: 4,
    name: "John",
    message: "john@gmail.com",
  },
];

const MediaContent: React.FC = () => {
  return (
    <div className="bg-[#F6F6F6] pt-[30px] md:pt-[60px] pb-[130px] md:pb-[250px]">
      <div className="container mx-auto px-0 md:px-6 flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="lg:w-[740px]">
          {/* Media */}
          <div className="relative w-full h-64 lg:h-96">
            <Image
              src={mediaContent}
              alt="Media Content"
              className="rounded-t-lg object-cover"
              layout="fill"
            />
            <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-t-lg">
              <svg
                className="w-12 h-12 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M10 16.5L16 12L10 7.5V16.5Z" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <h1 className="text-2xl font-bold text-default mb-4">
              The Future of Cybersecurity Skills: What Experts Need to Know
            </h1>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-[52px] h-[52px] rounded-full border border-[#FFFFFF] bg-[#D9D9D9]"></div>
                <div>
                  <h2>WSF</h2>
                  <p className="text-gray-500 mb-6">@wsf_Tech</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 bg-[#FFFFFF] rounded-[4px] p-2">
                  <Image src={comment} alt="comment" />
                  <p>Comments</p>
                </div>
                <div className="flex items-center gap-2 bg-[#FFFFFF] rounded-[4px] p-2">
                  <Image src={download} alt="download" />
                  <p>Download</p>
                </div>
                <div className=" bg-[#FFFFFF] rounded-[4px] ">
                  <Image src={dots} alt="download" />
                </div>
              </div>
            </div>
            <p className="text-[#090043] mb-6">
              January 23 @ 8:30 am - 9:30 am
            </p>
            <h1 className="text-[24px] font-medium text-[#090043E5] mb-4">
              What do you need to know to prepare yourself and your business for
              the world ahead?
            </h1>
            <p className="text-gray mb-6">
              The Cybersecurity and Infrastructure Security Agency (CISA) is a
              U.S. government agency under the Department of Homeland Security
              (DHS) responsible for improving the nation's cybersecurity posture
              and protecting critical infrastructure.
            </p>
            <p className="text-gray mb-6">
              CISA organizes a wide range of events aimed at enhancing public
              and private sector collaboration, improving cyber defense
              strategies, and responding to emerging cyber threats. These events
              typically include:
            </p>
            <ul className="text-gray-700 list-disc list-inside space-y-4">
              <div className="mb-6">
                <span className="font-medium text-[20px] text-[#090043] list-none">1. Evolving Threat Landscape</span>
                <ul className="ml-4 list-disc list-inside text-gray space-y-2 mt-6">
                  <li>
                    Rise of Advanced Persistent Threats (APTs): Threat actors
                    are using sophisticated, targeted attacks.
                  </li>
                  <li>
                    AI and Machine Learning Exploits: As organizations adopt AI,
                    attackers are finding ways to exploit vulnerabilities.
                  </li>
                </ul>
              </div>
              <div className="mb-6">
                <span className="font-medium text-[20px] text-[#090043]">2. Key Technical Skills</span>
                <ul className="ml-4 list-disc list-inside text-gray space-y-2 mt-6">
                  <li>
                    CISA Cybersecurity Summit: An annual event that brings
                    together experts.
                  </li>
                  <li>
                    Communication: Ability to translate technical risks into
                    business impacts.
                  </li>
                </ul>
              </div>
              <div className="mb-6">
                <span className="font-medium text-[20px] text-[#090043]">3. Essential Soft Skills</span>
                <ul className="ml-4 list-disc list-inside text-gray space-y-2 mt-6">
                  <li>
                    Industry Standards: Certifications like CISSP, CISM, and CEH
                    remain valuable.
                  </li>
                </ul>
              </div>
            </ul>
          </div>
        </div>

        {/* Comments Section */}
        <div className="lg:w-[360px]">
         <div className="bg-white rounded-lg shadow-md p-6">
         <h2 className="text-lg font-bold text-gray-900 mb-4">Comments</h2>
          <div className="space-y-6 max-h-[500px] overflow-y-auto slim-scroll">
            {comments.map((comment) => (
              <div key={comment.id} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-500 font-bold">
                    {comment.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {comment.name}
                  </p>
                  <p className="text-sm text-gray-600">{comment.message}</p>
                </div>
              </div>
            ))}
          </div>
         </div>

          {/* Add Comment */}
          <div className="mt-6">
            <textarea
              placeholder="Add Comment"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <div className="flex justify-end mt-4 gap-2">
              <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-300 transition">
                Cancel
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                Comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaContent;
