import { create } from "zustand";

const useRideStore = create((set) => ({
  pickUp: "",
  destination: "",
  vehicleType: null,
  fare: null,
  ride: null,
  pickupSuggestions: [],
  destinationSuggestions: [],
  activeField: "pickUp", // to track which input is active

  setPickUp: (pickUp) => set({ pickUp }),
  setDestination: (destination) => set({ destination }),
  setVehicleType: (vehicleType) => set({ vehicleType }),
  setFare: (fare) => set({ fare }),
  setRide: (ride) => set({ ride }),
  setPickupSuggestions: (pickupSuggestions) => set({ pickupSuggestions }),
  setDestinationSuggestions: (destinationSuggestions) =>
    set({ destinationSuggestions }),
  setActiveField: (field) => set({ activeField: field }),
}));

export default useRideStore;
