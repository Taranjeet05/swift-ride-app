import rideModel from "../models/ride.model.js";
import mapService from "../services/maps.service.js";
import fareRates from "../config/fareRates.js";
import crypto from "crypto";

const { getDistanceTime } = mapService;

const getFare = async (pickUp, destination) => {
  if (!pickUp || !destination) {
    throw new Error("Pickup and destination are required");
  }

  // Get distance and duration from Google Maps
  const distanceTime = await getDistanceTime(pickUp, destination);

  if (!distanceTime?.distance?.value || !distanceTime?.duration?.value) {
    throw new Error("Invalid response from map service");
  }

  // Extract distance in km and duration in minutes
  const distanceKm = distanceTime.distance.value / 1000;
  const durationMin = distanceTime.duration.value / 60;

  // Calculate fares
  const fare = {};

  for (const vehicle in fareRates) {
    fare[vehicle] =
      Math.round(
        fareRates[vehicle].base +
          distanceKm * fareRates[vehicle].perKm +
          durationMin * fareRates[vehicle].perMinute
      ) / 100;
  }
  return fare;
};

function getOTP(num) {
  if (!num || num < 1) {
    throw new Error("Number of digits must be at least 1");
  }

  // Generate random bytes
  const otp = crypto.randomInt(0, Math.pow(10, num)).toString();

  // Pad with leading zeros if needed
  return otp.padStart(num, "0");
}

const createRide = async ({ user, pickUp, destination, vehicleType }) => {
  if (!user || !pickUp || !destination || !vehicleType) {
    throw new Error("All fields are Required");
  }
  const fare = await getFare(pickUp, destination);
  if (!fare[vehicleType]) throw new Error("Invalid vehicleType");

  const ride = await rideModel.create({
    user,
    pickUp,
    destination,
    OTP: getOTP(4),
    fare: fare[vehicleType],
  });

  return ride;
};

const confirmRideService = async ({ rideId, captain }) => {
  if (!rideId) {
    throw new Error("Ride Id is required");
  }

  await rideModel.findOneAndUpdate(
    { _id: rideId, status: "pending" },
    { status: "accepted", captain: captain._id },
    { new: true }
  );

  const ride = await rideModel
    .findOne({
      _id: rideId,
    })
    .populate("user")
    .populate("captain")
    .select("+OTP");
  if (!ride) {
    throw new Error("Ride not found or already accepted");
  }
  return ride;
};

const startRideService = async ({ rideId, OTP }) => {
  if (!rideId || !OTP) throw new Error("Ride Id and OTP is required");

  const ride = await rideModel
    .findOne({ _id: rideId })
    .populate("captain")
    .populate("user")
    .select("+OTP");

  if (!ride) throw new Error("Ride is not Found");

  if (ride.status !== "accepted") throw new Error("Ride Is not accepted");

  if (ride.OTP !== OTP) throw new Error("Invalid OTP");

  await rideModel.findOneAndUpdate({ _id: rideId }, { status: "ongoing" });

  return ride;
};

const endRideService = async ({ rideId, captain }) => {
  if (!rideId || !captain) throw new Error("Ride Id and Captain is Required");

  const ride = await rideModel
    .findOne({ _id: rideId, captain: captain._id })
    .populate("user")
    .populate("captain")
    .select("+OTP");

  if (!ride) throw new Error("Ride Not Found");
  if (ride.status !== "ongoing") throw new Error("Ride not ongoing");

  await rideModel.findByIdAndUpdate({ _id: rideId }, { status: "completed" });
  return ride;
};

export default {
  createRide,
  getFare,
  confirmRideService,
  startRideService,
  endRideService,
};
