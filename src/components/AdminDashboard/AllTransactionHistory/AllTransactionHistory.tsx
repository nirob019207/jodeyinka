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
    );
  }

  return (
    <div className="px-4 py-6 font-inter w-full lg:px-10">
      <h2 className="text-2xl font-bold mb-4 text-darkBlack">
        Transaction History
      </h2>

      {/* Responsive Table */}
      <div className="w-full rounded-lg">
        <div className="overflow-x-auto">
          <Table className="min-w-full table-auto">
            <TableHeader>
              <TableRow>
                <TableHead className="px-4 py-4 text-center font-semibold text-gray-700 border border-gray-300">
                  Transaction ID
                </TableHead>
                <TableHead className="px-4 py-4 text-center font-semibold text-gray-700 border border-gray-300">
                  Payment Method
                </TableHead>
                <TableHead className="px-4 py-4 text-center font-semibold text-gray-700 border border-gray-300">
                  Transaction Date
                </TableHead>
                <TableHead className="px-4 py-4 text-center font-semibold text-gray-700 border border-gray-300">
                  Amount Paid
                </TableHead>
                <TableHead className="px-4 py-4 text-center font-semibold text-gray-700 border border-gray-300">
                  Type
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction: Transaction, index: number) => (
                <TableRow key={index} className="border-t border-gray-300">
                  <TableCell className="px-4 py-4 text-center text-gray-600 text-sm sm:text-base border border-gray-300">
                    {transaction.id}
                  </TableCell>
                  <TableCell className="px-4 py-4 text-center text-gray-600 text-sm sm:text-base border border-gray-300">
                    {transaction.method}
                  </TableCell>
                  <TableCell className="px-4 py-4 text-center text-gray-600 text-sm sm:text-base border border-gray-300">
                    {new Date(transaction.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell className="px-4 py-4 text-center text-gray-600 text-sm sm:text-base border border-gray-300">
                    ${transaction.amount}
                  </TableCell>
                  <TableCell className="px-4 py-4 text-center text-gray-600 text-sm sm:text-base border border-gray-300">
                    {transaction.type}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
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
