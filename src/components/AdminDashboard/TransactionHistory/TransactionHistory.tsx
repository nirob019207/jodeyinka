'use client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useMyTransactionsQuery } from '@/redux/Api/transactionApi';
import React from 'react';

type Transaction = {
  id: string;
  method: string;
  createdAt: string;
  amount: number;
  type: string;
};

const TransactionHistory = () => {

  const { data: myTransactions } = useMyTransactionsQuery(undefined);
  const transactions = myTransactions?.data || [];

  return (
    <div className="px-16 py-6 font-inter">
      <h2 className="text-2xl font-bold mb-4 text-darkBlack">Transaction History</h2>
      <div className="overflow-x-auto bg-white rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-4 py-4 text-center font-semibold text-default">Transaction ID</TableHead>
              <TableHead className="px-4 py-4 text-center font-semibold text-default">Payment Method</TableHead>
              <TableHead className="px-4 py-4 text-center font-semibold text-default">Transaction Date</TableHead>
              <TableHead className="px-4 py-4 text-center font-semibold text-default">Amount Paid</TableHead>
              <TableHead className="px-4 py-4 text-center font-semibold text-default">Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction: Transaction, index: number) => (
              <TableRow key={index} className="border-t">
              <TableCell className="px-4 py-4 text-center text-darkGray">{transaction.id}</TableCell>
              <TableCell className="px-4 py-4 text-center text-darkGray">{transaction.method}</TableCell>
              <TableCell className="px-4 py-4 text-center text-darkGray">{new Date(transaction.createdAt).toLocaleString()}</TableCell>
              <TableCell className="px-4 py-4 text-center text-darkGray">${transaction.amount}</TableCell>
              <TableCell className="px-4 py-4 text-center text-darkGray">{transaction.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TransactionHistory;
