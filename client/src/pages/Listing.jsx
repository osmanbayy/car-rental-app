/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState } from "react";
import Item from "../components/Item";
import { useSearchParams } from "react-router-dom";
import { sortOptions, bodyType, priceRange } from "../lib/carFilterOptions";
import { useAppContext } from "../context/AppContext";

const Listing = () => {
  const { cars, searchQuery, currency } = useAppContext();
  const [selectedFilters, setSelectedFilters] = useState({
    bodyType: [],
    priceRange: [],
  });
  const [selectedSort, setSelectedSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  const [searchParams] = useSearchParams();
  const heroDestination = (searchParams.get("destination") || "")
    .toLowerCase()
    .trim();

  // Toggle Filter Checkboxes
  const handleFilterChange = (checked, value, type) => {
    setSelectedFilters((prev) => {
      const updatedFilters = { ...prev };
      if (checked) {
        updatedFilters[type] = [...updatedFilters[type], value];
      } else {
        updatedFilters[type] = updatedFilters[type].filter(
          (val) => val !== value
        );
      }
      return updatedFilters;
    });
  };

  // Sorting Function
  const sortCars = (a, b) => {
    if (selectedSort === "Low to High") return a.price.sale - b.price.sale;
    if (selectedSort === "High to Low") return b.price.sale - a.price.sale;
    return 0;
  };

  // Price Filters
  const matchesPrice = (car) => {
    if (selectedFilters.priceRange.length === 0) return true;
    return selectedFilters.priceRange.some((range) => {
      const [min, max] = range.split(/[-–to]+/).map((v) => Number(v.trim()));
      return car.price.sale >= min && car.price.sale <= max;
    });
  };

  // Car Type Filters
  const matchesType = (car) => {
    if (selectedFilters.bodyType.length === 0) return true;
    return selectedFilters.bodyType.includes(car.bodyType);
  };

  // Search filter
  const matchesSearch = (car) => {
    if (!searchQuery) return true;
    return (
      car.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.country.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Hero Destination filter
  const matchesHeroDestination = (car) => {
    if (!heroDestination) return true;
    return (car.city || "").toLowerCase().includes(heroDestination);
  };

  // Filtered & Sorted Cars
  const filteredCars = useMemo(() => {
    return cars
      .filter(
        (car) =>
          matchesType(car) &&
          matchesPrice(car) &&
          matchesSearch(car) &&
          matchesHeroDestination(car)
      )
      .sort(sortCars);
  }, [cars, selectedFilters, selectedSort, searchQuery, heroDestination]);

  // Handle  Pagination Logic
  const getPaginatedCars = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredCars.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(filteredCars.length / itemsPerPage);

  return (
    <div className="bg-primary">
      <div className="max-padd-container !px-0 mt-18 pb-16">
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Filters - Left Side */}
          <div className="min-w-72 bg-white p-4 pl-6 lg:pl-12 rounded-r-xl my-4">
            {/* Sort by Price */}
            <div className="py-3">
              <h5 className="mb-3">Sort By</h5>
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="bg-primary ring-1 ring-slate-900/10 outline-none text-sm font-semibold text-gray-50 h-8 w-full rounded px-2"
              >
                {sortOptions.map((sort, index) => (
                  <option key={index} value={sort}>
                    {sort}
                  </option>
                ))}
              </select>
            </div>

            {/* Car Type */}
            <div className="p-5 mt-5 bg-primary rounded-xl">
              <h5 className="mb-3">Car Type</h5>
              {bodyType.map((type) => (
                <label
                  key={type}
                  className="flex gap-2 text-sm font-semibold text-gray-50 mb-1"
                >
                  <input
                    type="checkbox"
                    checked={selectedFilters.bodyType.includes(type)}
                    onChange={(e) =>
                      handleFilterChange(e.target.checked, type, "bodyType")
                    }
                  />
                  {type}
                </label>
              ))}
            </div>

            {/* Price Range */}
            <div className="p-5 mt-5 bg-primary rounded-xl">
              <h5 className="mb-3">Price Range</h5>
              {priceRange.map((price) => (
                <label
                  key={price}
                  className="flex gap-2 text-sm font-semibold text-gray-50 mb-1"
                >
                  <input
                    type="checkbox"
                    checked={selectedFilters.priceRange.includes(price)}
                    onChange={(e) =>
                      handleFilterChange(e.target.checked, price, "priceRange")
                    }
                  />
                  {currency}
                  {price}
                </label>
              ))}
            </div>
          </div>

          {/* Filtered Cars - Right Side */}
          <div className="max-sm:px-10 sm:pr-10 bg-white p-4 rounded-l-xl my-4 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {getPaginatedCars().length > 0 ? (
                getPaginatedCars().map((car) => (
                  <Item key={car._id} car={car} />
                ))
              ) : (
                <p className="capitalize">No Cars Found for selected filters</p>
              )}
            </div>
            {/* Pagination */}
            {getPaginatedCars().length > 0 && (
              <div className="flex-center mt-10 mb-6 gap-3">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className={`btn-solid !py-1 !px-3 ${
                    currentPage === 1 &&
                    "opacity-50 !cursor-not-allowed pointer-events-none"
                  }`}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`btn-outline size-8 p-0 flex-center ${
                      currentPage === index + 1 && "btn-light"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className={`btn-solid !py-1 !px-3 ${
                    currentPage === totalPages &&
                    "opacity-50 !cursor-not-allowed pointer-events-none"
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listing;
