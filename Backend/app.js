import dotenv from "dotenv";

// load environment variables from .env file
dotenv.config();

import express from "express";
const app = express();
import cors from "cors";

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// enable CORS for all origins (for development purposes)
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello From Express!, we are in the Backend Home Page⚒️");
});

export default app;
