import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { assets, dummyBookingsData } from "../assets/data";
import { useUser } from "@clerk/clerk-react";
import Title from "../components/Title";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const currency = "$";

  const { user } = useUser();

  // Animation variants
  const pageVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { when: "beforeChildren", staggerChildren: 0.06 }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 60, damping: 12 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 70, damping: 14 }
    }
  };

  const getUserBookings = async () => {
    setBookings(dummyBookingsData);
  };

  useEffect(() => {
    if (user) {
      getUserBookings();
    }
  }, [user]);
  return (
    <motion.div
      className="bg-primary py-16 pt-28"
      variants={pageVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div className="max-padd-container" variants={contentVariants}>
        <Title
          title2={"My Bookings"}
          titleStyles={"mb-10"}
          title2Styles={"text-4xl"}
        />
        {bookings?.map((booking) => (
          <motion.div
            key={booking._id}
            className="bg-white ring-1 ring-slate-900/10 p-2 pr-4 mt-3 rounded-lg"
            variants={itemVariants}
          >
            {/* Car List */}
            <div className="flex-start gap-3 mb-3">
              <div className="bg-primary rounded-xl overflow-hidden flex-center h-19">
                <img
                  src={booking.car.images[0]}
                  alt="car main image"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="">
                <h5 className="capitalize line-clamp-1">{booking.car.title}</h5>
                <div className="flex gap-4">
                  <div className="flex items-center gap-x-2">
                    <h5>Seats</h5>
                    <p>{booking.car.specs.seats}</p>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <h5>Total:</h5>
                    <p className="text-gray-400 text-sm">
                      {currency}
                      {booking.totalPrice}
                    </p>
                  </div>
                </div>
                <p className="flex place-items-baseline gap-1 mt-0.5">
                  <img src={assets.pin} alt="pin icon" width={13} />
                  {booking.car.address}
                </p>
              </div>
            </div>
            {/* Booking Summary */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3 border-t border-gray-300 pt-3">
              <div className="flex gap-2 gap-x-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <h5>Booking ID:</h5>
                  <p className="text-gray-400 text-xs">{booking._id}</p>
                </div>
                <div className="flex items-center gap-2">
                  <h5>Pick-Up Date:</h5>
                  <p className="text-gray-400 text-xs">
                    {new Date(booking.pickUpDate).toDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <h5>Drop-Off Date:</h5>
                  <p className="text-gray-400 text-xs">
                    {new Date(booking.dropOffDate).toDateString()}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 gap-x-3">
                <div className="flex items-center gap-x-2">
                  <h5>Payment:</h5>
                  <div className="flex items-center gap-1">
                    <span
                      className={`min-w-2.5 h-2.5 rounded-full ${
                        booking.isPaid ? "bg-green-500" : "bg-yellow-500"
                      }`}
                    />
                    <p>{booking.isPaid ? "Paid" : "UnPaid"}</p>
                  </div>
                </div>
                {!booking.isPaid && (
                  <button className="btn-solid !py-1 !text-xs rounded-sm hover:bg-blue-500">
                    Pay Now
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default MyBookings;