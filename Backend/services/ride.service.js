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
    fare[vehicle] = Math.round(
      fareRates[vehicle].base +
        distanceKm * fareRates[vehicle].perKm +
        durationMin * fareRates[vehicle].perMinute
    );
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
    OTP : getOTP(4),
    fare: fare[vehicleType],
  });

  return ride;
};

export default { createRide };
