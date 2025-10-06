import express from "express";
const router = express.Router();
import { body, query } from "express-validator";
import rideController from "../controllers/ride.controller.js";
import { authCaptain, authUser } from "../middlewares/auth.middleware.js";

const { createRideController, getRideFare, confirmRide, startRide, endRide } =
  rideController;

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

router.get(
  "/get-fare",
  authUser,
  query("pickUp").isLength({ min: 3 }).withMessage("Invalid PickUp location"),
  query("destination")
    .isLength({ min: 3 })
    .withMessage("Invalid destination location"),
  getRideFare
);

router.post(
  "/confirm",
  authCaptain,
  body("rideId").isMongoId().withMessage("Invalid Ride Id"),
  confirmRide
);

router.post(
  "/start-ride",
  authCaptain,
  body("rideId").isMongoId().withMessage("Invalid Ride Id"),
  body("OTP").isString().isLength({ min: 4 }).withMessage("OTP is Required"),
  startRide
);

router.post(
  "/end-ride",
  authCaptain,
  body("rideId").isMongoId().withMessage("Invalid Ride Id"),
  endRide
);

export default router;
