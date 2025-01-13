import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FaRegTrashAlt } from 'react-icons/fa';

const SponsorHistorys = () => {
  const sponsors = [
    { sl: 1, companyName: 'Gabagool & Jam Vape', email: 'email@gmail.com', startDate: '12/09/2024', endDate: '12/09/2024', status: 'Approved' },
    { sl: 2, companyName: 'Gabagool & Jam Vape', email: 'email@gmail.com', startDate: '12/09/2024', endDate: '12/09/2024', status: 'Approved' },
    { sl: 3, companyName: 'Gabagool & Jam Vape', email: 'email@gmail.com', startDate: '12/09/2024', endDate: '12/09/2024', status: 'Approved' },
    { sl: 4, companyName: 'Gabagool & Jam Vape', email: 'email@gmail.com', startDate: '12/09/2024', endDate: '12/09/2024', status: 'Approved' },
    { sl: 5, companyName: 'Gabagool & Jam Vape', email: 'email@gmail.com', startDate: '12/09/2024', endDate: '12/09/2024', status: 'Approved' },
    { sl: 6, companyName: 'Gabagool & Jam Vape', email: 'email@gmail.com', startDate: '12/09/2024', endDate: '12/09/2024', status: 'Approved' },
    { sl: 7, companyName: 'Gabagool & Jam Vape', email: 'email@gmail.com', startDate: '12/09/2024', endDate: '12/09/2024', status: 'Approved' },
    { sl: 8, companyName: 'Gabagool & Jam Vape', email: 'email@gmail.com', startDate: '12/09/2024', endDate: '12/09/2024', status: 'Approved' },
    { sl: 9, companyName: 'Gabagool & Jam Vape', email: 'email@gmail.com', startDate: '12/09/2024', endDate: '12/09/2024', status: 'Approved' },
    { sl: 10, companyName: 'Gabagool & Jam Vape', email: 'email@gmail.com', startDate: '12/09/2024', endDate: '12/09/2024', status: 'Approved' },
  ];

  return (
    <div className="px-16 py-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-darkBlack">Sponsor History</h2>
        <button className="text-blue-500 hover:text-blue-700">See All</button>
      </div>
      
      {/* Replace TableContainer with div for responsive table */}
      <div className="overflow-x-auto bg-white  rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='text-default text-center'>SL</TableHead>
              <TableHead className='text-default text-center'>Company Name</TableHead>
              <TableHead className='text-default text-center'>Email</TableHead>
              <TableHead className='text-default text-center'>Start Date</TableHead>
              <TableHead className='text-default text-center'>End Date</TableHead>
              <TableHead className='text-default text-center'>Status</TableHead>
              <TableHead className='text-default text-center'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sponsors.map((sponsor) => (
              <TableRow key={sponsor.sl}>
                <TableCell className='text-darkGray text-center'>{sponsor.sl}</TableCell>
                <TableCell className='text-darkGray text-center'>{sponsor.companyName}</TableCell>
                <TableCell className='text-darkGray text-center'>{sponsor.email}</TableCell>
                <TableCell className='text-darkGray text-center'>{sponsor.startDate}</TableCell>
                <TableCell className='text-darkGray text-center'>{sponsor.endDate}</TableCell>
                <TableCell className='text-darkGray text-center'>
                  <span className="text-[#12B76A] py-1 px-2  hover:border hover:border-[#12B76A] hover:rounded-[4px] transition-all duration-300">
                    {sponsor.status}
                  </span>
                </TableCell>
                <TableCell className='text-center'>
                  <button className="text-red-500 hover:text-red-700">
                  <FaRegTrashAlt className='text-[20px] ' />
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
