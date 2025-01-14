import React from 'react';
import { FaTrashAlt } from 'react-icons/fa'; // Importing trash icon from react-icons
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import event from "@/asset/admin/event.svg"
import e1 from "@/asset/admin/ee2.svg"
import e2 from "@/asset/admin/ee3.svg"
import Image from 'next/image';

const EventHistory = () => {
  const events = [
    {
      image: event, 
      eventName: 'Gabagool & Jam Vape',
      joinDate: '11/09/2024',
      location: 'Malaysia',
      time: '3:00 PM'
    },
    {
      image: e1,
      eventName: 'Gabagool & Jam Vape',
      joinDate: '11/09/2024',
      location: 'UK',
      time: '3:00 PM'
    },
    {
      image: e2,
      eventName: 'Gabagool & Jam Vape',
      joinDate: '11/09/2024',
      location: 'Australia',
      time: '3:00 PM'
    },
    {
      image: event,
      eventName: 'Gabagool & Jam Vape',
      joinDate: '11/09/2024',
      location: 'Germany',
      time: '3:00 PM'
    },
    {
      image: e1,
      eventName: 'Gabagool & Jam Vape',
      joinDate: '11/09/2024',
      location: 'France',
      time: '3:00 PM'
    },
    {
      image: e2,
      eventName: 'Gabagool & Jam Vape',
      joinDate: '11/09/2024',
      location: 'Denmark',
      time: '3:00 PM'
    },
    {
      image: event,
      eventName: 'Gabagool & Jam Vape',
      joinDate: '11/09/2024',
      location: 'Italy',
      time: '3:00 PM'
    },
    {
      image: e1,
      eventName: 'Gabagool & Jam Vape',
      joinDate: '11/09/2024',
      location: 'Paris',
      time: '3:00 PM'
    }
  ];

  return (
    <div className="px-16 py-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-darkBlack">Event History</h2>
        <button className="text-blue-500 hover:text-blue-700">See All</button>
      </div>

      {/* Replacing TableContainer with a div for responsiveness */}
      <div className="overflow-x-auto bg-white  rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='text-default text-base text-center'>Image</TableHead>
              <TableHead className='text-default text-base text-center'>Event Name</TableHead>
              <TableHead className='text-default text-base text-center'>Join Date</TableHead>
              <TableHead className='text-default text-base text-center'>Location</TableHead>
              <TableHead className='text-default text-base text-center'>Time</TableHead>
              <TableHead className='text-default text-base text-center'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event, index) => (
              <TableRow key={index}>
                <TableCell className="px-4 py-4 text-center">
                  <Image src={event.image} alt={event.eventName} className="w-16 h-16 object-cover rounded mx-auto" />
                </TableCell>
                <TableCell className="px-4 py-4 text-darkGray text-center">{event.eventName}</TableCell>
                <TableCell className="px-4 py-4 text-darkGray text-center">{event.joinDate}</TableCell>
                <TableCell className="px-4 py-4 text-darkGray text-center">{event.location}</TableCell>
                <TableCell className="px-4 py-4 text-darkGray text-center">{event.time}</TableCell>
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

export default EventHistory;
