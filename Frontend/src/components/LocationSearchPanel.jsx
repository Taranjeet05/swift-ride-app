import React from "react";

const LocationSearchPanel = (props) => {
  const locations = [
    "Josef-ref.str-701, coding Village, Coding test town",
    "ParkSide Ave, Greenfield, Metro City",
    "Sunset Blvd, Downtown, Urban-Classic",
    "Maple Street, Riverside, LakeView",
    "OakWood Lane, Hilltop, Summit City",
    "Central Plaza, Midtown, Capital Town",
    "Willow Road, EastSide, BrookField",
    "PineCrest Drive, West End, SilverLake",
  ];

  return (
    <div className="overflow-y-auto h-full">
      {/* this is just a sample data for location search panel */}

      {locations.map((location, index) => (
        <div
          onClick={() => {
            props.setVehiclePanelOpen(true);
            props.setPanelOpen(false);
          }}
          key={index}
          className="flex items-center justify-start border-2 border-gray-50 active:border-black p-3 rounded-xl gap-4 my-2 cursor-pointer "
        >
          <h2 className="bg-[#eee] p-2 rounded-full h-10 w-12 flex items-center justify-center">
            <i className="ri-map-pin-fill"></i>
          </h2>
          <h4 className="font-medium">{location}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
