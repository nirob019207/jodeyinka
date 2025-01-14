"use client";
import React from "react";
import { FaRegClock } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import Image from "next/image";
import { useEventQuery } from "@/redux/Api/eventApi";
import { MdArrowRightAlt } from "react-icons/md";
import Link from "next/link";
import CardSkeleton from "../CardSkelaton/CardSkeleton";

const UpCommingEventPage = () => {
  const { data, isLoading, isError } = useEventQuery({ limit: 10 });
  const events = data?.data;

  function formatMonthAndTime(isoDate) {
    const eventDate = new Date(isoDate);

    const options = { month: "long", day: "numeric" };
    const formattedDate = eventDate.toLocaleDateString("en-US", options);

    const hours = eventDate.getHours();
    const minutes = eventDate.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";
    const formattedTime = `${hours % 12 || 12}:${minutes} ${ampm}`;

    return `${formattedDate} @ ${formattedTime}`;
  }

  function formatTimeRange(startTime, endTime) {
    const start = new Date(startTime);
    const end = new Date(endTime);

    const startHours = start.getHours();
    const startMinutes = start.getMinutes().toString().padStart(2, "0");
    const startAmpm = startHours >= 12 ? "pm" : "am";
    const startFormatted = `${startHours % 12 || 12}:${startMinutes} ${startAmpm}`;

    const endHours = end.getHours();
    const endMinutes = end.getMinutes().toString().padStart(2, "0");
    const endAmpm = endHours >= 12 ? "pm" : "am";
    const endFormatted = `${endHours % 12 || 12}:${endMinutes} ${endAmpm}`;

    return `${startFormatted} - ${endFormatted}`;
  }

  return (
    <div className="bg-[#F6F6F6] pt-[60px] pb-[60px] md:pb-[120px] font-inter px-6 md:px-0">
      <div className="container mx-auto px-0">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[20px] md:text-[36px] font-medium text-default">
            Events
          </h2>
        </div>

        {/* Event Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <CardSkeleton key={index} />
              ))
            : events?.map((event) => (
                <div
                  key={event.id}
                  className="rounded-lg overflow-hidden bg-white shadow"
                >
                  {/* Event Image */}
                  <div className="relative">
                    <Image
                      src={event?.imageUrl}
                      alt={event.title}
                      className="w-full h-[200px] object-cover"
                      width={357}
                      height={200}
                    />
                    {/* Date Overlay */}
                    <div className="absolute top-0 right-0 bg-[#0061FF33] backdrop-blur-[20px] text-center py-2 px-4 rounded-[4px] flex items-center justify-around w-[120px]">
                      <span className=" text-[#FFFFFF] text-[18px] font-bold">
                        {new Date(event.date).toLocaleString("en-US", {
                          month: "short",
                        })}{" "}
                        {new Date(event.date).getDate()}
                      </span>
                      {/* <span className="text-[25px] font-bold text-white">
                        {new Date(event.date).getDate()}
                      </span> */}
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-[#38383899] mb-3">
                        <FaRegClock className="mr-2 text-blue-600" />
                        {formatTimeRange(event.date, event.endTime)}
                      </div>
                      <div className="flex items-center text-[#38383899] mb-3">
                        <CiLocationOn className="mr-2 text-blue-600" />
                        {event?.venue}
                      </div>
                    </div>
                    <h3 className="text-[24px] font-medium text-default leading-[32px]">
                      {event.title}
                    </h3>
                    <p className="text-[#545454] mt-4 mb-6">{event.description}</p>
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
              ))}
        </div>
      </div>
    </div>
  );
};

export default UpCommingEventPage;
