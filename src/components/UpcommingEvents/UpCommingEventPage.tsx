import React from "react";
import e1 from "@/asset/event/e1.svg";
import e2 from "@/asset/event/e2.svg";
import e3 from "@/asset/event/e3.svg";
import { FaRegClock } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import Image from "next/image";

const UpCommingEventPage = () => {
  const events = [
    {
      id: 1,
      title: "Navigating Emerging Threats",
      description:
        "A Global Perspective on Future Challenges. Join top experts and thought leaders to discuss the latest trends in cybersecurity",
      date: { month: "Jan", day: 25 },
      time: "6:00 pm - 7:30 pm",
      image: e1,
      location: "Washington, D.C.",
    },
    {
      id: 2,
      title: "GISEC Global 2023 - Dubai 03-2023",
      description:
        "A Global Perspective on Future Challenges. Join top experts and thoughts leaders to discuss the latest trends in cybersecurity",
      date: { month: "Jan", day: 25 },
      time: "6:00 pm - 7:30 pm",
      image: e2,
      location: "Washington, D.C.",
    },
    {
      id: 3,
      title: "GISEC Global Celebrates Women in Cybersecurity",
      description:
        "A Global Perspective on Future Challenges. Join top experts and thought leaders to discuss the latest trends in cybersecurity",
      date: { month: "Feb", day: 25 },
      time: "6:00 pm - 7:30 pm",
      image: e3,
      location: "Washington, D.C.",
    },
  ];
  return (
    <div className="bg-[#F6F6F6] pt-[60px] pb-[60px] md:pb-[120px] font-inter px-6 md:px-0">
      <div className="container mx-auto px-0">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[20px] md:text-[36px] font-medium text-default">
            Upcoming Event
          </h2>
          <a href="#" className="text-blue-600 hover:underline text-base md:text-[20px]">
            See All
          </a>
        </div>

        {/* Event Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="rounded-lg overflow-hidden bg-white shadow"
            >
              {/* Event Image */}
              <div className="relative">
                <Image
                  src={event.image}
                  alt={event.title}
                  className="w-full h-[200px] object-cover"
                  width={357}
                  height={200}
                />
                {/* Date Overlay */}
                <div className="absolute top-0 right-0 bg-[#0061FF33] backdrop-blur-[20px] text-center py-2 px-4 rounded-[4px] flex items-center justify-around w-[120px]">
                  <span className=" text-[#FFFFFF] font-normal text-sm">{event.date.month}</span>

                  <span className="text-[25px] font-bold text-white">
                    {event.date.day}
                  </span>
                </div>
              </div>

              {/* Event Details */}
              <div className="p-4">
                {/* Event Time */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-[#38383899] mb-3">
                    <FaRegClock className="mr-2 text-blue-600" />
                    {event.time}
                  </div>
                  <div className="flex items-center text-[#38383899] mb-3">
                    <CiLocationOn className="mr-2 text-blue-600" />
                    {event.location}
                  </div>
                </div>
                {/* Event Title */}
                <h3 className="text-[24px] font-medium text-default leading-[32px]">
                  {event.title}
                </h3>
                {/* Event Description */}
                <p className="text-[#545454] mt-4 mb-6">{event.description}</p>
                {/* Read More Button */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpCommingEventPage;
