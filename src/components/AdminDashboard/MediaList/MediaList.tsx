"use client";

import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa"; // Importing trash icon from react-icons
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
import { useDeleteResourceMutation, useGetResourceQuery } from "@/redux/Api/resourceApi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Eye } from "lucide-react";
import { toast } from "sonner";

// Type for resource events
type MediaEvent = {
  fileUrl: string;
  title: string;
  description: string;
  type: string;
  id: string;
};

const MedaiList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 6;

  const { data, isLoading, isError } = useGetResourceQuery({
    type: "MEDIA",
    limit: limit,
    page: currentPage,
  });
  const [deleteMediaFn] = useDeleteResourceMutation()

  const mediaList = data?.data;

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (isLoading) {
    return (
      <div className="lg:px-10 px-4 py-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-darkBlack">
            Media History
          </h2>
          <Link
            href={"/admin/create-media"}
            className="text-blue-500 hover:text-blue-700"
          >
            Create Media
          </Link>
        </div>

        {/* Loading Spinner */}
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full border-t-4 border-blue-500 h-16 w-16"></div>
        </div>
      </div>
    );
  }

  const handleDelete = async (id: string): Promise<void> => {
    // Implementation for delete
   const response =  await deleteMediaFn(id)
   if ('error' in response) {
    toast.error("Media Delete Failed!")
   } else {
    toast.success("Media Delete Successfully")
   }
  };

  if (isError) {
    return (
      <div className="lg:px-10 px-4 py-6">
        <p className="text-red-500 text-center">
          Error fetching data. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="lg:px-10 px-4 py-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-darkBlack">Media History</h2>
        <Link
          href={"/admin/create-media"}
          className="text-blue-500 hover:text-blue-700"
        >
          Create Media
        </Link>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-default text-base text-center">
                Image
              </TableHead>
              <TableHead className="text-default text-base text-center">
                Media Title
              </TableHead>
              <TableHead className="text-default text-base text-center">
                Description
              </TableHead>
              <TableHead className="text-default text-base text-center">
                Type
              </TableHead>
              <TableHead className="text-default text-base text-center">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mediaList?.map((event: MediaEvent, index: number) => (
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
                <TableCell className="px-4 py-4 text-darkGray text-center">
                  {event.title.split(" ").slice(0, 10).join(" ") + "..."}
                </TableCell>
                <TableCell className="px-4 py-4 text-darkGray text-center">
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        (event.description || "")
                          .split(" ")
                          .slice(0, 2)
                          .join(" ") + "...",
                    }}
                  />
                </TableCell>

                <TableCell className="px-4 py-4 text-darkGray text-center">
                  {event.type}
                </TableCell>
                <TableCell className="px-4 py-4 text-darkGray text-center">
                  <button onClick={()=>handleDelete(event.id)} className="text-red-500 hover:text-red-700">
                    <FaTrashAlt className="text-lg text-center" />
                  </button>
                  <Link href={"/media"} className="inline-flex">
                    <Eye className="text-green-400 ml-5 text-lg" />
                  </Link>
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
          className={`py-2 px-4 rounded-l-md text-white ${
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
          disabled={mediaList?.length < limit} // If less data is returned, disable next
          className={`py-2 px-4 rounded-r-md text-white ${
            mediaList?.length < limit
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

export default MedaiList;
