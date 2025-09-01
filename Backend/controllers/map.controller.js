import mapService from "../services/maps.service.js";
import { validationResult } from "express-validator";

const { getAddressCoordinate, getDistanceTime } = mapService;

const getCoordinates = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { address } = req.query;
  try {
    const coordinates = await getAddressCoordinate(address);
    res.status(200).json(coordinates);
  } catch (error) {
    console.log("Error while getting the coordinates", error.message);
    res.status(404).json({ message: "Coordinates not found" });
  }
};

const getDistanceTimeController = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { origin, destination } = req.query;
  try {
    const result = await getDistanceTime(origin, destination);
    res.status(200).json(result);
  } catch (error) {
    console.log("Error while getting the DistanceTime", error.message);
    res.status(404).json({ message: error.message || "Coordinates not found" });
  }
};

export default { getCoordinates, getDistanceTimeController };
