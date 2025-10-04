import React from "react";
import useRideStore from "../Store/useRideStore";

const WaitingForDriver = (props) => {
  const confirmedRide = useRideStore((state) => state.confirmedRide);

  if (!confirmedRide) return null;

  const { pickUp, captain, fare, OTP } = confirmedRide;

  return (
    <div>
      <h5
        onClick={() => {
          props.setWaitingForDriver(false);
        }}
        className="p-1 text-center absolute top-0 w-[93%] cursor-pointer"
      >
        <i className="ri-arrow-down-wide-line text-3xl text-gray-200 cursor-pointer"></i>
      </h5>

      <div className="flex items-center justify-between p-1 mb-3">
        <h3 className="text-2xl font-semibold tracking-tight">
          Meet at the pickup point
        </h3>
        <div className="bg-black py-3 px-4 text-white rounded-bl-2xl rounded-sm">
          <p className="font-bold flex flex-col items-center animate-pulse">
            2 <span className="-mt-1">min</span>
          </p>
        </div>
      </div>
      <div className="w-full border-1 border-gray-300 mb-5"></div>

      <div className="flex items-center justify-between">
        <img src="/images/BlackSUV.webp" alt="uber-suv" className="h-20 mt-1" />
        <div className="text-right">
          <h2 className="text-xl font-medium text-gray-600">
            {captain?.fullName?.firstName} {captain?.fullName?.lastName}
          </h2>
          <h4 className="text-2xl font-semibold -mt-1 -mb-1">
            {captain?.vehicle?.plate}
          </h4>
          <p className="text-lg text-gray-600">BMW X7</p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-2">
        <div className="w-full bg-[#eee] flex flex-col items-start justify-center gap-5 px-4 py-4 rounded-lg mb-5 mt-5">
          <div className="flex items-center gap-5 ">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h4 className="font-medium">{pickUp || "No pickup selected"}</h4>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">
                {fare?.toFixed(2) || "0.00"} €
              </h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <i className="ri-lock-password-fill text-xl"></i>
            <div>
              <h3 className="text-lg font-medium">{OTP || "----"}</h3>
              <p className="text-sm -mt-1 text-gray-600">One-Time Password</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;
