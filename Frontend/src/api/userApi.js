import API from "./axiosInstance";

export const signupUser = async (newUser) => {
  try {
    const { data } = await API.post("/users/register", newUser);
    return data;
  } catch (error) {
    console.error(
      "Error signing up user:",
      error?.response?.data || error.message
    );
    throw error;
  }
};

export const loginUser = async (user) => {
  try {
    const { data } = await API.post("/users/login", user);
    return data;
  } catch (error) {
    console.log(
      "Error logging in User:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const logoutUser = async (token) => {
  try {
    const { data } = await API.get("/users/logout", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.log(
      "Error logging out User:",
      error?.response?.data || error.message
    );
    throw error;
  }
};
