import API from "./axiosInstance";

export const signupUser = async (newUser) => {
  try {
    const { data } = await API.post("/users/register", newUser);
    return data;
  } catch (error) {
    console.error("Error signing up user:", error.message);
    throw error;
  }
};
