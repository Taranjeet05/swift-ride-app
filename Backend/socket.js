import { Server } from "socket.io";
import userModel from "./models/user.model.js";
import captainModel from "./models/captain.model.js";

let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`Client Connected 🫶✨: ${socket.id}`);

    // user or captain joins

    socket.on("join", async (data) => {
      const { userId, userType } = data;

      let updatedDoc;
      try {
        if (userType === "user") {
          updatedDoc = await userModel.findByIdAndUpdate(
            userId,
            {
              socketId: socket.id,
            },
            { new: true }
          );
        } else if (userType === "captain") {
          updatedDoc = await captainModel.findByIdAndUpdate(
            userId,
            {
              socketId: socket.id,
            },
            { new: true }
          );
        }
        if (!updatedDoc) {
          console.warn(`${userType} with ID ${userId} is not found in DB`);
        }
        console.log(`${userType} ${userId} is joined with socket ${socket.id}`);
      } catch (error) {
        console.error(`Error in join event ${error}`);
      }
    });

    // Update Captains Location
    socket.on("update-location-captain", async (data) => {
      const { userId, location } = data;
      if (!location || !location.lat || !location.lng) {
        return socket.emit("error", { message: "Invalid location data" });
      }

      try {
        const captain = await captainModel.findByIdAndUpdate(
          userId,
          {
            location: {
              lat: location.lat,
              lng: location.lng,
            },
          },
          { new: true }
        );

        if (captain) {
          // confirm update to the captain
          socket.emit("location-updated", { location });
        }
        // broadcasting to users (for example all users looking for rides)
        io.emit("captain-location-changed", {
          captainId: userId,
          location,
        });
      } catch (error) {
        console.error(`Error updating the location ${error}`);
      }
    });

    socket.on("disconnect", async () => {
      console.log(`Client Disconnected ${socket.id}`);
      try {
        await userModel.updateOne(
          { socketId: socket.id },
          { $unset: { socketId: 1 } }
        );
        await captainModel.updateOne(
          { socketId: socket.id },
          { $unset: { socketId: 1 } }
        );
      } catch (error) {
        console.error("Error cleaning up socket on disconnect:", error);
      }
    });
  });
};

// utility to send message to a specific socket:

const sendMessageToSocketId = (socketId, messageObject) => {
  if (io && socketId) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.error(`🔴 socket.io not initialized`);
  }
};

export default { initializeSocket, sendMessageToSocketId };
