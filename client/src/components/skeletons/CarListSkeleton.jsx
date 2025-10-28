import React from "react";

const CarListSkeleton = () => {
  return (
    <div className="animate-pulse">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="flex justify-between items-center flex-wrap gap-2 sm:grid grid-cols-[2fr_2fr_1fr_1fr] lg:grid-cols-[0.5fr_2fr_2fr_1fr_1fr] px-6 py-3 border-b border-slate-200"
        >
          {/* Index */}
          <div className="hidden lg:block">
            <div className="w-4 h-4 bg-gray-200 rounded"></div>
          </div>

          {/* Name & Image */}
          <div className="flex items-center gap-x-2">
            <div className="w-16 h-12 bg-gray-200 rounded-lg"></div>
            <div className="w-32 h-4 bg-gray-200 rounded"></div>
          </div>

          {/* Address */}
          <div className="w-28 h-4 bg-gray-200 rounded"></div>

          {/* Price */}
          <div className="w-16 h-4 bg-gray-200 rounded"></div>

          {/* Availability */}
          <div className="w-10 h-6 bg-gray-200 rounded-full"></div>
        </div>
      ))}
    </div>
  );
};

export default CarListSkeleton;
