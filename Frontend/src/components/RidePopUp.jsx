import React from "react";
import { useCaptainStore } from "../Store/useCaptainStore";
import { confirmRide } from "../api/mapApi";

const RidePopUp = (props) => {
  const clearCurrentRide = useCaptainStore((state) => state.clearCurrentRide);
  const currentRide = useCaptainStore((state) => state.currentRide);
  const { captain } = useCaptainStore();

  if (!currentRide) {
    return (
      <div className="p-4">
        <p className="text-gray-500 text-center">No active ride available</p>
      </div>
    );
  }

  const handleConfirmRide = async () => {
    try {
      const ride = await confirmRide({
        rideId: currentRide._id,
        captainId: captain?._id,
      });
      console.log("Ride confirmed:", ride);
    } catch (error) {
      console.error("Failed: to confirm Ride", error.message);
    }
  };

  return (
    <div>
      <h5
        onClick={() => {
          props.setRidePopUpPanel(false);
        }}
        className="p-1 text-center absolute top-0 w-[93%] cursor-pointer"
      >
        <i className="ri-arrow-down-wide-line text-3xl text-gray-200 cursor-pointer"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-6">New Ride Available!</h3>

      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-slate-900 via-rose-700 to-amber-500 rounded-lg">
        <div className="flex items-center justify-start gap-4">
          <img
            className="h-20 w-16 rounded-full object-cover"
            src="https://images.pexels.com/photos/1499327/pexels-photo-1499327.jpeg?_gl=1*wj7m17*_ga*MzI3Mjk4ODA4LjE3NTYzOTAyNzg.*_ga_8JE65Q40S6*czE3NTYzOTAyNzckbzEkZzEkdDE3NTYzOTA2NzAkajQ4JGwwJGgw"
            alt="Passenger profile picture"
          />
          <h2 className="text-xl text-gray-100 drop-shadow-md font-medium">
            {currentRide?.user?.fullName?.firstName}{" "}
            {currentRide?.user?.fullName?.lastName}
          </h2>
        </div>
        <div className="bg-gray-900 py-2 px-4 text-white rounded-bl-3xl rounded-sm shadow-md ring-1 ring-gray-700">
          <p className="font-bold text-lg flex flex-col items-center">
            2.2 <span className="-mt-1">Km</span>
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-2">
        <div className="w-full bg-[#eee] flex flex-col items-start justify-center gap-5 px-4 py-4 rounded-lg mb-5 mt-5">
          <div className="flex items-center gap-5 ">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h4 className="font-medium">
                {currentRide?.pickUp || "No pickup selected"}
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h4 className="font-medium">
                {currentRide?.destination || "No pickup selected"}
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">{currentRide?.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>

        <div className="w-full flex items-center justify-evenly gap-4">
          <button
            onClick={() => {
              clearCurrentRide();
              props.setRidePopUpPanel(false);
            }}
            className="flex-1 bg-gray-300 hover:bg-gray-400 transition cursor-pointer text-gray-700 font-semibold p-2 rounded-lg mt-1"
          >
            Ignore Ride
          </button>
          <button
            onClick={() => {
              handleConfirmRide();
              props.setRidePopUpPanel(false);
              props.setConfirmRidePopUpPanel(true);
            }}
            className="flex-1 bg-green-600 hover:bg-green-700 transition cursor-pointer text-white font-semibold p-2 rounded-lg mt-1"
          >
            Accept Ride
          </button>
        </div>
      </div>
    </div>
  );
};

export default RidePopUp;
