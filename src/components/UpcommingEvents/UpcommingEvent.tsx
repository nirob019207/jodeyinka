"use client";

import React from "react";
import Image from "next/image";
import { FaRegClock } from "react-icons/fa";
import { MdArrowRightAlt } from "react-icons/md";
import { useEventQuery } from "@/redux/Api/eventApi";
import Link from "next/link";
import dfaultEvent from "@/asset/event/e1.svg";

const UpcomingEvent = () => {
  const { data, isLoading, isError } = useEventQuery({ limit: 3 , page: 1});
  const events = data?.data; // Show only the latest 3 events

  // Helper function to format date and time
  // function formatMonthAndTime(isoDate: string) {
  //   const eventDate = new Date(isoDate);

  //   // Format month and day
  //   const options: Intl.DateTimeFormatOptions = { month: "long", day: "numeric" };
  //   const formattedDate = eventDate.toLocaleDateString("en-US", options);

  //   // Format time
  //   const hours = eventDate.getHours();
  //   const minutes = eventDate.getMinutes().toString().padStart(2, "0");
  //   const ampm = hours >= 12 ? "pm" : "am";
  //   const formattedTime = `${hours % 12 || 12}:${minutes} ${ampm}`;

  //   return `${formattedDate} @ ${formattedTime}`;
  // }

  // Helper function to format time range (start and end)
  function formatTimeRange(startTime: string, endTime: string) {
    const start = new Date(startTime);
    const end = new Date(endTime);

    // Format start time
    const startHours = start.getHours();
    const startMinutes = start.getMinutes().toString().padStart(2, "0");
    const startAmpm = startHours >= 12 ? "pm" : "am";
    const startFormatted = `${
      startHours % 12 || 12
    }:${startMinutes} ${startAmpm}`;

    // Format end time
    const endHours = end.getHours();
    const endMinutes = end.getMinutes().toString().padStart(2, "0");
    const endAmpm = endHours >= 12 ? "pm" : "am";
    const endFormatted = `${endHours % 12 || 12}:${endMinutes} ${endAmpm}`;

    return `${startFormatted} - ${endFormatted}`;
  }

  // Handle loading and error states
  if (isLoading) {
    return (
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  md:gap-6 animate-pulse gap-4">
          <div className="rounded-lg overflow-hidden bg-white shadow-md">
            <div className="relative">
              <div className="w-full h-[200px] bg-gray-200"></div>
              <div className="absolute top-[175px] right-0 bg-[#FFFFFF1A] backdrop-blur-[24px] text-center py-2 px-4 rounded-lg">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center mb-3 mt-6">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-10 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !events) {
    return (
      <p className="bg-[#F5F5F5] text-center py-[120px] text-[20px] font-bold text-darkBlack">
        No events found!
      </p>
    );
  }

  return (
    <div className="bg-[#F6F6F6] pb-[60px] font-inter px-6 md:px-0">
      <div className="container mx-auto px-0">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[36px] font-medium text-default">
            Upcoming Event
          </h2>
          <Link
            href="/event"
            className="text-blue-600 hover:underline text-[20px]"
          >
            See All
          </Link>
        </div>

        {/* Event Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-6">
          {events.length > 0 ? (
            events?.map((event:any) => (
              <div
                key={event.id}
                className="rounded-lg overflow-hidden bg-white shadow-md"
              >
                {/* Event Image */}
                <div className="relative">
                  <Image
                    src={event?.imageUrl.src || dfaultEvent} 
                    alt={event?.title}
                    className="w-full h-[200px] object-cover"
                    width={357}
                    height={200}
                  />
                  {/* Date Overlay */}
                  <div className="absolute top-[175px] right-0 bg-[#FFFFFF1A] backdrop-blur-[24px] text-center py-2 px-4 rounded-lg">
                    <span className=" text-[#FFFFFF]">
                      {new Date(event.date).toLocaleString("en-US", {
                        month: "short",
                      })}
                    </span>
                    <br />
                    <span className="text-[25px] font-bold text-default">
                      {new Date(event.date).getDate()}
                    </span>
                  </div>
                </div>

                {/* Event Details */}
                <div className="p-4">
                  {/* Event Time */}
                  <div className="flex items-center text-[#38383899] mb-3 mt-6">
                    <FaRegClock className="mr-2 text-blue-600" />
                    {formatTimeRange(event.date, event.endTime)}
                  </div>
                  {/* Event Title */}
                  <h3 className="text-[24px] font-medium text-default leading-[32px]">
                    {event?.title}
                  </h3>
                  {/* Event Description */}
                  <p className="text-[#475467] mb-9">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: event?.description?.slice(0, 150) + "...",
                      }}
                      className="text-sm"
                    />
                  </p>

                  {/* Read More Button */}
                  <div className="flex items-center">
                    <Link
                      href={`event-details/${event.id}`}
                      className="flex items-center text-blue-600 hover:underline font-medium px-4 py-3 border border-[#005DF3] rounded-[8px]"
                    >
                      Read More{" "}
                      <span className="ml-2">
                        <MdArrowRightAlt className="text-[24px]" />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-[25px] font-bold text-center col-span-full py-20">
              <p>No events found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvent;
