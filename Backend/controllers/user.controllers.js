import userModel from "../models/user.model.js";
import createUser from "../services/user.services.js";
import { validationResult } from "express-validator";

const registerUser = async (req, res, next) => {
  try {
    // validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // destructuring request body
    const {
      fullName: { firstName, lastName },
      email,
      password,
    } = req.body;
    // check if all required fields are present
    if (!firstName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // check if user already exists
    const isUserAlreadyExists = await userModel.findOne({ email });
    if (isUserAlreadyExists) {
      return res.status(400).json({ message: "User already exist" });
    }
    // hash the password
    const hashedPassword = await userModel.hashPassword(password);
    if (!hashedPassword) {
      return res.status(500).json({ message: "Error hashing password" });
    }
    // Use userServices to create the user
    const user = await createUser({
      fullName: {
        firstName,
        lastName,
      },
      email,
      password: hashedPassword,
    });
    if (!user) {
      return res.status(500).json({ message: "Error creating user" });
    }
    // Generate auth token
    const userObj = user.toObject();
    delete userObj.password; // remove password from user object
    delete userObj.__v; // remove version key from the user object
    delete userObj.socketId; // remove socketId from the user object
    userObj._id = userObj._id.toString(); // convert _id to string

    const token = user.generateAuthToken();
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: userObj,
    });
  } catch (error) {
    console.log("Error while registering the error", error.message);
    res.status(500).json({
      message: "Internal server error",
      error: error.message || "An unexpected error occurred",
    });
  }
};

export default registerUser;
