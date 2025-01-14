"use client"
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MemberAnalyticsChart = () => {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Member Analytics',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: '#12B76A',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
   <div className='px-16'>
     <div className="bg-white p-6 rounded-lg mt-8">
      <h3 className="text-xl font-semibold text-darkGray mb-4">Member Analytics</h3>
      <div className="flex justify-end items-center mb-4 gap-6">
        <span className="text-darkGray">Sort by</span>
        <select className="p-2 bg-gray-100 border rounded-md text-darkGray">
          <option value="Jul, 2024">Jul, 2024</option>
        </select>
      </div>
      <Line data={data} options={options} />
    </div>
   </div>
  );
};

export default MemberAnalyticsChart;
