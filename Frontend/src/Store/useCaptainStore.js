import { create } from "zustand";

export const useCaptainStore = create((set) => ({
  captain: null,
  setCaptain: (captain) => set({ captain }),
  clearCaptain: () => set({ captain: null }),
}));
