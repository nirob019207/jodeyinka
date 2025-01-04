"use client";

import React from "react";
import Image from "next/image";
import { FaRegClock } from "react-icons/fa";
import event1 from "@/asset/event/event1.svg";
import event2 from "@/asset/event/event2.svg";
import event3 from "@/asset/event/event3.svg";
import { MdArrowRightAlt } from "react-icons/md";

const UpcomingEvent = () => {
  const events = [
    {
      id: 1,
      title: "Global Economic and Geopolitical Outlook 2025",
      description:
        "Back in 2019, Gucci brought video games to its app with a new section called Gucci Arcade, inspired by creative....",
      date: { month: "Jan", day: 25 },
      time: "6:00 pm - 7:30 pm",
      image: event1, // Replace with your image path
    },
    {
      id: 2,
      title: "Ambassador of Sweden | Save the Date",
      description:
        "Back in 2019, Gucci brought video games to its app with a new section called Gucci Arcade, inspired by creative....",
      date: { month: "Jan", day: 25 },
      time: "6:00 pm - 7:30 pm",
      image: event2, // Replace with your image path
    },
    {
      id: 3,
      title: "Digitally Invisible with Dr. Nicol Turner-Lee",
      description:
        "Back in 2019, Gucci brought video games to its app with a new section called Gucci Arcade, inspired by creative....",
      date: { month: "Feb", day: 25 },
      time: "6:00 pm - 7:30 pm",
      image: event3, // Replace with your image pat
    },
  ];

  return (
    <div className="bg-[#F6F6F6] pb-[60px]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[36px] font-medium text-default">
            Upcoming Event
          </h2>
          <a href="#" className="text-blue-600 hover:underline text-[20px]">
            See All
          </a>
        </div>

        {/* Event Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="rounded-lg overflow-hidden"
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
                <div className="absolute top-[175px] right-0 bg-[#FFFFFF1A] backdrop-blur-[24px] text-center py-2 px-4 rounded-lg">
                  <span className=" text-[#FFFFFF]">
                    {event.date.month}
                  </span>
                  <br />
                  <span className="text-[25px] font-bold text-default">{event.date.day}</span>
                </div>
              </div>

              {/* Event Details */}
              <div className="">
                {/* Event Time */}
                <div className="flex items-center text-[#38383899] mb-3 mt-6">
                  <FaRegClock className="mr-2 text-blue-600" />
                  {event.time}
                </div>
                {/* Event Title */}
                <h3 className="text-[24px] font-medium text-default leading-[32px]">
                  {event.title}
                </h3>
                {/* Event Description */}
                <p className="text-[#545454] mt-4 mb-6">{event.description}</p>
                {/* Read More Button */}
                <div className="flex items-center">
                  <button className="flex items-center text-blue-600 hover:underline font-medium  px-4 py-3 border border-[#005DF3] rounded-[8px]">
                    Read More{" "}
                    <span className="ml-2">
                      <MdArrowRightAlt className="text-[24px]" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvent;
