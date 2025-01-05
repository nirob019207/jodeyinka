// components/EventDetails.js
import React from "react";
import eventDetails from "@/asset/event/eventDetails.svg";
import Image from "next/image";
const EventDetails = () => {
  return (
    <div className="bg-[#F6F6F6] pt-[55px] md:pt-[108px] pb-[60px] font-inter">
      <div className="container mx-auto ">
        <h1 className="text-2xl md:text-4xl font-bold text-default w-[739px] mb-8">
          Global Economic and Geopolitical Outlook 2025
        </h1>
        <div className="grid gap-8 md:grid-cols-3">
          {/* Left Section */}
          <div className="md:col-span-2 overflow-hidden rounded-tl-[8px] rounded-tr-[8px]">
            <Image
              src={eventDetails}
              alt="Global Economic and Geopolitical Outlook 2025"
              className="w-full h-60 object-cover"
            />
            <div className="">
              <h3 className="text-[20px] font-medium text-[#090043] mt-8">
                January 23 @ 8:30 am - 9:30 am
              </h3>
              <p className="text-[24px] text-[#090043E5] font-medium mt-6">
                What do you need to know to prepare yourself and your business
                for the world ahead?
              </p>
              <p className="mt-4 text-[#545454]">
                The Cybersecurity and Infrastructure Security Agency (CISA) is a
                U.S. government agency under the Department of Homeland Security
                (DHS) responsible for improving the nation's cybersecurity
                posture and protecting critical infrastructure.
              </p>
              <p className="mt-6 text-[#545454]">
                CISA organizes a wide range of events aimed at enhancing public
                and private sector collaboration, improving cyber defense
                strategies, and responding to emerging cyber threats. These
                events typically include:
              </p>
              <div className="mt-4 space-y-6">
                {/* Section 1 */}
                <div className="mb-6">
                  <h3 className="text-[20px] font-medium text-[#090043] mb-4">
                    1. Workshops & Trainings:
                  </h3>
                  <ul className="mt-2 space-y-2 list-disc list-inside text-gray-600">
                    <li>
                      <strong>CISA</strong> regularly hosts technical workshops
                      and training sessions. These focus on strengthening the
                      cybersecurity skills of professionals in both the public
                      and private sectors.
                    </li>
                    <li>
                      Topics may include <strong>threat analysis</strong>,
                      incident response, and securing critical infrastructure.
                    </li>
                  </ul>
                </div>

                {/* Section 2 */}
                <div className="mb-6">
                  <h3 className="text-[20px] font-medium text-[#090043] mb-4">
                    2. Conferences & Summits:
                  </h3>
                  <ul className="mt-2 space-y-2 list-disc list-inside text-gray-600">
                    <li>
                      <strong>CISA Cybersecurity Summit:</strong> An annual
                      event that brings together cybersecurity experts,
                      government officials, and industry leaders to discuss the
                      latest challenges and solutions.
                    </li>
                    <li>
                      <strong>
                        National Cybersecurity Awareness Month (NCSAM):
                      </strong>{" "}
                      CISA organizes events to raise awareness of cybersecurity
                      issues during October, including webinars, online
                      campaigns, and educational outreach.
                    </li>
                  </ul>
                </div>

                {/* Section 3 */}
                <div className="mb-6">
                  <h3 className="text-[20px] font-medium text-[#090043] mb-4">
                    3. Tabletop Exercises (TTXs):
                  </h3>
                  <ul className="mt-2 space-y-2 list-disc list-inside text-gray-600">
                    <li>
                      CISA hosts tabletop exercises to simulate real-world cyber
                      incidents and help organizations practice response
                      strategies. These exercises are designed to improve
                      coordination and communication during a cyber event.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="">
            <div className="space-y-4 bg-white shadow-md rounded-lg p-6">
              <div className="flex items-center gap-[60px]">
                <h2 className="text-xl font-bold text-gray-800">Date:</h2>
                <p className="text-gray-600">January 23, 2025</p>
              </div>
              <div className="flex items-center gap-[60px]">
                <h2 className="text-xl font-bold text-gray-800">Time:</h2>
                <p className="text-gray-600">8:30 am - 9:30 am</p>
              </div>
              <div className="flex items-center gap-[50px]">
                <h2 className="text-xl font-bold text-gray-800">Venue:</h2>
                <p className="text-gray-600">Robinson-Cole LLP</p>
              </div>
              <div className="flex items-center gap-5">
                <h2 className="text-xl font-bold text-gray-800">Organizer:</h2>
                <p className="text-gray-600">
                  The World Affairs Council of Connecticut
                </p>
              </div>
            </div>

            {/* Map View */}
            <div className="mt-6">
              <h2 className="text-xl font-bold text-gray-800">Map View</h2>
              <div className="w-full h-64 bg-gray-300 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345096746!2d144.95373531531687!3d-37.81720997975161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577b886ddf9e013!2sRobinson-Cole%20LLP!5e0!3m2!1sen!2sus!4v1634163140175!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  allowFullScreen
                  loading="lazy"
                  className="border-0"
                ></iframe>
              </div>
            </div>

            {/* Hosted By */}
            <div className="mt-6">
              <h2 className="text-xl font-bold text-gray-800">Hosted By</h2>
              <p className="text-gray-600">
                Cybersecurity and Infrastructure Security Agency (CISA)
              </p>
              <p className="text-gray-600">
                NIST Computer Security Resource Center
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
