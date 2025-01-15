'use client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useMyTransactionsQuery } from '@/redux/Api/transactionApi';
import React from 'react';

interface Transaction {
  date: string;
  transactionId: string;
  paymentMethod: string;
  amountPaid: string;
  type: string;
}

const transactions: Transaction[] = [
  // { date: '12/09/2024', transactionId: 'TXN789456', paymentMethod: 'Credit Card', amountPaid: '$1', type: 'Concentrates' },
  // { date: '12/09/2024', transactionId: 'TXN789456', paymentMethod: 'Bank Transfer', amountPaid: '$1', type: 'Concentrates' },
  // { date: '12/09/2024', transactionId: 'TXN789456', paymentMethod: 'Online Wallet', amountPaid: '$1', type: 'Concentrates' },
  // { date: '12/09/2024', transactionId: 'TXN789456', paymentMethod: 'Credit Card', amountPaid: '$1', type: 'Concentrates' },
  // { date: '12/09/2024', transactionId: 'TXN789456', paymentMethod: 'Bank Transfer', amountPaid: '$1', type: 'Concentrates' },
  // { date: '12/09/2024', transactionId: 'TXN789456', paymentMethod: 'Online Wallet', amountPaid: '$1', type: 'Concentrates' },
  // { date: '12/09/2024', transactionId: 'TXN789456', paymentMethod: 'Online Wallet', amountPaid: '$1', type: 'Concentrates' },
  // { date: '12/09/2024', transactionId: 'TXN789456', paymentMethod: 'Credit Card', amountPaid: '$1', type: 'Concentrates' },
  // { date: '12/09/2024', transactionId: 'TXN789456', paymentMethod: 'Bank Transfer', amountPaid: '$1', type: 'Concentrates' },
  // { date: '12/09/2024', transactionId: 'TXN789456', paymentMethod: 'Online Wallet', amountPaid: '$1', type: 'Concentrates' },
];

const TransactionHistory = () => {

  const myTransactions=useMyTransactionsQuery(undefined)
console.log(myTransactions)
  return (
    <div className="px-16 py-6 font-inter">
      <h2 className="text-2xl font-bold mb-4 text-darkBlack">Transaction History</h2>
      <div className="overflow-x-auto bg-white  rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-4 py-4 text-center  font-semibold text-default">Transaction ID</TableHead>
              <TableHead className="px-4 py-4 text-center  font-semibold text-default">Payment Method</TableHead>
              <TableHead className="px-4 py-4 text-center  font-semibold text-default">Transaction Date</TableHead>
              <TableHead className="px-4 py-4 text-center  font-semibold text-default">Amount Paid</TableHead>
              <TableHead className="px-4 py-4 text-center  font-semibold text-default">Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction, index) => (
              <TableRow key={index} className="border-t">
                <TableCell className="px-4 py-4 text-center text-darkGray">{transaction.date}</TableCell>
                <TableCell className="px-4 py-4 text-center text-darkGray">{transaction.transactionId}</TableCell>
                <TableCell className="px-4 py-4 text-center text-darkGray">{transaction.paymentMethod}</TableCell>
                <TableCell className="px-4 py-4 text-center text-darkGray">{transaction.amountPaid}</TableCell>
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
