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
    const { data } = await API.post("/captains/login", captain);
    return data;
  } catch (error) {
    console.log(
      "Error logging in Captain:",
      error?.response?.data || error.message
    );
    throw error;
  }
};

export const profileOfCaptain = async () => {
  try {
    const { data } = await API.get("/captains/profile");
    return data;
  } catch (error) {
    console.log(
      "Error while fetching the Captain Profile",
      error?.data || error.message
    );
  }
};

export const logoutCaptain = async (token) => {
  try {
    const { data } = await API.get("/captains/logout", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.log(
      "Error logging out Captain:",
      error?.response?.data || error.message
    );
    throw error;
  }
};
