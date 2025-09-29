import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { profileOfCaptain } from "../api/captainApi";

export const useCaptainStore = create(
  devtools(
    (set) => ({
      captain: null,
      setCaptain: (captain) => set({ captain }),
      clearCaptain: () => set({ captain: null }),

      // Ride state
      currentRide: null,
      setCurrentRide: (ride) => set({ currentRide: ride }),
      clearCurrentRide: () => set({ currentRide: null }),

      // initialize CAPTAIN
      initializeCaptain: async () => {
        const token = localStorage.getItem("Captain_Token_Key");
        if (!token) return;

        try {
          const data = await profileOfCaptain();
          set({ captain: data?.captain || data });
        } catch (error) {
          console.log("Failed to fetch Captain Profile", error);
          set({ captain: null });
        }
      },
    }),
    { name: "CaptainStore" }
  )
);
