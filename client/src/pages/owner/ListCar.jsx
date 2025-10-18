import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { dummyCars } from "../../assets/data";

const ListCar = () => {
  const [cars, setCars] = useState([]);
  const currency = "$";

  const { user } = useUser();

  const getCars = async () => {
    setCars(dummyCars);
  };

  useEffect(() => {
    if (user) {
      getCars();
    }
  }, [user]);

  return (
    <div className="md:px-8 py-6 xl:py-8 m-1 sm:m-3 h-[97vh] overflow-y-scroll lg:w-11/12 bg-white shadow rounded-xl">
      {/* All Cars */}
      <div className="mt-4">
        <div className="flex justify-between flex-wrap gap-2 sm:grid grid-cols-[2fr_2fr_1fr_1fr] lg:grid-cols-[0.5fr_2fr_2fr_1fr_1fr] px-6 py-3 bg-solid text-white border-b-1 border-slate-900/10 rounded-t-xl">
          <h5 className="hidden lg:block">Index</h5>
          <h5>Name</h5>
          <h5>Address</h5>
          <h5>Price</h5>
          <h5>Available</h5>
        </div>
        <div>
          {cars?.map((car, index) => (
            <div
              key={index}
              className="flex justify-between items-center flex-wrap gap-2 sm:grid grid-cols-[2fr_2fr_1fr_1fr] lg:grid-cols-[0.5fr_2fr_2fr_1fr_1fr] px-6 py-3 text-sm font-semibold bg-primary text-gray-50 border-b-1 border-slate-900/10"
            >
              <div className="hidden lg:block">{index + 1}</div>
              <div className="flex-start gap-x-2 max-w-64">
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={car.images[0]}
                    alt={car.title}
                    className="w-16 rounded-lg"
                  />
                </div>
                <div className="line-clamp-2">{car.title}</div>
              </div>
              <div>{car.address}</div>
              <div>
                {currency}
                {car.price.sale}
              </div>
              <div>
                <label htmlFor="" className="relative inline-flex items-center gap-3 cursor-pointer text-gray-900">
                  <input type="checkbox" className="sr-only peer" defaultChecked={car.isAvailable} />
                  <div className="w-10 h-6 bg-slate-300 rounded-full peer peer-checked:bg-solid transition-colors duration-200" />
                  <span className="absolute left-1 top-1 size-4 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-4" />
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListCar;
