/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import React, { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useUser } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();

  const [cars, setCars] = useState([]);
  const [searchedCities, setSearchedCities] = useState([]);
  const [showAgency, setShowAgency] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { user } = useUser();
  const { getToken } = useAuth();

  const getUser = async () => {
    try {
      const { data } = await axios.get("/api/user", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      if (data.success) {
        setIsOwner(data.role === "agencyOwner");
        setSearchedCities(data.searchedCities || []);
      } else {
        setTimeout(() => {
          getUser();
        }, 6000);
      }
      return data;
    } catch (error) {
      toast.error("Failed to fetch user data");
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  const value = {
    cars,
    setCars,
    searchedCities,
    setSearchedCities,
    showAgency,
    setShowAgency,
    isOwner,
    setIsOwner,
    searchQuery,
    setSearchQuery,
    currency,
    navigate,
    user,
    toast,
    axios,
    getUser,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
