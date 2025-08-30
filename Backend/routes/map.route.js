import express from "express";
import { authUser } from "../middlewares/auth.middleware.js";
import mapController from "../controllers/map.controller.js";
import { query } from "express-validator";

const router = express.Router();

const { getCoordinates } = mapController;

router.get(
  "/get-coordinates",
  query("address").isString().isLength({ min: 3 }),
  authUser,
  getCoordinates
);

export default router;
