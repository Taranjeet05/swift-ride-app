import rideService from "../services/ride.service.js";
import { validationResult } from "express-validator";
import mapsService from "../services/maps.service.js";
import socket from "../socket.js";
import rideModel from "../models/ride.model.js";

const { sendMessageToSocketId } = socket;

const { createRide, getFare, confirmRideService } = rideService;
const { getCaptainsInTheRadius, getAddressCoordinate } = mapsService;

const createRideController = async (req, res) => {
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

    const pickUpCoordinates = await getAddressCoordinate(pickUp);
    // debug console:
    console.log("check coordinates", pickUpCoordinates);

    const captainsInRadius = await getCaptainsInTheRadius(
      pickUpCoordinates.lat,
      pickUpCoordinates.lng,
      50
    );
    // debug console:
    console.log("check captainInRadius", captainsInRadius);

    ride.OTP = "";

    const rideWithUser = await rideModel
      .findOne({ _id: ride._id })
      .populate("user");
    console.log("User socketId", rideWithUser.user.socketId);

    if (!captainsInRadius || captainsInRadius.length === 0) {
      return res.status(404).json({
        message: "No captains available nearby",
      });
    }
    captainsInRadius.map((captain) => {
      // debug console:
      console.log("Check captain & ride", captain, ride);
      sendMessageToSocketId(captain.socketId, {
        event: "new-ride",
        data: rideWithUser,
      });
    });
    return res.status(201).json(rideWithUser);
  } catch (error) {
    console.log("Error while creating Ride", error.message);
    res.status(500).json({ message: error.message });
  }
};

const getRideFare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickUp, destination } = req.query;

  try {
    const fare = await getFare(pickUp, destination);
    res.status(200).json(fare);
  } catch (error) {
    console.log("Error while getting Fare", error.message);
    res.status(500).json({ message: error.message });
  }
};

const confirmRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { rideId } = req.body;
  try {
    const ride = await confirmRideService({ rideId, captain: req.captain });

    if (ride.user?.socketId) {
      sendMessageToSocketId(ride.user.socketId, {
        event: "ride-confirmed",
        data: ride,
      });
    }
    return res.status(200).json(ride);
  } catch (error) {
    console.log("Error while Confirming Ride", error.message);
    res.status(500).json({ message: error.message });
  }
};

export default { createRideController, getRideFare, confirmRide };
