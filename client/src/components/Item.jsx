/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/data";
import { motion } from "framer-motion";

const Item = ({ car }) => {
  const currency = "$";
  const navigate = useNavigate();

  const colors = ["#f5f5f5", "#f0f9fd", "#fcf6ed"];
  const bgColor =
    colors[parseInt(car._id?.slice(-4) || "0", 16) % colors.length];
    
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onClick={() => {
        navigate(`/listing/${car._id}`);
        scrollTo(0, 0);
      }}
      className="block rounded-lg ring-1 ring-slate-900/5 p-5 cursor-pointer"
      style={{ backgroundColor: bgColor }}
    >
      <h4 className="line-clamp-1">{car.title}</h4>
      <div className="flex-between">
        <h5 className="my-1 text-gray-50">{car.bodyType}</h5>
        <div className="text-sm font-semibold text-solid">
          {currency}
          {car.price.sale} | {currency}
          {car.price.rent}.00 <span className="text-xs">/day</span>
        </div>
      </div>
      {/* Image */}
      <div className="relative py-6">
        <img src={car.images[0]} alt={car.title} className="w-full h-32 object-contain" />
      </div>
      {/* Info */}
      <div className="">
        <div className="flex-between py-2">
          <p className="flex-center flex-col gap-1 text-black">
            <img src={assets.transmission} alt="seats" width={23} />
            {car.specs.transmission}
          </p>
          <hr className="h-[44px] w-0.5 bg-slate-900/20 border-none" />
          <p className="flex-center flex-col gap-1 text-black">
            <img src={assets.seats} alt="seats" width={23} />
            {car.specs.seats}
          </p>
          <hr className="h-[44px] w-0.5 bg-slate-900/20 border-none" />
          <p className="flex-center flex-col gap-1 text-black">
            <img src={assets.fuelType} alt="transmission" width={19} />
            {car.specs.fuelType}
          </p>
          <hr className="h-[44px] w-0.5 bg-slate-900/20 border-none" />
          <p className="flex-center flex-col gap-1 text-black">
            <img src={assets.odometer} alt="transmission" width={19} />
            {car.odometer} km
          </p>
        </div>
        <p className="pt-2 mb-4 line-clamp-2">{car.description}</p>
      </div>
    </motion.div>
  );
};

export default Item;
