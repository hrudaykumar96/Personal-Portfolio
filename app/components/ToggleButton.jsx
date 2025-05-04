"use client";

import React, { useState } from "react";
import { CiLight, CiDark } from "react-icons/ci";
import { useData } from "../context/contextProvider";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "../effects/LoadingSpinner";

const ToggleButton = () => {
  const { theme, setTheme } = useData(null);
  const [loading, setLoading] = useState(false);

  const changeTheme = async (mode) => {
    setLoading(true);
    const response = await axios.post("/api/toggletheme", { mode });
    if (response?.data?.success) {
      setTheme(mode);
      setLoading(false);
      toast.success(response?.data?.success);
    } else {
      setLoading(false);
      toast.error("Failed to activate theme");
    }
  };

  if(loading) return (<LoadingSpinner/>)

  return (
    <>

        <div
          className={`z-50 fixed top-20 right-0 p-2 flex justify-center items-center transition-all duration-300 ${
            theme === "light" ? "text-black" : "text-white"
          }`}
        >
          <button
            type="button"
            onClick={() => changeTheme(theme === "light" ? "dark" : "light")}
            className={`${
              theme === "light" ? "bg-white text-gray-900" : "bg-gray-900 text-white"
            } w-12 h-12 flex items-center justify-center rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl`}
          >
            {theme === "light" ? (
              <CiLight className="text-2xl" />
            ) : (
              <CiDark className="text-2xl" />
            )}
          </button>
        </div>

    </>
  );
};

export default ToggleButton;