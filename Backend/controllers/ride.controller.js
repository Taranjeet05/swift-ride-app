import rideService from "../services/ride.service.js";
import { validationResult } from "express-validator";
import mapsService from "../services/maps.service.js";
import socket from "../socket.js";

const { createRide, getFare } = rideService;
const { getCaptainsInTheRadius, getAddressCoordinate } = mapsService;
const { sendMessageToSocketId } = socket;

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
    res.status(201).json(ride);

    const pickUpCoordinates = await getAddressCoordinate(pickUp);
    // debug console:
    console.log("check coordinates", pickUpCoordinates);

    const captainsInRadius = await getCaptainsInTheRadius(
      pickUpCoordinates.lat,
      pickUpCoordinates.lng,
      2
    );
    // debug console:
    console.log("check captainInRadius", captainsInRadius);

    ride.otp = "";

    captainsInRadius.map((captain) => {
      // debug console:
      console.log("Check captain & ride", captain, ride);
      sendMessageToSocketId(captain.socketId, {
        event: "new-ride",
        data: ride,
      });
    });
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

export default { createRideController, getRideFare };
