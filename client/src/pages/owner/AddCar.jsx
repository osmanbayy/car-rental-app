import { useUser } from "@clerk/clerk-react";
import React, { useState } from "react";
import { bodyType, fuelTypes, transmission } from "../../lib/carFilterOptions";
import { assets } from "../../assets/data";

const AddCar = () => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  });
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    city: "",
    country: "",
    address: "",
    odometer: "",
    bodyType: "",
    priceRent: "",
    priceSale: "",
    transmission: "",
    seats: "",
    fuelType: "",
    features: {
      "Rear Camera": false,
      "Apple CarPlay": false,
      "Keyless Entry": false,
      "Adaptive Cruise": false,
      "Heated Seats": false,
      Sunroof: false,
      "Parking Assist": false,
      "Cruise Control": false,
    },
  });

  const { user } = useUser();
  const currency = "$";

  return (
    <div className="md:px-8 py-6 xl:py-8 m-1.5 sm:m-3 h-[97vh] overflow-y-scroll lg:w-11/12 bg-white shadow rounded-xl">
      <form className="flex flex-col gap-y-3 px-2 text-sm font-medium xl:max-w-3xl">
        <div className="w-full">
          <h5>Car Name</h5>
          <input
            type="text"
            placeholder="Type Here..."
            className="px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-primary mt-1 w-full outline-none focus-within:ring-2 focus-within:ring-slate-950/20"
          />
        </div>
        <div className="w-full">
          <h5>Car Description</h5>
          <textarea
            rows={5}
            placeholder="Type Here..."
            className="resize-none px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-primary mt-1 w-full outline-none focus-within:ring-2 focus-within:ring-slate-950/20"
          />
        </div>
        <div className="flex gap-4">
          <div className="w-full">
            <h5>City</h5>
            <input
              type="text"
              placeholder="Type Here..."
              className="px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-primary mt-1 w-full outline-none focus-within:ring-2 focus-within:ring-slate-950/20"
            />
          </div>
          <div className="w-full">
            <h5>Country</h5>
            <input
              type="text"
              placeholder="Type Here..."
              className="px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-primary mt-1 w-full outline-none focus-within:ring-2 focus-within:ring-slate-950/20"
            />
          </div>
          <div>
            <h5>Car Type</h5>
            <select className="px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-primary mt-1 w-36 outline-none focus-within:ring-2 focus-within:ring-slate-950/20">
              <option>Select Type</option>
              {bodyType.map((bodyType) => (
                <option value={bodyType}>{bodyType}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex gap-4 flex-wrap w-full">
          <div className="flex-[1]">
            <h5>Address</h5>
            <input
              type="text"
              placeholder="Type Here..."
              className="px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-primary mt-1 w-full outline-none focus-within:ring-2 focus-within:ring-slate-950/20"
            />
          </div>
          <div className="w-34">
            <h5>Odometer</h5>
            <input
              type="number"
              placeholder="e.g. 12.500 (km)"
              className="px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-primary mt-1 w-full outline-none focus-within:ring-2 focus-within:ring-slate-950/20 number-input"
            />
          </div>
        </div>
        <div className="flex gap-4 flex-wrap">
          <div>
            <h5>
              Rent Price <span className="text-xs">/day</span>
            </h5>
            <input
              type="number"
              placeholder="0"
              className="px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-primary mt-1 w-28 outline-none focus-within:ring-2 focus-within:ring-slate-950/20 number-input"
            />
          </div>
          <div>
            <h5>Sale Price</h5>
            <input
              type="number"
              placeholder="0"
              className="w-28 px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-primary mt-1 outline-none focus-within:ring-2 focus-within:ring-slate-950/20 number-input"
            />
          </div>
          <div>
            <h5>Transmission</h5>
            <select className="px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-primary mt-1 w-full outline-none focus-within:ring-2 focus-within:ring-slate-950/20">
              <option>Select Type</option>
              {transmission.map((transmission) => (
                <option value={transmission}>{transmission}</option>
              ))}
            </select>
          </div>
          <div>
            <h5>Seats</h5>
            <input
              type="number"
              placeholder="0"
              className="w-20 px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-primary mt-1 outline-none focus-within:ring-2 focus-within:ring-slate-950/20 number-input"
            />
          </div>
          <div className="w-34">
            <h5>Fuel Type</h5>
            <select className="px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-primary mt-1 w-full outline-none focus-within:ring-2 focus-within:ring-slate-950/20">
              <option>Select Type</option>
              {fuelTypes.map((fuelType) => (
                <option value={fuelType}>{fuelType}</option>
              ))}
            </select>
          </div>
        </div>
        {/* Features */}
        <div className="">
          <h5>Features</h5>
          <div className="flex gap-3 flex-wrap mt-1">
            {Object.keys(inputs.features).map((feature, index) => (
              <div key={index} className="flex gap-1">
                <input
                  id={`feature[${index + 1}]`}
                  type="checkbox"
                  checked={inputs.features[feature]}
                />
                <label htmlFor={`feature[${index + 1}]`}>{feature}</label>
              </div>
            ))}
          </div>
        </div>
        {/* Images */}
        <div className="flex gap-2 mt-2">
          {Object.keys(images).map((key) => (
            <label htmlFor={`carImage[${key + 1}]`} key={key} className="cursor-pointer ring-1 ring-slate-900/10 rounded-md">
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setImages({ ...images, [key]: e.target.files[0] })
                }
                id={`carImage[${key + 1}]`}
                hidden
              />
              <div className="size-24 bg-primary flex-center ">
                <img
                  src={
                    images[key]
                      ? URL.createObjectURL(images[key])
                      : assets.uploadIcon
                  }
                  alt="upload area"
                  className="overflow-hidden object-contain size-24"
                />
              </div>
            </label>
          ))}
        </div>
        <button type="submit" className="btn-solid mt-3 max-w-36" disabled={loading}>
          {loading ? "Adding..." : "Add Car"}
        </button>
      </form>
    </div>
  );
};

export default AddCar;
