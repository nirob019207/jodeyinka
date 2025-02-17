"use client";
import React, { useState } from "react";
import { FaRegClock } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import Image from "next/image";
import { useEventQuery } from "@/redux/Api/eventApi";
import { MdArrowRightAlt } from "react-icons/md";
import Link from "next/link";
import CardSkeleton from "../CardSkelaton/CardSkeleton";
import defaultEvent from "@/asset/event/e1.svg";
import { FaPlay } from "react-icons/fa6";
import thumb from "@/asset/media/thubnail.jpg";


const UpCommingEventPage = () => {
  const { data, isLoading } = useEventQuery({ limit: 10, page: 1 });
  const events = data?.data;

  // function formatMonthAndTime(isoDate) {
  //   const eventDate = new Date(isoDate);

  //   const options = { month: "long", day: "numeric" };
  //   const formattedDate = eventDate.toLocaleDateString("en-US", options);

  //   const hours = eventDate.getHours();
  //   const minutes = eventDate.getMinutes().toString().padStart(2, "0");
  //   const ampm = hours >= 12 ? "pm" : "am";
  //   const formattedTime = `${hours % 12 || 12}:${minutes} ${ampm}`;

  //   return `${formattedDate} @ ${formattedTime}`;
  // }

  function formatTimeRange(startTime: string, endTime: string): string {
    const start = new Date(startTime);
    const end = new Date(endTime);

    const startHours = start.getHours();
    const startMinutes = start.getMinutes().toString().padStart(2, "0");
    const startAmpm = startHours >= 12 ? "pm" : "am";
    const startFormatted = `${
      startHours % 12 || 12
    }:${startMinutes} ${startAmpm}`;

    const endHours = end.getHours();
    const endMinutes = end.getMinutes().toString().padStart(2, "0");
    const endAmpm = endHours >= 12 ? "pm" : "am";
    const endFormatted = `${endHours % 12 || 12}:${endMinutes} ${endAmpm}`;

    return `${startFormatted} - ${endFormatted}`;
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string>("");

  function isImage(url: string): boolean {
    return /\.(jpeg|jpg|gif|png|svg|webp)$/i.test(url);
  }

  function isVideo(url: string): boolean {
    return /\.(mp4|webm|ogg|mov)$/i.test(url);
  }

  const openModal = (videoUrl: string) => {
    setVideoUrl(videoUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setVideoUrl("");
  };

  return (
    <div className="bg-[#F6F6F6] pt-[60px] pb-[60px] md:pb-[120px] font-inter px-6 md:px-0">
      <div className="container mx-auto px-0">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[20px] md:text-[36px] font-medium text-default">
            Events
          </h2>
        </div>

        <p className="text-[10px] md:text-[17px] font-medium md:mb-9 mb-4 text-default">Join us for the Cybersecurity Events, an exclusive event bringing together industry leaders, security experts, and technology innovators to discuss the latest cybersecurity threats, strategies, and solutions. These events are designed for IT professionals, business executives, compliance officers, and anyone invested in protecting digital assets in an evolving threat landscape.</p>
       

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[20px] md:text-[30px] font-medium text-default">
          Upcoming Event
          </h2>
        </div>


        {/* Event Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-10 md:gap-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <CardSkeleton key={index} />
              ))
            : events?.map((event: any) => (
                <div
                  key={event.id}
                  className="rounded-lg overflow-hidden bg-white shadow"
                >
                  {/* Event Image */}
                  <div className="relative">
                    {event?.imageUrl && isImage(event.imageUrl) ? (
                      <Image
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full h-[200px] object-cover"
                        width={357}
                        height={200}
                      />
                    ) : event?.imageUrl && isVideo(event.imageUrl) ? (
                      <div className="relative">
                        <video
                          poster={thumb.src}
                          className="w-full h-[200px] object-cover"
                          muted
                          loop
                        />
                        <div
                          onClick={() => openModal(event.imageUrl)}
                          className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50 cursor-pointer"
                        >
                          <FaPlay className="text-white text-4xl" />
                        </div>
                      </div>
                    ) : (
                      <Image
                        src={defaultEvent}
                        alt={event.title}
                        className="w-full h-[200px] object-cover"
                        width={357}
                        height={200}
                      />
                    )}
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
                    <p className="text-[#475467] mb-9">
                      <span
                        dangerouslySetInnerHTML={{
                          __html: event?.description?.slice(0, 150) + "...",
                        }}
                        className="text-sm"
                      />
                    </p>
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

      {/* Video Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div className="relative w-[80%] md:w-[60%] h-[80%]">
            <video src={videoUrl} className="w-full h-full" autoPlay controls />
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2"
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpCommingEventPage;
