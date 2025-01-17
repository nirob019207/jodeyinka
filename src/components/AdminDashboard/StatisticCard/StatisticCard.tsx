"use client";
import { useDashobardQuery } from "@/redux/Api/dashboardApi";
import React from "react";
import { FaDollarSign, FaUsers, FaGift } from "react-icons/fa";

const StatisticsCard = () => {
  const { data, isLoading, isError } = useDashobardQuery({});
  
  if (isLoading) {
    return <div className="px-16">Loading...</div>;
  }

  if (isError) {
    return <div className="px-16">Failed to load statistics. Please try again.</div>;
  }

  const totalRevenue = data?.data?.totalAmount?._sum?.amount || 0;
  const totalMembers = data?.data?.totalMember?._sum?.amount || 0;
  const totalSponsors = data?.data?.totalSponsor?._sum?.amount || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:px-16 px-4">
      <StatisticCard
        title="Total Revenue"
        value={`$${totalRevenue.toLocaleString()}`}
        icon={<FaDollarSign className="text-3xl" />}
      />
      <StatisticCard
        title="Total Members"
        value={totalMembers.toLocaleString()}
        icon={<FaUsers className="text-3xl" />}
      />
      <StatisticCard
        title="Total Sponsors Amount"
        value={totalSponsors.toLocaleString()}
        icon={<FaGift className="text-3xl" />}
      />
    </div>
  );
};

interface StatisticCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const StatisticCard: React.FC<StatisticCardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex justify-between space-x-4 md:h-[165px]">
      <div className="flex flex-col justify-center items-start">
        <h4 className="font-medium text-darkBlack">{title}</h4>
        <p className="text-[28px] font-semibold text-gray-700 mt-[10px]">
          {value}
        </p>
      </div>
      <div className="text-blue-500 w-[48px] h-[48px] bg-[#0061FF1A] rounded-full flex items-center justify-center">
        {icon}
      </div>
    </div>
  );
};

export default StatisticsCard;
