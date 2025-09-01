import express from "express";
const router = express.Router();
import { body } from "express-validator";
import rideController from "../controllers/ride.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const { createRideController } = rideController;

router.post(
  "/create",
  body("pickUp").isString().isLength({ min: 3 }).withMessage("Invalid address"),
  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid Address"),
  body("vehicleType")
    .isString()
    .isIn(["car", "motorcycle"])
    .withMessage("Invalid vehicleType"),
  authUser,
  createRideController
);

export default router;
