import React from "react";
import { useCaptainStore } from "../Store/useCaptainStore";

const CaptainDetail = () => {
  const captain = useCaptainStore((state) => state.captain);

  if (!captain) {
    return <p className="text-gray-500">Loading captain details...</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-3">
          <img
            className="h-20 w-16 rounded-full object-cover"
            src="https://cdn.pixabay.com/photo/2024/06/22/23/01/boy-8847075_640.jpg"
            alt=""
          />
          <h2 className="text-lg font-medium">
            {captain?.fullName?.firstName} {captain?.fullName?.lastName}
          </h2>
        </div>

        <div>
          <h5 className="text-xl font-semibold">250 €</h5>
          <p className="text-sm font-medium text-gray-600">Earned</p>
        </div>
      </div>

      <div className="flex p-3 mt-6 bg-gray-100 rounded-xl justify-center gap-5">
        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-timer-2-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-800">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-speed-up-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-800">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-booklet-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-800">Hours Online</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetail;
