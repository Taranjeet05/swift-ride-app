import React from "react";
import useRideStore from "../Store/useRideStore";

const LookingForDriver = (props) => {
  const pickUp = useRideStore((state) => state.pickUp);
  const destination = useRideStore((state) => state.destination);
  const fare = useRideStore((state) => state.fare);
  const vehicleType = useRideStore((state) => state.vehicleType);

  return (
    <div>
      <h5
        onClick={() => {
          props.setVehicleFound(false);
        }}
        className="p-1 text-center absolute top-0 w-[93%] cursor-pointer"
      >
        {" "}
        <i className="ri-arrow-down-wide-line text-3xl text-gray-200 cursor-pointer"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5 flex items-center">
        Looking for a Driver{" "}
        <span className="ml-2 flex space-x-1">
          <span className="animate-bounce">.</span>
          <span className="animate-bounce [animation-delay:0.2s]">.</span>
          <span className="animate-bounce [animation-delay:0.4s]">.</span>
        </span>
      </h3>

      <div className="flex flex-col items-center justify-between gap-2 ">
        <div className="w-full flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-r from-blue-200 via-blue-50 to-blue-200 shadow-lg">
          <img
            src="/images/LookingDriver-uber.png"
            alt="Uber SUV"
            className="h-32 w-auto object-contain drop-shadow-lg transition-transform duration-1000 ease-out hover:-translate-y-5"
          />
        </div>

        <div className="w-full bg-[#eee] flex flex-col items-start justify-center gap-5 px-4 py-4 rounded-lg mb-5 mt-5">
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
                {fare ? `${fare[vehicleType]} €` : "—"}
              </h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;
