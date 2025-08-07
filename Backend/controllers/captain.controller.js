import captainModel from "../models/captain.model.js";
import { validationResult } from "express-validator";
import createCaptain from "../services/captain.service.js";

const registerCaptain = async (req, res, next) => {
  try {
    // validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    // destructuring request body
    const {
      fullName: { firstName, lastName },
      email,
      password,
      vehicle: { color, plate, capacity, vehicleType },
    } = req.body;
    // check if all required fields are present
    if (!firstName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // check if user already exists
    const isCaptainAlreadyExists = await captainModel.findOne({ email });
    if (isCaptainAlreadyExists) {
      return res.status(401).json({
        message: "Captain already Exist",
      });
    }
    // hash the password
    const hashedPassword = await captainModel.hashPassword(password);
    if (!hashedPassword) {
      return res.status(400).json({
        message: "Error while hashing the password",
      });
    }
    // use captainService to create the captain
    const captain = await createCaptain({
      fullName: {
        firstName,
        lastName,
      },
      email,
      password: hashedPassword,
      vehicle: {
        color,
        plate,
        capacity,
        vehicleType,
      },
    });
    if (!captain) {
      return res.status(500).json({
        message: "Error creating the captain",
      });
    }
    // Generate auth token
    const captainObj = captain.toObject();
    delete captainObj.password; // remove password from captain object
    delete captainObj.socketId; // remove socketId from the captain object
    delete captainObj.__v; // remove version key from the captain object
    captainObj._id = captainObj._id.toString(); // convert _id to string

    const token = captain.generateAuthToken();
    res.status(200).json({
      message: "Captain registered successfully",
      token,
      captain: captainObj,
    });
  } catch (error) {
    console.log("Error while registering the Captain.", error.message);
    res.status(500).json({
      message: "Internal server error",
      error: error.message || "An unexpected Error occurred",
    });
  }
};

export default { registerCaptain };
