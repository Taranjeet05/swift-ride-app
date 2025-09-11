import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { profileOfCaptain } from "../api/captainApi";

export const useCaptainStore = create(
  devtools(
    (set) => ({
      captain: null,
      setCaptain: (captain) => set({ captain }),
      clearCaptain: () => set({ captain: null }),

      // initialize CAPTAIN
      initializeCaptain: async () => {
        // we need to check if token is there is not token we need to stop
        //then we need to get the profileOfCaptain
        // then set captain with that data
        const token = localStorage.getItem("token", token);
        if (!token) return;

        try {
          const data = await profileOfCaptain();
          set({ captain: data?.captain || data });
        } catch (error) {
          console.log("Failed to fetch Captain Profile", error);
          set({ Captain: null });
        }
      },
    }),
    { name: "CaptainStore" }
  )
);
