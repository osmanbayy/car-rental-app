/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { assets, cities } from "../assets/data";
import Title from "./Title";
import Item from "./Item";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useAppContext } from "../context/AppContext";

const FeaturedCars = () => {
  const [featuredCars, setFeaturedCars] = useState([]);
  const { cars } = useAppContext();

  useEffect(() => {
    const data = cars.filter((car) => cities.includes(car.city));
    setFeaturedCars(data);
  }, [cars]);

  return (
    <section className="max-padd-container py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Title
          title1={"Your Next Car Awaits"}
          title2={"Start Driving With Ease"}
          titleStyles={"mb-10"}
        />
        <div className="flex-between mt-8 mb-6">
          <h5>
            <span className="font-bold">Displaying 1-6</span> from 3k listing
          </h5>
          <Link
            to={"/listing"}
            onClick={() => scrollTo(0, 0)}
            className="bg-solid text-white text-2xl rounded-md p-2 flex-center"
          >
            <img src={assets.sliders} alt="filter-icon" className="invert" />
          </Link>
        </div>
      </motion.div>
      {/* Container */}
      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          600: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1124: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1300: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        modules={[Autoplay]}
        className="h-[488px] md:h-[533px] xl:h-[422px] mt-5"
      >
        {featuredCars.slice(0, 6).map((car) => (
          <SwiperSlide key={car._id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Item car={car} />
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default FeaturedCars;
