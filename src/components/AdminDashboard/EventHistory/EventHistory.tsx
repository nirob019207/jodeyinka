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
import { useEventQuery } from "@/redux/Api/eventApi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import event1 from "@/asset/event/e1.svg"
import { toast } from "sonner";
import { useDeleteResourceMutation } from "@/redux/Api/resourceApi";

// Type for resource events
type ResourceEvent = {
  imageUrl: string;
  title: string;
  description: string;
  id: string;
  type: string;
  silverSponsorFee: number;
  goldSponsorFee: number;
  platinumSponsorFee: number;
};

const EventHistory = () => {
  const limit = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError } = useEventQuery({
    limit: limit,
    page: currentPage,
  });

const [deleteEventFn] = useDeleteResourceMutation()

  const EventList = data?.data;
  console.log(EventList);

  const hasMoreData = EventList?.length === limit;

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (isLoading) {
    return (
      <div className="px-4 sm:px-16 py-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-darkBlack">Event History</h2>
          <Link
            href={"/admin/create-event"}
            className="text-blue-500 hover:text-blue-700"
          >
            Create Event
          </Link>
        </div>

        {/* Loading Spinner */}
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full border-t-4 border-blue-500 h-16 w-16"></div>
        </div>
      </div>
    );
  }

  // delete functionality

  const handleDelete = async (id: string): Promise<void> => {
    // Implementation for delete
   const response =  await deleteEventFn(id)
   if ('error' in response) {
    toast.error("Event Delete Failed!");
   } else {
    toast.success("Event Delete Successfully");
   }
  };


  if (isError) {
    return (
      <div className="px-4 sm:px-16 py-6">
        <p className="text-red-500 text-center">
          Error fetching data. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 lg:px-10 py-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-darkBlack">Event History</h2>
        <Link
          href={"/admin/create-event"}
          className="text-blue-500 hover:text-blue-700"
        >
          Create Event
        </Link>
      </div>

      {/* Replacing TableContainer with a div for responsiveness */}
      <div className="overflow-x-auto bg-white rounded-lg">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="text-default text-base text-center">
                Image
              </TableHead>
              <TableHead className="text-default text-base text-center">
                Event Title
              </TableHead>
              {/* <TableHead className="text-default text-base text-center">
                Description
              </TableHead> */}
              <TableHead className="text-default text-base text-center">
                Type
              </TableHead>
              <TableHead className="text-default text-base text-center">
                Silver Sponsor Fee
              </TableHead>
              <TableHead className="text-default text-base text-center">
                Gold Sponsor Fee
              </TableHead>
              <TableHead className="text-default text-base text-center">
                Platinum Sponsor Fee
              </TableHead>
              <TableHead className="text-default text-base text-center">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {EventList?.map((event: ResourceEvent, index: number) => (
              <TableRow key={index}>
                <TableCell className="px-4 py-4 text-center">
                  <Image
                    src={event.imageUrl || event1}
                    alt={event.title}
                    width={48}
                    height={48}
                    className="w-16 h-16 object-cover rounded mx-auto"
                  />
                </TableCell>
                <TableCell className="px-4 py-4 text-darkGray text-center">
                  {event.title}
                </TableCell>
                {/* <TableCell className="px-4 py-4 text-darkGray text-center">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: event.description || "",
                    }}
                  />
                </TableCell> */}

                <TableCell className="px-4 py-4 text-darkGray text-center">
                  {event?.type || "N/A"}
                </TableCell>
                <TableCell className="px-4 py-4 text-darkGray text-center">
                  {event.silverSponsorFee}
                </TableCell>
                <TableCell className="px-4 py-4 text-darkGray text-center">
                  {event.goldSponsorFee}
                </TableCell>
                <TableCell className="px-4 py-4 text-darkGray text-center">
                  {event.platinumSponsorFee}
                </TableCell>
                <TableCell className="px-4 py-4 text-darkGray text-center">
                  <button onClick={()=>handleDelete(event.id)} className="text-red-500 hover:text-red-700">
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
          className={`bg-gray-800 text-white py-2 px-4 rounded-l-md ${
            currentPage === 1
              ? "bg-slate-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          <div className="flex items-center">
            <FaChevronLeft className="w-5 mr-2" />
            <span>Prev</span>
          </div>
        </button>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={!hasMoreData}
          className={`bg-gray-800 text-white py-2 px-4 rounded-r-md ${
            !hasMoreData
              ? "bg-slate-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
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

export default EventHistory;