import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { profileOfUser } from "../api/userApi";

export const useUserStore = create(
  devtools(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),

      // initialize USER

      initializeUser: async () => {
        const token = localStorage.getItem("User_Token_Key");
        if (!token) return;

        try {
          const data = await profileOfUser();
          set({ user: data?.user || data });
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
          set({ user: null });
        }
      },
    }),
    { name: "UserStore" }
  )
);
