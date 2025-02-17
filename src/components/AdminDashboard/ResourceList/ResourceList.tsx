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
import { useDeleteResourceMutation, useGetResourceQuery } from "@/redux/Api/resourceApi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Eye } from "lucide-react";
import { toast } from "sonner";
import { useGetMeQuery } from "@/redux/Api/userApi";

const ResourceList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 6; // Number of resources per page
  const { data: datame } = useGetMeQuery({}); // Fetch logged-in user data
  const userId = datame?.data?.id;
  const userRole = datame?.data?.role; // Get user role (e.g., "ADMIN")

  // Fetch resource data
  const { data, isLoading, isError } = useGetResourceQuery({
    type: "RESOURCE",
    limit: limit,
    page: currentPage,
  });

  const [deleteResourceFn] = useDeleteResourceMutation();

  // Extract resource list
  let resourceList = data?.data ?? [];

  // ✅ Filter resources based on role
  if (userRole !== "ADMIN") {
    resourceList = resourceList.filter((resource:any) => resource.authorId === userId);
  }

  const hasMoreData = resourceList.length === limit;

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleDelete = async (id: string): Promise<void> => {
    const response = await deleteResourceFn(id);
    if (response) {
      toast.success("Resource Deleted Successfully");
    } else {
      toast.error("Resource Delete Failed!");
    }
  };

  if (isLoading) {
    return (
      <div className="md:px-10 px-4 py-6">
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
    <div className="lg:px-10 px-4 py-6">
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
              {userRole === "ADMIN" && (
                <>
                  <TableHead className="text-default text-base text-center">Author</TableHead>
                  <TableHead className="text-default text-base text-center">Created At</TableHead>
                </>
              )}
              <TableHead className="text-default text-base text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {resourceList.map((resource:any, index:number) => (
              <TableRow key={index}>
                <TableCell className="px-4 py-4 text-center">
                  <Image
                    src={resource.fileUrl}
                    alt={resource.title}
                    width={48}
                    height={48}
                    className="w-16 h-16 object-cover rounded mx-auto"
                  />
                </TableCell>
                <TableCell className="px-4 py-4 text-darkGray text-center">
                  {resource.title}
                </TableCell>
                <TableCell className="px-4 py-4 text-darkGray text-center">
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        (resource.description || "").split(" ").slice(0, 2).join(" ") + "...",
                    }}
                  />
                </TableCell>
                <TableCell className="px-4 py-4 text-darkGray text-center">{resource.type}</TableCell>
                
                {/* ✅ Only show these fields if Admin */}
                {userRole === "ADMIN" && (
                  <>
                    <TableCell className="px-4 py-4 text-darkGray text-center">
                      {resource.Author?.firstName} {resource.Author?.lastName}
                    </TableCell>
                    <TableCell className="px-4 py-4 text-darkGray text-center">
                      {new Date(resource.createdAt).toLocaleString()}
                    </TableCell>
                  </>
                )}

                <TableCell className="px-4 py-4 text-darkGray text-center">
                  {userRole === "ADMIN" || resource.authorId === userId ? (
                    <button onClick={() => handleDelete(resource.id)} className="text-red-500 hover:text-red-700">
                      <FaTrashAlt className="text-lg text-center" />
                    </button>
                  ) : null}

                  <Link href={"/resources"} className="inline-flex">
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
          className={`bg-gray-800 text-white py-2 px-4 rounded-l-md ${
            currentPage === 1 ? "bg-slate-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
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
            !hasMoreData ? "bg-slate-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
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

export default ResourceList;
