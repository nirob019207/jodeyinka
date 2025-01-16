"use client";
import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Image from "next/image";
import Link from "next/link";
import { useGetResourceQuery } from "@/redux/Api/resourceApi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

type ResourceEvent = {
  fileUrl: string;
  title: string;
  description: string;
  type: string;
};

const ResourceList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5; // Number of resources per page

  const { data, isLoading, isError } = useGetResourceQuery({
    type: "RESOURCE",
    limit: limit,
    page: currentPage,
  });

  const resourceList = data?.data;
  const hasMoreData = resourceList?.length === limit; // Determine if more data exists by comparing length

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (isLoading) {
    return (
      <div className="px-16 py-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-darkBlack">Resource History</h2>
          <Link href={"/admin/create-resource"} className="text-blue-500 hover:text-blue-700">
            Create Resource
          </Link>
        </div>

        {/* Loading Spinner */}
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full border-t-4 border-blue-500 h-16 w-16"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="px-16 py-6">
        <p className="text-red-500 text-center">Error fetching data. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="px-16 py-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-darkBlack">Resource History</h2>
        <Link href={"/admin/create-resource"} className="text-blue-500 hover:text-blue-700">
          Create Resource
        </Link>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-default text-base text-center">Image</TableHead>
              <TableHead className="text-default text-base text-center">Resource Title</TableHead>
              <TableHead className="text-default text-base text-center">Description</TableHead>
              <TableHead className="text-default text-base text-center">Type</TableHead>
              <TableHead className="text-default text-base text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {resourceList?.map((event: ResourceEvent, index: number) => (
              <TableRow key={index}>
                <TableCell className="px-4 py-4 text-center">
                  <Image
                    src={event.fileUrl}
                    alt={event.title}
                    width={48}
                    height={48}
                    className="w-16 h-16 object-cover rounded mx-auto"
                  />
                </TableCell>
                <TableCell className="px-4 py-4 text-darkGray text-center">{event.title}</TableCell>
                <TableCell className="px-4 py-4 text-darkGray text-center">{event.description}</TableCell>
                <TableCell className="px-4 py-4 text-darkGray text-center">{event.type}</TableCell>
                <TableCell className="px-4 py-4 text-darkGray text-center">
                  <button className="text-red-500 hover:text-red-700">
                    <FaTrashAlt className="text-lg text-center" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center space-x-4 mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`bg-gray-800 text-white py-2 px-4 rounded-l-md ${currentPage === 1 ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
        >
          <div className="flex items-center">
            <FaChevronLeft className="w-5 mr-2" />
            <span>Prev</span>
          </div>
        </button>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={!hasMoreData}
          className={`bg-gray-800 text-white py-2 px-4 rounded-r-md ${!hasMoreData ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
        >
          <div className="flex items-center">
            <span className="mr-2">Next</span>
            <FaChevronRight className="w-5 ml-2" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default ResourceList;
