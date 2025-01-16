"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSponsorReqQuery } from "@/redux/Api/sponsorApi";
import Image from "next/image";
import defultAvatar from "@/asset/profilavater.webp";
import { toast } from "sonner";
import { useAcceptSponsorMutation } from "@/redux/Api/userApi";

const SponsorHistorys = () => {
  const { data } = useSponsorReqQuery({});
  const [accept, { isLoading }] = useAcceptSponsorMutation();
  const sponsors = data?.data;

  const handleAccept = async (id: string) => {
    try {
      console.log(id)
      await accept(
        id
      ).unwrap();
      toast.success("Sponsor accepted successfully!");
    } catch (err) {
      toast.error("Failed to update sponsor status.");
      console.error(err);
    }
  };

  if (isLoading) return <div className="container">
    <div className="px-6 md:px-16 py-6 animate-pulse">
      <div className="flex justify-between items-center mb-4">
        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
        <table>
          <thead>
            <tr>
              <th className="text-default text-center">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </th>
              <th className="text-default text-center">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </th>
              <th className="text-default text-center">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </th>
              <th className="text-default text-center">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </th>
              <th className="text-default text-center">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </th>
              <th className="text-default text-center">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center">
                <div className="h-16 w-16 bg-gray-200 rounded-full mx-auto"></div>
              </td>
              <td className="text-darkGray text-center">
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
              </td>
              <td className="text-darkGray text-center">
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
              </td>
              <td className="text-darkGray text-center">
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
              </td>
              <td className="text-darkGray text-center">
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
              </td>
              <td className="text-center">
                <div className="h-6 bg-gray-200 rounded w-1/4 mx-auto"></div>
              </td>
            </tr>
            
          </tbody>
        </table>
      </div>
</div>

  </div>;

  return (
    <div className="px-6 md:px-16 py-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-darkBlack">Sponsor History</h2>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-default text-center">Profile Photos</TableHead>
              <TableHead className="text-default text-center">Name</TableHead>
              <TableHead className="text-default text-center">Company Name</TableHead>
              <TableHead className="text-default text-center">Country</TableHead>
              <TableHead className="text-default text-center">Status</TableHead>
              <TableHead className="text-default text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sponsors?.map((sponsor) => (
              <TableRow key={sponsor.sl}>
                <TableCell className="text-center">
                  <Image
                    src={sponsor.avatarUrl || defultAvatar}
                    alt={sponsor.firstName}
                    width={48}
                    height={48}
                    className="w-16 h-16 object-cover rounded-full mx-auto"
                  />
                </TableCell>
                <TableCell className="text-darkGray text-center">
                  {sponsor.firstName} {sponsor.lastName}
                </TableCell>
                <TableCell className="text-darkGray text-center">
                  {sponsor.organizationName}
                </TableCell>
                <TableCell className="text-darkGray text-center">
                  {sponsor.country}
                </TableCell>
                <TableCell className="text-darkGray text-center">
                  <span
                    className={`py-1 px-2 rounded-md text-sm ${
                      sponsor.sponsorStatus === "PENDING"
                        ? "text-yellow-600 bg-yellow-100"
                        : "text-green-600 bg-green-100"
                    }`}
                  >
                    {sponsor.sponsorStatus}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleAccept(sponsor.id)}
                    >
                      Accept
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

export default SponsorHistorys;
