import mongoose from "mongoose";

const rideSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    captain: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Captain",
    },
    pickUp: {
      type: String,
      required: true,
      trim: true,
    },
    destination: {
      type: String,
      required: true,
      trim: true,
    },
    fare: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "ongoing", "cancelled", "completed"],
      default: "pending",
    },
    duration: {
      type: Number, // in minutes
      required: true,
      min: 0,
    },
    distance: {
      type: Number, // in km/miles
      required: true,
      min: 0,
    },

    paymentId: {
      type: String,
      required: true,
    },
    orderId: {
      type: String,
      required: true,
    },
    signature: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Ride", rideSchema);
