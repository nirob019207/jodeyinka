"use client"
import React from "react";
import { FaTrashAlt } from "react-icons/fa"; // Importing trash icon from react-icons
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
;
import Image from "next/image";
import Link from "next/link";
import { useGetResourceQuery } from "@/redux/Api/resourceApi";

type MediaEvent = {
  fileUrl: string;
  title: string;
//   joinDate: string;
  description: string;
  type: string;
};

const MedaiList = () => {
  const { data, isLoading, isError } = useGetResourceQuery({
    type: "MEDIA",
    limit: 10,
  });
  const mediaList = data?.data;
  console.log(mediaList)

  //   const events = [
  //     {
  //       image: event,
  //       eventName: 'Gabagool & Jam Vape',
  //       joinDate: '11/09/2024',
  //       location: 'Malaysia',
  //       time: '3:00 PM'
  //     },
  //     {
  //       image: e1,
  //       eventName: 'Gabagool & Jam Vape',
  //       joinDate: '11/09/2024',
  //       location: 'UK',
  //       time: '3:00 PM'
  //     },
  //     {
  //       image: e2,
  //       eventName: 'Gabagool & Jam Vape',
  //       joinDate: '11/09/2024',
  //       location: 'Australia',
  //       time: '3:00 PM'
  //     },
  //     {
  //       image: event,
  //       eventName: 'Gabagool & Jam Vape',
  //       joinDate: '11/09/2024',
  //       location: 'Germany',
  //       time: '3:00 PM'
  //     },
  //     {
  //       image: e1,
  //       eventName: 'Gabagool & Jam Vape',
  //       joinDate: '11/09/2024',
  //       location: 'France',
  //       time: '3:00 PM'
  //     },
  //     {
  //       image: e2,
  //       eventName: 'Gabagool & Jam Vape',
  //       joinDate: '11/09/2024',
  //       location: 'Denmark',
  //       time: '3:00 PM'
  //     },
  //     {
  //       image: event,
  //       eventName: 'Gabagool & Jam Vape',
  //       joinDate: '11/09/2024',
  //       location: 'Italy',
  //       time: '3:00 PM'
  //     },
  //     {
  //       image: e1,
  //       eventName: 'Gabagool & Jam Vape',
  //       joinDate: '11/09/2024',
  //       location: 'Paris',
  //       time: '3:00 PM'
  //     }
  //   ];

  return (
    <div className="px-16 py-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-darkBlack">Media History</h2>
        <Link
          href={"/admin/create-media"}
          className="text-blue-500 hover:text-blue-700"
        >
          Create Media
        </Link>
      </div>

      {/* Replacing TableContainer with a div for responsiveness */}
      <div className="overflow-x-auto bg-white  rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-default text-base text-center">
                Image
              </TableHead>
              <TableHead className="text-default text-base text-center">
                Media Title
              </TableHead>
              {/* <TableHead className="text-default text-base text-center">
                Join Date
              </TableHead> */}
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
                  {event.title}
                </TableCell>
                {/* <TableCell className="px-4 py-4 text-darkGray text-center">
                  {event.joinDate}
                </TableCell> */}
                <TableCell className="px-4 py-4 text-darkGray text-center">
                  {event.description}
                </TableCell>
                <TableCell className="px-4 py-4 text-darkGray text-center">
                  {event.type}
                </TableCell>
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
    </div>
  );
};

export default MedaiList;
