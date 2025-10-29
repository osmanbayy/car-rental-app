/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CarImages from "../components/CarImages";
import { assets } from "../assets/data";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const CarDetails = () => {
  const [car, setCar] = useState(null);
  const [pickUpDate, setPickUpDate] = useState(null);
  const [dropOffDate, setDropOffDate] = useState(null);
  const [isAvailable, setIsAvailable] = useState(false);

  const { axios, getToken, currency, cars, navigate } = useAppContext();
  const { id } = useParams();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, when: "beforeChildren" }
    }
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 60, damping: 12, mass: 0.6 }
    }
  };

  const slideLeftVariants = {
    hidden: { opacity: 0, x: -24 },
    show: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 70, damping: 14 }
    }
  };

  const slideRightVariants = {
    hidden: { opacity: 0, x: 24 },
    show: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 70, damping: 14 }
    }
  };

  useEffect(() => {
    if (cars && cars.length > 0) {
      const foundCar = cars.find((car) => car._id === id);
      if (foundCar) {
        setCar(foundCar);
      }
    }
  }, [cars, id]);

  return (
    car && (
      <motion.div
        className="bg-primary"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div
          className="max-padd-container px-6 pt-2 pb-16"
          variants={fadeUpVariants}
        >
          {/* Container */}
          <div className="flex flex-col md:flex-row gap-6 mt-16">
            {/* Info - Left Side */}
            <motion.div
              className="flex-[5] bg-white p-5 rounded-xl my-4"
              variants={slideLeftVariants}
            >
              <p className="flex-start gap-x-2">
                <img src={assets.pin} alt="pin-icon" width={19} />
                <span>{car.address}</span>
              </p>
              <div className="flex justify-between flex-col sm:flex-row sm:items-end mt-3">
                <h3>{car.title}</h3>
                <h4>
                  {currency}
                  {car.price.sale} | {car.price.rent}.00/day
                </h4>
              </div>
              <div className="flex justify-between items-start my-1">
                <h4 className="text-solid">{car.bodyType}</h4>
                <div className="flex items-baseline gap-1 relative top-1.5">
                  <h4 className="relative bottom-0.5 text-black">5.0</h4>
                  <img src={assets.star} alt="star-icon" width={18} />
                  <img src={assets.star} alt="star-icon" width={18} />
                  <img src={assets.star} alt="star-icon" width={18} />
                  <img src={assets.star} alt="star-icon" width={18} />
                  <img src={assets.star} alt="star-icon" width={18} />
                </div>
              </div>
              <div className="flex flex-wrap gap-4 mt-3">
                <p className="flex-center gap-x-2 border-r border-slate-900/50 pr-4 font-semibold">
                  <img
                    src={assets.transmission}
                    alt="transmission-icon"
                    width={19}
                  />
                  {car.specs.transmission}
                </p>
                <p className="flex-center gap-x-2 border-r border-slate-900/50 pr-4 font-semibold">
                  <img src={assets.seats} alt="seat-icon" width={19} />
                  {car.specs.seats}
                </p>
                <p className="flex-center gap-x-2 border-r border-slate-900/50 pr-4 font-semibold">
                  <img src={assets.fuelType} alt="fuel-type-icon" width={19} />
                  {car.specs.fuelType}
                </p>
                <p className="flex-center gap-x-2 font-semibold">
                  <img src={assets.odometer} alt="odometer-icon" width={19} />
                  {car.odometer}
                </p>
              </div>
              <div className="mt-6">
                <h4 className="mt-4 mb-1">Car Details</h4>
                <p className="mb-4">{car.description}</p>
              </div>
              <h4 className="mt-4 mb-2">Features</h4>
              <div className="flex gap-3 flex-wrap">
                {car.features.map((feature) => (
                  <p key={feature} className="p-3 py-1 rounded-lg bg-primary">
                    {feature}
                  </p>
                ))}
              </div>
              {/* FORM | CHECK AVAILABILITY */}
              <form
                onSubmit={""}
                className="text-gray-500 bg-primary rounded-lg px-6 py-4 flex flex-col lg:flex-row gap-4 max-w-md lg:max-w-full ring-1 ring-slate-900/10 relative mt-5"
              >
                <div className="flex flex-col w-full">
                  <div className="flex items-center gap-2">
                    <img src={assets.calendar} alt="calendar-icon" width={20} />
                    <label htmlFor="pickUpDate">Pick Up</label>
                  </div>
                  <input
                    type="date"
                    onChange={(e) => setPickUpDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    id="pickUpDate"
                    className="rounded bg-white border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <div className="flex items-center gap-2">
                    <img src={assets.calendar} alt="calendar-icon" width={20} />
                    <label htmlFor="dropOffDate">Drop Off</label>
                  </div>
                  <input
                    type="date"
                    onChange={(e) => setDropOffDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    id="dropOffDate"
                    disabled={!pickUpDate}
                    className="rounded bg-white border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
                  />
                </div>
                <button className="flex-center gap-1 rounded-md btn-solid min-w-44 hover:bg-blue-500 transition-all duration-300">
                  <img
                    src={assets.search}
                    alt="search-icon"
                    width={20}
                    className="invert"
                  />
                  <span>{isAvailable ? "Book Car" : "Check Dates"}</span>
                </button>
              </form>
              {/* Contact Agency */}
              <div className="p-6 bg-primary rounded-xl mt-8 max-w-sm">
                <h4 className="mb-3">For Buying Contact</h4>
                <div className="text-sm sm:w-80 divide-y divide-gray-500/30 ring-1 ring-slate-900/10 rounded">
                  <div className="flex items-start justify-between p-3">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h5>{car.agency.name}</h5>
                        <p className="bg-green-500/20 px-2 py-0.5 rounded-full text-xs text-green-600 border border-green-500/30">
                          Agency
                        </p>
                      </div>
                      <p>Agency Office</p>
                    </div>
                    <img
                      src={car?.agency?.owner?.image}
                      alt="car owner"
                      className="size-10 rounded-full"
                    />
                  </div>
                  <div className="flex-start gap-2 p-1.5">
                    <div className="bg-green-500/20 p-1 rounded-full border border-green-500/30">
                      <img src={assets.phone} alt="phone-icon" width={14} />
                    </div>
                    <p>{car.agency.contact}</p>
                  </div>
                  <div className="flex-start gap-2 p-1.5">
                    <div className="bg-green-500/20 p-1 rounded-full border border-green-500/30">
                      <img src={assets.mail} alt="mail-icon" width={14} />
                    </div>
                    <p>{car.agency.email}</p>
                  </div>
                  <div className="flex items-center divide-x divide-gray-500/30">
                    <button className=" flex items-center justify-center gap-2 w-1/2 py-3 cursor-pointer hover:bg-gray-200 transition-all duration-400">
                      <img src={assets.mail} alt="mail-icon" />
                      Send Email
                    </button>
                    <button className=" flex items-center justify-center gap-2 w-1/2 py-3 cursor-pointer hover:bg-gray-200 transition-all duration-400">
                      <img src={assets.phone} alt="phone-icon" />
                      Call Now
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
            {/* Images - Right Side */}
            <motion.div
              className="flex flex-[4] w-full bg-white p-4 rounded-xl my-4"
              variants={slideRightVariants}
            >
              <CarImages car={car} />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    )
  );
};

export default CarDetails;
