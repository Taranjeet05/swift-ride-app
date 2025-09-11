import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useCaptainStore = create(
  devtools(
    (set) => ({
      captain: null,
      setCaptain: (captain) => set({ captain }),
      clearCaptain: () => set({ captain: null }),
    }),
    { name: "CaptainStore" }
  )
);
