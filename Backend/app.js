import dotenv from "dotenv";

// load environment variables from .env file
dotenv.config();

import express from "express";
const app = express();
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import connectToDb from "./db/db.js";
import userRoutes from "./routes/user.route.js";
import captainRoutes from "./routes/captain.route.js";

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
// use  cookie-parser middleware to handle incoming cookies
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello From Express!, we are in the Backend Home Page⚒️");
});

app.use("/users", userRoutes); //request will be: /user/register
app.use("/captains", captainRoutes);

export default app;
