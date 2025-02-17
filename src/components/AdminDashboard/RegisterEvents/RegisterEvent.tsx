"use client";
import React, { useState } from "react";
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
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useRegisterEveQuery } from "@/redux/Api/eventApi";

const ITEMS_PER_PAGE = 5; // Number of events per page

const RegisterEvent = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch resource data
  const { data, isLoading, isError } = useRegisterEveQuery({});
  const registerEv = data?.data ?? [];

  // Pagination logic
  const totalItems = registerEv.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const paginatedEvents = registerEv.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (isLoading) {
    return (
      <div className="md:px-10 px-4 py-6">
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full border-t-4 border-blue-500 h-16 w-16"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="px-16 py-6">
        <p className="text-red-500 text-center">
          Error fetching data. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="lg:px-10 px-4 py-6">
      <div className="overflow-x-auto bg-white rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-default text-base text-center">Image</TableHead>
              <TableHead className="text-default text-base text-center">Title</TableHead>
              <TableHead className="text-default text-base text-center">Description</TableHead>
              <TableHead className="text-default text-base text-center">Status</TableHead>
              <TableHead className="text-default text-base text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedEvents.map((resource: any, index: number) => {
              const event = resource.event;
              const eventDate = new Date(event.date);
              const currentDate = new Date();

              // Determine event status
              const eventStatus = eventDate < currentDate ? "Expired" : "Upcoming";

              return (
                <TableRow key={index}>
                  <TableCell className="px-4 py-4 text-center">
                    <Image
                      src={event.imageUrl}
                      alt={event.title}
                      width={48}
                      height={48}
                      className="w-16 h-16 object-cover rounded mx-auto"
                    />
                  </TableCell>
                  <TableCell className="px-4 py-4 text-darkGray text-center">
                    {event.title}
                  </TableCell>
                  <TableCell className="px-4 py-4 text-darkGray text-center">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: (event.description || "").split(" ").slice(0, 10).join(" ") + "...",
                      }}
                    />
                  </TableCell>
                  <TableCell className={`px-4 py-4 text-center font-semibold ${eventStatus === "Expired" ? "text-red-500" : "text-green-500"}`}>
                    {eventStatus}
                  </TableCell>
                  <TableCell className="px-4 py-4 text-center">
                    <Link href={`/event-details/${event.id}`}>   
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                        View
                      </button>
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center space-x-4 mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center bg-gray-800 text-white py-2 px-4 rounded-md ${
            currentPage === 1 ? "bg-slate-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          <FaChevronLeft className="w-5 mr-2" />
          <span>Prev</span>
        </button>

        <span className="text-gray-700 font-semibold">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center bg-gray-800 text-white py-2 px-4 rounded-md ${
            currentPage === totalPages ? "bg-slate-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          <span>Next</span>
          <FaChevronRight className="w-5 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default RegisterEvent;
