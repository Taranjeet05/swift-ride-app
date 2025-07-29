import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      minlength: [3, "Full name must be at least 3 characters long"],
      trim: true,
    },
    lastName: {
      type: String,
      minlength: [3, "Last name must be at least 3 characters long"],
      trim: true,
    },
    email: {
      type: String,
      required: true,
      minlength: [5, "Email must be at least 5 characters long"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // Do not return password in queries,
    },
    socketId: {
      type: String,
    },
  },
  { timestamps: true }
);

// ✅ Instance method to generate auth token
userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// ✅ Instance method to compare passwords
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// ✅ Static method to hash passwords
userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const userModel = mongoose.model("User", userSchema);
export default userModel;
