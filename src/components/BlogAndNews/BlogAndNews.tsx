"use client";

import React from "react";
import Image from "next/image";
import { FaCalendarAlt } from "react-icons/fa";

import { MdArrowRightAlt } from "react-icons/md";
import { useGetResourceQuery } from "@/redux/Api/resourceApi";

const BlogsAndNews = () => {

    const { data, isLoading, isError } = useGetResourceQuery({ type: "BLOG" });
    const blogs = data?.data;
  // const blogs = [
  //   {
  //     id: 1,
  //     author: "James Dyson",
  //     title: "Host A Corporate Event ...",
  //     date: "December 10, 2024",
  //     description:
  //       "Back in 2019, Gucci brought video games to its app with a new section called Gucci Arcade, inspired by creative....",
  //     image: blog1,
  //   },
  //   {
  //     id: 2,
  //     author: "James Dyson",
  //     title: "Planning a Corporate Event",
  //     date: "December 10, 2024",
  //     description:
  //       "Back in 2019, Gucci brought video games to its app with a new section called Gucci Arcade, inspired by creative....",
  //     image: blog2, // Replace with your image path
  //   },
  //   {
  //     id: 3,
  //     author: "James Dyson",
  //     title: "Branded Balloon Decor",
  //     date: "December 10, 2024",
  //     description:
  //       "Back in 2019, Gucci brought video games to its app with a new section called Gucci Arcade, inspired by creative....",
  //     image: blog3, 
  //   },
  // ];

  return (
    <div className="py-[60px] font-inter px-6 md:px-0">
      <div className="container mx-auto px-0">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[36px] font-medium text-default">Blogs and News</h2>
          <a href="#" className="text-blue-600 hover:underline text-[20px]">
            See All
          </a>
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
                <div className="flex items-center gap-[40px] mb-3">
                  <span className="mr-2">{blog.author}</span>
                  <div className="flex items-center text-gray">
                  <FaCalendarAlt className="mr-2 text-blue-600" />
                  {blog.date}
                  </div>
                </div>
                {/* Blog Title */}
                <h3 className="text-[24px] font-medium text-default">
                  {blog.title}
                </h3>
                {/* Blog Description */}
                <p className="text-gray mt-4">{blog.description}</p>
                {/* Read More Button */}
                <div className="mt-4">
                  <button
                    className="flex items-center text-blue-600 hover:underline font-medium"
                  >
                    Read More <span className="ml-2"><MdArrowRightAlt className="text-[24px]" /></span>
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

export default BlogsAndNews;
