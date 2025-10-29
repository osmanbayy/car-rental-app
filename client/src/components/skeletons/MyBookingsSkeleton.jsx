/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";

const MyBookingsSkeleton = () => {
  const skeletonArray = Array.from({ length: 3 });

  return (
    <div className="flex flex-col gap-4">
      {skeletonArray.map((_, index) => (
        <motion.div
          key={index}
          className="bg-white ring-1 ring-slate-900/10 p-4 rounded-lg animate-pulse"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex gap-3 mb-3">
            <div className="bg-gray-200 rounded-xl w-28 h-20" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/3" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
              <div className="h-3 bg-gray-200 rounded w-2/3" />
            </div>
          </div>

          <div className="border-t border-gray-300 pt-3 space-y-2">
            <div className="flex gap-4">
              <div className="h-3 bg-gray-200 rounded w-1/4" />
              <div className="h-3 bg-gray-200 rounded w-1/4" />
            </div>
            <div className="flex justify-between items-center mt-2">
              <div className="h-3 bg-gray-200 rounded w-1/3" />
              <div className="h-6 bg-gray-200 rounded w-16" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MyBookingsSkeleton;
