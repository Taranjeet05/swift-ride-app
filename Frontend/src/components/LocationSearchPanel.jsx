import React from "react";

const LocationSearchPanel = () => {
  return (
    <div className="overflow-y-auto h-full">
      {/* this is just a sample data for location search panel */}

      <div className="flex items-center justify-start gap-4 my-4 ">
        <h2 className="bg-[#eee] p-2 rounded-full h-10 w-12 flex items-center justify-center">
          <i className="ri-map-pin-fill"></i>
        </h2>
        <h4 className="font-medium">Josef-ref.str-701, coding Village, Coding test town</h4>
      </div>

      <div className="flex items-center justify-start gap-4 my-4">
        <h2 className="bg-[#eee] p-2 rounded-full h-10 w-12 flex items-center justify-center">
          <i className="ri-map-pin-fill"></i>
        </h2>
        <h4 className="font-medium">Josef-ref.str-701, coding Village, Coding test town</h4>
      </div>


    </div>
  );
};

export default LocationSearchPanel;
