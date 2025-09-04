import { create } from "zustand";

const useRideStore = create((set) => ({
  pickUp: "",
  destination: "",
  vehicleType: null,
  fare: null,
  ride: null,
  pickupSuggestions: [],
  destinationSuggestions: [],

  setPickUp: (pickUp) => set({ pickUp }),
  setDestination: (destination) => set({ destination }),
  setVehicleType: (vehicleType) => set({ vehicleType }),
  setFare: (fare) => set({ fare }),
  setRide: (ride) => set({ ride }),
  setPickupSuggestions: (pickupSuggestions) => set({ pickupSuggestions }),
  setDestinationSuggestions: (destinationSuggestions) =>
    set({ destinationSuggestions }),
}));

export default useRideStore;
