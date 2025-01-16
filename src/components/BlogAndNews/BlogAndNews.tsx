"use client";

import React from "react";
import Image from "next/image";
import { FaCalendarAlt } from "react-icons/fa";

import { MdArrowRightAlt } from "react-icons/md";
import { useGetResourceQuery } from "@/redux/Api/resourceApi";
import Link from "next/link";

const BlogsAndNews = () => {
  const { data } = useGetResourceQuery({ type: "BLOG", limit: 3, page: 1 });
  const blogs = data?.data;
  // function formatMonthAndTime(isoDate: string) {
  //   const eventDate = new Date(isoDate);

  //   // Format month and day
  //   const options = { month: "long", day: "numeric" };
  //   const formattedDate = eventDate.toLocaleDateString("en-US", options);

  //   // Format time
  //   const hours = eventDate.getHours();
  //   const minutes = eventDate.getMinutes().toString().padStart(2, "0");
  //   const ampm = hours >= 12 ? "pm" : "am";
  //   const formattedTime = `${hours % 12 || 12}:${minutes} ${ampm}`;

  //   return `${formattedDate} @ ${formattedTime}`;
  // }
  function formatDate(isoDate: string) {
    const eventDate = new Date(isoDate);

    // Format month and day
    const options = { month: "long", day: "numeric" };
    const formattedDate = eventDate.toLocaleDateString("en-US", options);
    const formattedYear = eventDate.getFullYear();

    return `${formattedDate}, ${formattedYear}`;
  }

  return (
    <div className="py-[60px] font-inter px-6 md:px-0">
      <div className="container mx-auto px-0">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[36px] font-medium text-default">
            Blogs and News
          </h2>
          <Link
            href={"/blog"}
            className="text-blue-600 hover:underline text-[20px]"
          >
            See All
          </Link>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs?.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-lg overflow-hidden shadow"
            >
              {/* Blog Image */}
              <Image
                src={blog.fileUrl}
                alt={blog.title}
                className="w-full h-[200px] object-cover"
                width={357}
                height={200}
              />

              {/* Blog Details */}
              <div className="p-4">
                {/* Author and Date */}
                <div className="flex items-center justify-between gap-[40px] mb-3">
                  <span className="mr-2">{blog.author || "John"}</span>
                  <div className="flex items-center text-gray">
                    <FaCalendarAlt className="mr-2 text-blue-600" />
                    {formatDate(blog.createdAt)}
                  </div>
                </div>
                {/* Blog Title */}
                <h3 className="text-[24px] font-medium text-default">
                  {blog.title}
                </h3>
                {/* Blog Description */}
                <p
                  className="text-gray mt-4"
                  dangerouslySetInnerHTML={{ __html: blog.description }}
                ></p>

                {/* Read More Button */}
                <div className="mt-4">
                  <Link
                    href={`media-details/${blog.id}`}
                    className="flex items-center text-blue-600 hover:underline font-medium"
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

export default BlogsAndNews;
