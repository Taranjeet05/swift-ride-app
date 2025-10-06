import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useRideStore from "../Store/useRideStore";
import { useSocketStore } from "../Store/useSocketStore";
import { useNavigate } from "react-router-dom";

const Riding = () => {
  const navigate = useNavigate();

  const { onEvent, isConnected } = useSocketStore();
  const confirmedRide = useRideStore((state) => state.confirmedRide);

  const initSocket = useSocketStore((state) => state.initSocket);

  const { pickUp, captain, fare, destination } = confirmedRide;
  useEffect(() => {
    initSocket();
  }, [initSocket]);

  useEffect(() => {
    if (!isConnected) return;

    console.log("🟢 Listening for ride-ended...");
    const cleanup = onEvent("ride-ended", (data) => {
      console.log("🚗 Ride Ended Event Received:", data);
      navigate("/home");
    });

    return () => cleanup && cleanup();
  }, [isConnected, navigate, onEvent]);

  if (!confirmedRide) return null;
  return (
    <div className="h-screen flex flex-col">
      <Link
        to="/home"
        className="fixed right-2 top-3 h-10 w-10 bg-white flex items-center justify-center rounded-full"
      >
        <i className="ri-home-4-line text-lg font-bold"></i>
      </Link>

      {/* Map Section */}
      <div className="h-1/2 w-full">
        {/* uber map image for temporary use until api integration */}
        <img
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="uber-map"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Info Section */}
      <div className="flex-1 w-full px-4 py-4 flex flex-col justify-between">
        {/* Vehicle Image */}
        <div className="flex items-center justify-between mb-5">
          <img
            src="/images/BlackSUV.webp"
            alt="uber-suv"
            className="h-20 mt-1"
          />
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
        {/* Pickup & Payment Info Card */}
        <div className="w-full bg-[#eee] flex flex-col gap-5 px-4 py-4 rounded-lg mb-5 mt-5">
          <div className="flex items-center gap-5 ">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h4 className="font-medium">{pickUp || "No pickup selected"}</h4>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h4 className="font-medium">
                {destination || "No destination selected"}
              </h4>
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
        </div>
        {/* Payment Button */}
        <button className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg">
          Make a Payment
        </button>
      </div>
    </div>
  );
};

export default Riding;
