import express from "express";
const router = express.Router();
import { body } from "express-validator";
import userController from "../controllers/user.controllers.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const { registerUser, loginUser, getUserProfile } = userController;

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullName.firstName")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long."),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("password must be at least 6 characters long"),
  ],
  loginUser
);

router.get("/profile", authMiddleware, getUserProfile);

export default router;
