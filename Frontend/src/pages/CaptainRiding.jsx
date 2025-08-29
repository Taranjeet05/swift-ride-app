import React from "react";
import CaptainLogout from "../components/CaptainLogout";

const CaptainRiding = () => {
  return (
    <div className="h-screen">
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
        <img src="images/uber.svg" alt="uber-log" className="w-16" />
        <CaptainLogout />
      </div>

      <div className="h-4/5">
        <img
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="uber-map"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="h-1/5 flex items-center justify-between p-6 relative bg-stone-200">
        <h5 className="p-1 text-center absolute top-0 w-[80%] cursor-pointer">
          <i className="ri-arrow-down-wide-line text-3xl text-gray-400 cursor-pointer"></i>
        </h5>
        <h4 className="text-xl font-semibold">4 km away</h4>
        <button className="bg-green-600 hover:bg-green-700 transition cursor-pointer text-white font-semibold px-4 py-2 rounded-xl shadow-md">
          Complete Ride
        </button>
      </div>
    </div>
  );
};

export default CaptainRiding;
