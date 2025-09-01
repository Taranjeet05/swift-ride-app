import express from "express";
import { authUser } from "../middlewares/auth.middleware.js";
import mapController from "../controllers/map.controller.js";
import { query } from "express-validator";

const router = express.Router();

const {
  getCoordinates,
  getDistanceTimeController,
  getAutoCompleteSuggestions,
} = mapController;

router.get(
  "/get-coordinates",
  query("address").isString().isLength({ min: 3 }),
  authUser,
  getCoordinates
);

router.get(
  "/get-distance-time",
  query("origin").isString().isLength({ min: 3 }),
  query("destination").isString().isLength({ min: 3 }),
  authUser,
  getDistanceTimeController
);

export default router;

router.get(
  "/get-suggestions",
  query("input").isString().isLength({ min: 3 }),
  authUser,
  getAutoCompleteSuggestions
);
