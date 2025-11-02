import React, { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";

const Processing = () => {
  const { navigate } = useAppContext();
  const { nextUrl } = useParams();

  useEffect(() => {
    if (nextUrl) {
      setTimeout(() => {
        navigate(`/${nextUrl}`);
      }, 8000);
    }
  }, [nextUrl]);
  return (
    <div className="flex-center h-screen">
      <div className="animate-spin rounded-full size-24 border-4 border-gray-300 border-t-solid" />
    </div>
  );
};

export default Processing;
