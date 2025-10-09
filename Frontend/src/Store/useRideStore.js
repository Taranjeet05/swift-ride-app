import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const useRideStore = create(
  devtools(
    persist(
      (set) => ({
        pickUp: "",
        destination: "",
        vehicleType: null,
        fare: null,
        ride: null,
        pickupSuggestions: [],
        destinationSuggestions: [],
        activeField: "pickUp",

        confirmedRide: null,

        setPickUp: (pickUp) => set({ pickUp }),
        setDestination: (destination) => set({ destination }),
        setVehicleType: (vehicleType) => set({ vehicleType }),
        setFare: (fare) => set({ fare }),
        setRide: (ride) => set({ ride }),
        setPickupSuggestions: (pickupSuggestions) => set({ pickupSuggestions }),
        setDestinationSuggestions: (destinationSuggestions) =>
          set({ destinationSuggestions }),
        setActiveField: (field) => set({ activeField: field }),
        setConfirmedRide: (ride) => set({ confirmedRide: ride }),
      }),
      {
        name: "ride-storage",
      }
    )
  )
);

export default useRideStore;
