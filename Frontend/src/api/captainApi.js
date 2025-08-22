import API from "./axiosInstance";

export const SignupCaptain = async (newCaptain) => {
  try {
    const { data } = await API.post("/captains/register", newCaptain);
    return data;
  } catch (error) {
    console.log(
      "Error signing up Captain:",
      error?.response?.data || error.message
    );
    throw error;
  }
};

export const loginCaptain = async (captain) => {
    try {
        const {data} = await API.post("/captains/login", captain);
        return data;
    } catch (error) {
        console.log("Error logging in Captain:", error?.response?.data || error.message);
        throw error;
    }
}