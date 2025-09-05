import React from "react";
import useRideStore from "../Store/useRideStore";

const LocationSearchPanel = () => {
  const {
    pickupSuggestions,
    destinationSuggestions,
    setPickUp,
    setDestination,
    activeField,
  } = useRideStore();

  const suggestion =
    activeField === "pickUp" ? pickupSuggestions : destinationSuggestions;

  return (
    <div className="overflow-y-auto h-full mt-7">
      {/* this is just a sample data for location search panel */}

      {suggestion.length === 0 ? (
        <p className="text-center font-semibold leading-tight">
          No Suggestions found
        </p>
      ) : (
        suggestion.map((location, index) => (
          <div
            onClick={() => {
              if (activeField === "pickUp") {
                setPickUp(location);
              } else {
                setDestination(location);
              }
            }}
            key={index}
            className="flex items-center justify-start border-2 border-gray-50 active:border-black p-3 rounded-xl gap-4 my-2 cursor-pointer "
          >
            <h2 className="bg-[#eee] p-2 rounded-full h-10 w-12 flex items-center justify-center">
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className="font-medium">{location}</h4>
          </div>
        ))
      )}
    </div>
  );
};

export default LocationSearchPanel;
