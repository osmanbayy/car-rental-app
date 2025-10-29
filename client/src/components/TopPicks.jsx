/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { assets } from "../assets/data";
import Title from "./Title";
import Item from "./Item";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useAppContext } from "../context/AppContext";

const TopPicks = () => {
  const [topPicks, setTopPicks] = useState([]);
  const { cars, searchedCities } = useAppContext();

  useEffect(() => {
    const data = cars.filter((car) => searchedCities.includes(car.city));
    setTopPicks(data);
  }, [cars]);

  return (
    <>
      {searchedCities.length > 0 && (
        <section className="max-padd-container py-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Title
              title1={"Top picks for you"}
              title2={"Popular in your area"}
              titleStyles={"mb-10"}
            />
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
            {topPicks.slice(0, 6).map((car) => (
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
      )}
    </>
  );
};

export default TopPicks;
