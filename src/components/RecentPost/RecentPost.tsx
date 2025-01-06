"use client";

import React from "react";
import Image from "next/image";
import { FaCalendarAlt } from "react-icons/fa";
import blog1 from "@/asset/blog/blog1.svg"
import blog2 from "@/asset/blog/blog2.svg"
import blog3 from "@/asset/blog/blog3.svg"
import { MdArrowRightAlt } from "react-icons/md";

const RecentPost = () => {
  const posts = [
    {
      id: 1,
      author: "James Dyson",
      title: "Host A Corporate Event ...",
      date: "December 10, 2024",
      description:
        "Back in 2019, Gucci brought video games to its app with a new section called Gucci Arcade, inspired by creative....",
      image: blog1,
    },
    {
      id: 2,
      author: "James Dyson",
      title: "Planning a Corporate Event",
      date: "December 10, 2024",
      description:
        "Back in 2019, Gucci brought video games to its app with a new section called Gucci Arcade, inspired by creative....",
      image: blog2, // Replace with your image path
    },
    {
      id: 3,
      author: "James Dyson",
      title: "Branded Balloon Decor",
      date: "December 10, 2024",
      description:
        "Back in 2019, Gucci brought video games to its app with a new section called Gucci Arcade, inspired by creative....",
      image: blog3, 
    },
  ];

  return (
    <div className="bg-[#F6F6F6] py-[60px] font-inter px-6 md:px-0">
      <div className="container mx-auto px-0">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[36px] font-medium text-default">Recent Posts</h2>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg overflow-hidden shadow"
            >
              {/* post Image */}
              <Image
                src={post.image}
                alt={post.title}
                className="w-full h-[200px] object-cover"
                width={357}
                height={200}
              />

              {/* post Details */}
              <div className="p-4">
                {/* Author and Date */}
                <div className="flex items-center gap-[40px] mb-3">
                  <span className="mr-2">{post.author}</span>
                  <div className="flex items-center text-gray">
                  <FaCalendarAlt className="mr-2 text-blue-600" />
                  {post.date}
                  </div>
                </div>
                {/* post Title */}
                <h3 className="text-[24px] font-medium text-default">
                  {post.title}
                </h3>
                {/* post Description */}
                <p className="text-gray mt-4">{post.description}</p>
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

export default RecentPost;
