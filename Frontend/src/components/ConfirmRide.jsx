import React from "react";
import useRideStore from "../Store/useRideStore";

const ConfirmRide = (props) => {
  const pickUp = useRideStore((state) => state.pickUp);
  const destination = useRideStore((state) => state.destination);
  const fare = useRideStore((state) => state.fare);
  const vehicleType = useRideStore((state) => state.vehicleType);

  const vehicleImage =
    vehicleType === "motorcycle"
      ? "/images/Uber-Bike.webp"
      : "/images/BlackSUV.webp";

  return (
    <div>
      <h5
        onClick={() => {
          props.setConfirmRidePanel(false);
        }}
        className="p-1 text-center absolute top-0 w-[93%] cursor-pointer"
      >
        {" "}
        <i className="ri-arrow-down-wide-line text-3xl text-gray-200 cursor-pointer"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Confirm Your Ride</h3>

      <div className="flex flex-col items-center justify-between gap-2">
        <img
          src={vehicleImage}
          alt={vehicleType || "vehicle"}
          className="h-30 mt-1"
        />

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

        <button
          onClick={() => {
            props.setVehicleFound(true);
            props.setConfirmRidePanel(false);
          }}
          className="w-full bg-green-600 cursor-pointer text-white font-semibold p-2 rounded-lg mt-1"
        >
          Confirm Ride
        </button>
      </div>
    </div>
  );
};

export default ConfirmRide;
