import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const captainSchema = new mongoose.Schema(
  {
    fullName: {
      firstName: {
        type: String,
        required: true,
        minlength: [3, "First name must be at least 3 characters long"],
        trim: true,
      },
      lastName: {
        type: String,
        minlength: [3, "Last name must be at least 3 characters long"],
        trim: true,
      },
    },
    email: {
      type: String,
      required: true,
      minlength: [5, "Email must be at least 5 characters long"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    password: {
      type: String,
      required: true,
      select: false, // Do not return password in queries,
    },
    socketId: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    vehicle: {
      color: {
        type: String,
        required: true,
        minlength: [3, "Color must be at least 3 characters long"],
      },
      plate: {
        type: String,
        required: true,
        minlength: [3, "Plate must be at least 3 characters long"],
      },
      capacity: {
        type: Number,
        required: true,
        min: [1, "Capacity must be at least 1"],
      },
      vehicleType: {
        type: String,
        required: true,
        enum: ["car", "motorcycle"],
      },
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [lng, lat]
        index: "2dsphere",
      },
    },
  },
  { timestamps: true }
);

captainSchema.index({ location: "2dsphere" });

// ✅ Instance method to generate auth token
captainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ captainId: this._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

// ✅ Instance method to compare passwords
captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// ✅ Static method to hash passwords
captainSchema.statics.hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const captainModel = mongoose.model("Captain", captainSchema);
export default captainModel;
