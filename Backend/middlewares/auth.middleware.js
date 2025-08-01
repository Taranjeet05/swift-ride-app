import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    // we will get the token from the request header
    const authHeader = req.headers.authorization;
    const token =
      req.cookies.token ||
      (authHeader &&
        authHeader.startsWith("Bearer ") &&
        authHeader.split(" ")[1]);

    if (!token) {
      return res.status(401).json({
        message: "Authentication token is required",
      });
    }

    if (authHeader && !authHeader.startsWith("Bearer ")) {
      return res
        .status(400)
        .json({ message: "Malformed Authorization header" });
    }

    // verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.userId) {
      return res.status(401).json({
        message: "Invalid authentication token",
      });
    }
    // find the user by its ID
    const user = await userModel
      .findById(decoded.userId)
      .select("-password -__v -socketId");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    // attach the user to the request object
    req.user = user;
    next(); // call the next middleware or route handler
  } catch (error) {
    console.log("Error in auth middleware:", error.message);
    res.status(500).json({
      message: "Internal server error",
      error: error.message || "An unexpected error occurred",
    });
  }
};

export default authUser;
