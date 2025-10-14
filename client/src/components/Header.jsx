import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { assets } from "../assets/data";
import Navbar from "./Navbar";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [active, setActive] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const location = useLocation();

  const isHomePage = location.pathname.endsWith("/");

  const toggleMenu = () => setMenuOpened((prev) => !prev);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setActive(true);
      } else {
        setActive(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  return (
    <header
      className={`${active ? "bg-white shadow-sm py-2" : "py-3"} ${
        !isHomePage && "bg-white"
      } fixed top-0 w-full left-0 right-0 z-50 transition-all duration-200`}
    >
      <div className="max-padd-container">
        {/* Container */}
        <div className="flex-between">
          {/* Logo */}
          <div className="flex flex-1">
            <Link to="/">
              <img src={assets.logoImg} alt="logo" width={88} className="h-7" />
              <span className="text-text uppercase text-xs font-extrabold tracking-[6px] relative bottom-1">
                Rentigo
              </span>
            </Link>
          </div>
          {/* Navbar */}
          <Navbar
            containerStyles={
              menuOpened
                ? "flex items-start flex-col gap-y-4 fixed top-16 right-6 p-5 bg-white shadow-md w-52 ring-1 ring-slate-900/5 rounded-xl z-50"
                : "hidden lg:flex gap-x-5 xl:gap-x-1 text-sm font-semibold p-1"
            }
            setMenuOpened={setMenuOpened}
          />
          {/* Buttons, SearchBar & Profile */}
          <div className="flex sm:flex-1 items-center sm:justify-end gap-x-3 sm:gap-x-4">
            {/* SearchBar */}
            <div className="relative hidden xl:flex items-center">
              {/* Input */}
              <div
                className={`transition-all duration-300 ease-in-out ring-1 ring-slate-900/10 rounded-full overflow-hidden ${
                  showSearch
                    ? "w-[266px] opacity-100 px-4 py-2 bg-white"
                    : "w-11 opacity-0 px-0 py-0"
                }`}
              >
                <input
                  type="text"
                  className="w-full text-sm outline-none pr-10 placeholder:text-gray-400"
                  placeholder="Search Here..."
                />
              </div>
              {/* Toggle Button */}
              <div
                className="absolute right-0 ring-1 ring-slate-900/10 bg-white p-[8px] rounded-full cursor-pointer z-10"
                onClick={() => setShowSearch((prev) => !prev)}
              >
                <img src={assets.search} alt="search" />
              </div>
            </div>
            {/* Menu Toggle */}
            <>
              {menuOpened ? (
                <img
                  onClick={toggleMenu}
                  src={assets.close}
                  alt="close"
                  className="lg:hidden cursor-pointer text-xl transition-all duration-500 ease-in-out rotate-90"
                />
              ) : (
                <img
                  onClick={toggleMenu}
                  src={assets.menu}
                  alt="menu"
                  className="lg:hidden cursor-pointer text-xl transition-all duration-500 ease-in-out"
                />
              )}
            </>
            {/* User Profile */}
            <div>
              <div>
                <button className="btn-solid bg-black flex-center gap-2 rounded-full">
                  Login
                  <img src={assets.user} alt="user-icon" width={20} className="invert" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
