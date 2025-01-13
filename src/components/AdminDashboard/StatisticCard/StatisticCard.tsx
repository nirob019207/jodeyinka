import React, { JSX } from "react";
import { FaDollarSign, FaUsers, FaGift } from "react-icons/fa";

interface StatisticCardProps {
  title: string;
  value: string;
  icon: JSX.Element;
}

const StatisticCard: React.FC<StatisticCardProps> = ({
  title,
  value,
  icon,
}) => {
  return (
   <div className="px-16">
     <div className="bg-white p-4 rounded-lg shadow flex  justify-between space-x-4 h-[165px]">
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
   </div>
  );
};

const StatisticsCard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <StatisticCard
        title="Total Revenue"
        value="$128.00"
        icon={<FaDollarSign className="text-3xl" />}
      />
      <StatisticCard
        title="Total Member"
        value="228.00"
        icon={<FaUsers className="text-3xl" />}
      />
      <StatisticCard
        title="Total Sponsor"
        value="228.00"
        icon={<FaGift className="text-3xl" />}
      />
    </div>
  );
};

export default StatisticsCard;
