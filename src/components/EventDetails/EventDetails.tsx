"use client";

import React from "react";
import Image from "next/image";
import { useEventDetailsQuery } from "@/redux/Api/eventApi";
import { useParams } from "next/navigation";
import defaultEvent from "@/asset/event/e1.svg";

const EventDetails = () => {
  const id = useParams();
  const { data, isLoading, isError } = useEventDetailsQuery({ id: id?.id });
  const singleEvent = data?.data;
  console.log("singleEvent", singleEvent);

  // Helper function to format date and time
  interface FormatMonthAndTimeOptions {
    month: "long";
    day: "numeric";
  }

  function formatMonthAndTime(isoDate: string): string {
    const eventDate = new Date(isoDate);

    // Format month and day
    const options: FormatMonthAndTimeOptions = {
      month: "long",
      day: "numeric",
    };
    const formattedDate = eventDate.toLocaleDateString("en-US", options);

    // Format time
    const hours = eventDate.getHours();
    const minutes = eventDate.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";
    const formattedTime = `${hours % 12 || 12}:${minutes} ${ampm}`;

    return `${formattedDate} @ ${formattedTime}`;
  }

  // Helper function to format time range (start and end)

  function formatTimeRange(startTime: string, endTime: string): string {
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

  // Display loading, error, or event details
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full border-t-4 border-blue-500 h-16 w-16"></div>
      </div>
    );
  }

  if (isError || !singleEvent) {
    return (
      <p className="container">Something went wrong. Please try again later.</p>
    );
  }

  // map view
  const latitude = singleEvent?.event?.latitude || 39.1171979;
  const longitude = singleEvent?.event?.longitude || 48.4978379;
  const mapSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10000!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${latitude},${longitude}!5e0!3m2!1sen!2sus!4v1634163140175`;

  return (
    <div className="bg-[#F6F6F6] pt-[55px] md:pt-[108px] pb-[60px] font-inter px-6 md:px-0">
      <div className="container mx-auto px-0">
        <h1 className="text-2xl md:text-4xl font-bold text-default w-full md:w-[739px] mb-8 md:text-start text-center">
          {singleEvent?.title || "Event Title"}
        </h1>
        <div className="grid gap-8 md:grid-cols-3">
          {/* Left Section */}
          <div className="md:col-span-2 overflow-hidden rounded-tl-[8px] rounded-tr-[8px]">
            <Image
              src={singleEvent?.event?.imageUrl || defaultEvent}
              alt={singleEvent?.title || "Event Image"}
              width={100}
              height={100}
              className="w-full h-auto max-h-60 object-cover"
            />
            <div>
              <h3 className="text-[20px] font-medium text-[#090043] mt-8">
                {formatMonthAndTime(singleEvent?.event?.date)}
              </h3>
              <div
                className="text-[24px] text-[#090043E5] font-medium mt-6"
                dangerouslySetInnerHTML={{
                  __html: singleEvent?.event?.description || "N/A",
                }}
              ></div>
            </div>
          </div>

          {/* Right Section */}
          <div className="">
            <div className="space-y-4 bg-white shadow-md rounded-lg p-6">
              <div className="flex items-center gap-[60px]">
                <h2 className="text-xl font-medium text-default">Date:</h2>
                <p className="text-[#475467">
                  {formatMonthAndTime(singleEvent?.event?.date).split("@")[0] ||
                    "N/A"}
                </p>
              </div>
              <div className="flex items-center gap-[60px]">
                <h2 className="text-xl font-medium text-default">Time:</h2>
                <p className="text-[#475467]">
                  {formatTimeRange(
                    singleEvent?.event?.date,
                    singleEvent?.event?.endTime
                  )}
                </p>
              </div>
              <div className="flex items-center gap-[50px]">
                <h2 className="text-xl font-medium text-default">Venue:</h2>
                <p className="text-[#475467]">
                  {singleEvent?.event?.venue || "N/A"}
                </p>
              </div>
              <div className="flex items-center gap-5">
                <h2 className="text-xl font-medium text-default">Organizer:</h2>
                <p className="text-[#475467]">
                  {singleEvent?.event?.host?.firstName}{" "}
                  {singleEvent?.event?.host?.lastName}
                </p>
              </div>
            </div>

            {/* Map View */}
            <div className="mt-6">
              <h2 className="text-xl md:text-[24px] font-medium text-[#090043] mb-4">
                Map View
              </h2>
              <div className="w-full h-64 bg-gray-300 rounded-lg overflow-hidden">
                <iframe
                  src={mapSrc}
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
              <h2 className="text-xl md:text-[24px] font-medium text-[#090043] mb-4">
                Hosted By
              </h2>
              <p className="text-[#1D2939] mb-2">
                {singleEvent?.event?.host?.firstName}{" "}
                {singleEvent?.event?.host?.lastName || "N/A"}
              </p>
              <p className="text-[#1D2939]">
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
