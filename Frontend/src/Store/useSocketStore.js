import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { io } from "socket.io-client";

export const useSocketStore = create(
  devtools((set, get) => ({
    socket: null,
    isConnected: false,

    // initialize socket connection
    initSocket: () => {
      if (get().socket) return;
      const socket = io(import.meta.env.VITE_BASE_URL, {
        transports: ["websocket"],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 2000,
      });

      socket.on("connect", () => {
        console.log("✨ connected:", socket.id);
        set({ isConnected: true });
      });

      socket.on("disconnect", () => {
        console.log("❌🔴❌ Disconnected from server");
        set({ isConnected: false });
      });

      set({ socket });
    },

    // join event (for User and Captain). 👤👤
    join: (userId, userType) => {
      const socket = get().socket;
      if (!socket) return;

      socket.emit("join", { userId, userType });
    },

    // Listen to any custom event
    onEvent: (event, callback) => {
      const socket = get().socket;

      if (!socket) return () => {};
      socket.on(event, callback);

      // return cleanUp function so we can remove the listener
      return () => socket.off(event, callback);
    },

    // Emit any custom event
    emitEvent: (event, data) => {
      const socket = get().socket;
      if (!socket) return;

      socket.emit(event, data);
    },

    // close connection when user or captain logout

    disconnect: () => {
      const socket = get().socket;
      if (!socket) return;

      socket.disconnect();
      set({ socket: null, isConnected: false });
    },
  }))
);
