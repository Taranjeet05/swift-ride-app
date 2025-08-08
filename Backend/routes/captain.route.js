import express from "express";
const router = express.Router();
import captainController from "../controllers/captain.controller.js";
import { body } from "express-validator";

const { registerCaptain, loginCaptain } = captainController;

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullName.firstName")
      .isLength({ min: 3 })
      .withMessage("Full Name must be at least 3 characters long."),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long."),
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("Color must be at least 3 characters long."),
    body("vehicle.plate")
      .isLength({ min: 3 })
      .withMessage("Plate must be at least 3 characters long."),
    body("vehicle.capacity")
      .notEmpty()
      .withMessage("Capacity is required")
      .isInt({ min: 1 })
      .withMessage("Capacity must be at least 1"),
    body("vehicle.vehicleType")
      .notEmpty()
      .withMessage("Vehicle Type is required")
      .isIn(["car", "motorcycle"])
      .withMessage("Invalid Vehicle Type"),
  ],
  registerCaptain
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long."),
  ],
  loginCaptain
);

export default router;
