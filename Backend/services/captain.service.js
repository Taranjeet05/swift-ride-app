import captainModel from "../models/captain.model.js";

const createCaptain = async ({ fullName, email, password, vehicle }) => {
  try {
    const { firstName, lastName } = fullName;
    const { color, plate, capacity, vehicleType } = vehicle;
    if (!firstName || !email || !password || !vehicle) {
      throw new Error("All fields are required");
    }

    const captain = await captainModel.create({
      fullName: {
        firstName,
        lastName,
      },
      email,
      password,
      vehicle: {
        color,
        plate,
        capacity,
        vehicleType,
      },
    });
    return captain;
  } catch (error) {
    console.error("Database error while creating the captain", error.message);
    throw new Error("Error while creating the Captain");
  }
};

export default createCaptain;
