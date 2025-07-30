import userModel from "../models/user.model.js";

const createUser = async ({ fullName, password, email }) => {
  const { firstName, lastName } = fullName || {};
  // Check if all required fields are present
  if (!firstName || !email || !password) {
    throw new Error("All fields are required");
  }
  try {
    const user = await userModel.create({
      fullName: {
        firstName,
        lastName,
      },
      email,
      password,
    });
    return user;
  } catch (error) {
    console.error("Database error while creating the user:", error.message);
    throw new Error("Error creating user");
  }
};
export default createUser;
