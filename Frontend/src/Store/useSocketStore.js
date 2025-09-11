import { create } from "zustand";
import { io } from "socket.io-client";

export const useSocketStore = create((set, get) => ({
  socket: null,
  isConnected: false,

  connect: () => {
    if (get().socket) return; // prevent multiple connections

    const socket = io(import.meta.env.VITE_BASE_URL, {
      transports: ["websockets"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
    });

    socket.on("connect", () => {
      console.log("✅ connected to socket:", socket.id);
      set({ isConnected: true });
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnect from socket");
      set({ isConnected: false });
    });

    set({ socket });
  },

  disconnect: () => {
    const socket = get().socket;
    if (socket) {
      socket.disconnect();
      set({ socket: null, isConnected: false });
    }
  },
}));
