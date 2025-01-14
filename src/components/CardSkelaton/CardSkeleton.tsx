import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const CardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 animate-pulse">
      <div className="w-full h-[200px] bg-gray-200"></div>

      <div className="px-4">
        <div className="h-6 bg-gray-200 rounded w-1/2 mt-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mt-2"></div>
        <div className="mt-6 pb-7">
          <div className="border border-[#DDDDDD] w-full h-10 bg-gray-200 mt-2 rounded-[8px]"></div>
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
