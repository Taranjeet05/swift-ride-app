import rideService from "../services/ride.service.js";
import { validationResult } from "express-validator";

const { createRide } = rideService;

const createRideController = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { pickUp, destination, vehicleType } = req.body;
  try {
    const ride = await createRide({
      user: req.user._id,
      pickUp,
      destination,
      vehicleType,
    });
    return res.status(201).json(ride);
  } catch (error) {
    console.log("Error while creating Ride", error.message);
    res.status(500).json({ message: error.message });
  }
};

export default { createRideController };
