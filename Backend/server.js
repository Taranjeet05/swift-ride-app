import http from "http";
import app from "./app.js";
import socket from "./socket.js";

const { initializeSocket } = socket;

const PORT = process.env.PORT || 3000;

//  create HTTP server with express app
const server = http.createServer(app);
initializeSocket(server);

// start the server
server.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
