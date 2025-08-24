import React from "react";

const VehiclePanel = (props) => {
  return (
    <div>
      {" "}
      <h5
        onClick={() => props.setVehiclePanelOpen(false)}
        className="p-1 text-center absolute top-0 w-[93%] cursor-pointer"
      >
        {" "}
        <i className="ri-arrow-down-wide-line text-3xl text-gray-200 cursor-pointer"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>
      {/* uber-cuv section for temporary use until api integration */}
      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
          props.setVehiclePanelOpen(false);
        }}
        className="flex border-2 active:border-black rounded-xl items-center justify-between w-full p-3 mb-2 cursor-pointer"
      >
        <img src="/images/BlackSUV.webp" alt="uber-suv" className="h-12" />
        <div className=" w-1/2 ml-2">
          <h4 className="text-base font-medium">
            UberGo{" "}
            <span>
              <i className="ri-user-3-fill"></i>4
            </span>
          </h4>
          <h5 className="text-sm font-medium">2 mins away</h5>
          <p className="text-xs text-gray-500 font-normal">
            Affordable, compact rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">20 €</h2>
      </div>
      {/* uber-bike section for temporary use until api integration */}
      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
          props.setVehiclePanelOpen(false);
        }}
        className="flex border-2 active:border-black rounded-xl items-center justify-between w-full p-3 mb-2 cursor-pointer"
      >
        <img src="/images/Uber-Bike.webp" alt="uber-suv" className="h-12" />
        <div className=" w-1/2 -ml-2">
          <h4 className="text-base font-medium">
            Moto{" "}
            <span>
              <i className="ri-user-3-fill"></i>1
            </span>
          </h4>
          <h5 className="text-sm font-medium">3 mins away</h5>
          <p className="text-xs text-gray-500 font-normal">
            Affordable, motorcycle rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">10 €</h2>
      </div>
    </div>
  );
};

export default VehiclePanel;
