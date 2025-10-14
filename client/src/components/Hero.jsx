import React from "react";
import { motion } from "framer-motion";
import { assets, cities } from "../assets/data";

const Hero = () => {
  return (
    <section className="bg-primary">
      {/* Container */}
      <div className="max-padd-container relative flex justify-end mx-auto flex-col gap-9 py-6 pt-32 z-10">
        {/* Content */}
        <motion.div
          className="flex-center flex-col gap-y-6"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="text-center max-w-5xl">
            <h1 className="capitalize leading-tight">
              Explore{" "}
              <span className="bg-gradient-to-r from-solid to-primary pl-1 rounded-md">
                Premium Vehicles
              </span>{" "}
              Available In Exciting Destinations.
            </h1>
          </div>
          {/* Search / Booking Form */}
          <form className="bg-white text-gray-500 rounded-md md:rounded-full px-6 py-4 md:pl-12 flex flex-col md:flex-row gap-4 lg:gap-x-8 max-w-md md:max-w-4xl ring-1 ring-slate-900/5 relative">
            <div className="flex flex-col w-full">
              <div className="flex items-center gap-2">
                <img src={assets.pin} alt="location-icon" width={20} />
                <label htmlFor="destinationInput">Destination</label>
              </div>
              <input
                list="destinations"
                id="destinationInput"
                type="text"
                className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none capitalize"
                placeholder="Type here"
                required
              />
              <datalist id="destinations">
                {cities.map((city, index) => (
                  <option value={city} key={index} />
                ))}
              </datalist>
            </div>

            <div className="flex flex-col w-full">
              <div className="flex items-center gap-2">
                <img src={assets.calendar} alt="calendar-icon" width={20} />
                <label htmlFor="pickUp">Pick Up</label>
              </div>
              <input
                id="pickUp"
                type="date"
                className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
              />
            </div>

            <div className="flex flex-col w-full">
              <div className="flex items-center gap-2">
                <img src={assets.calendar} alt="calendar-icon" width={20} />
                <label htmlFor="dropOff">Drop Off</label>
              </div>
              <input
                id="dropOff"
                type="date"
                className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
              />
            </div>

            <button type="submit" className="flex-center gap-1 rounded-md md:rounded-full bg-solid text-white py-2 md:py-5 px-8 my-auto max-md:w-full max-md:py-1 cursor-pointer hover:bg-blue-500 transition">
              <img src={assets.search} alt="search-icon" width={20} className="invert" />
              <span>Search</span>
            </button>
          </form>
        </motion.div>
        <motion.div
          className="flex-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <img
            src={assets.bg}
            alt="hero-image"
            className="w-full max-w-[77%]"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
