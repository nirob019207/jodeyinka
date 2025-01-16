"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAllTransactionsQuery } from "@/redux/Api/transactionApi";
import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

type Transaction = {
  id: string;
  method: string;
  createdAt: string;
  amount: number;
  type: string;
};

const AllTransactionHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const { data: allTransaction, isLoading } = useAllTransactionsQuery({
    limit: limit,
    page: currentPage,
  });
  const transactions = allTransaction?.data || [];

  const hasMoreData = transactions?.length === limit; 

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };


  if (isLoading) {
    return (
      <div className="flex justify-center items-start min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
    ); // Simple spinner while data is loading
  }

  return (
    <div className="px-16 py-6 font-inter">
      <h2 className="text-2xl font-bold mb-4 text-darkBlack">
        Transaction History
      </h2>
      <div className="overflow-x-auto bg-white rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-4 py-4 text-center font-semibold text-default">
                Transaction ID
              </TableHead>
              <TableHead className="px-4 py-4 text-center font-semibold text-default">
                Payment Method
              </TableHead>
              <TableHead className="px-4 py-4 text-center font-semibold text-default">
                Transaction Date
              </TableHead>
              <TableHead className="px-4 py-4 text-center font-semibold text-default">
                Amount Paid
              </TableHead>
              <TableHead className="px-4 py-4 text-center font-semibold text-default">
                Type
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction: Transaction, index: number) => (
              <TableRow key={index} className="border-t">
                <TableCell className="px-4 py-4 text-center text-darkGray">
                  {transaction.id}
                </TableCell>
                <TableCell className="px-4 py-4 text-center text-darkGray">
                  {transaction.method}
                </TableCell>
                <TableCell className="px-4 py-4 text-center text-darkGray">
                  {new Date(transaction.createdAt).toLocaleString()}
                </TableCell>
                <TableCell className="px-4 py-4 text-center text-darkGray">
                  ${transaction.amount}
                </TableCell>
                <TableCell className="px-4 py-4 text-center text-darkGray">
                  {transaction.type}
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

export default AllTransactionHistory;
