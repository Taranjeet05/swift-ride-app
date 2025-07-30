import dotenv from "dotenv";

// load environment variables from .env file
dotenv.config();

import express from "express";
const app = express();
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import connectToDb from "./db/db.js";
import userRoutes from "./routes/user.route.js";

// connect to MongoDb
connectToDb();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// enable CORS for all origins (for development purposes)
app.use(cors());

// use Helmet for securing Express apps by setting various HTTP headers
app.use(helmet());
// use Morgan for request logging
app.use(morgan("dev")); // 'dev' format for logging HTTP requests

app.get("/", (req, res) => {
  res.send("Hello From Express!, we are in the Backend Home Page⚒️");
});

app.use("/api/v1", userRoutes); //request will be: http://localhost:3000/api/v1/register

export default app;
