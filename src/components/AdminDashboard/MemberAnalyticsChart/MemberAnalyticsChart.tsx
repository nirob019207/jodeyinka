"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useAllTransDashQuery } from "@/redux/Api/dashboardApi";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MemberAnalyticsChart = () => {
  const { data, isLoading, isError } = useAllTransDashQuery({});
  const transactions = data?.data || [];

  // Group and process data
  const groupedData: { [date: string]: number } = transactions.reduce(
    (acc: { [date: string]: number }, transaction: any) => {
      const date = new Date(transaction.createdAt).toLocaleDateString("en-US");
      acc[date] = (acc[date] || 0) + transaction.amount;
      return acc;
    },
    {}
  );

  const labels = Object.keys(groupedData).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );
  const dataset = labels.map((label) => groupedData[label]);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Transaction Amount",
        data: dataset,
        fill: false,
        borderColor: "#12B76A",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  if (isLoading) {
    return <div className="px-4 sm:px-16">Loading...</div>;
  }

  if (isError) {
    return <div className="px-4 sm:px-16">Failed to load chart data. Please try again.</div>;
  }

  return (
    <div className="px-4 sm:px-16">
      <div className="bg-white p-4 sm:p-6 rounded-lg mt-8">
        <h3 className="text-xl font-semibold text-darkGray mb-4">Transaction Analytics</h3>
        <div className="w-full h-full ">
          <Line data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default MemberAnalyticsChart;
