import API from "./axiosInstance";

// Get location suggestions
export const fetchSuggestions = async (input) => {
  const { data } = await API.get(
    `/map/get-suggestions?input=${encodeURIComponent(input)}`,
    {
      tokenKey: "User_Token_Key",
    }
  );
  return data;
};

// Get fare estimate
export const fetchFare = async (pickup, destination) => {
  const { data } = await API.get(
    `/ride/get-fare?pickUp=${encodeURIComponent(
      pickup
    )}&destination=${encodeURIComponent(destination)}`,
    {
      tokenKey: "User_Token_Key",
    }
  );
  return data;
};

// Create a ride
export const createRide = async ({ pickUp, destination, vehicleType }) => {
  const { data } = await API.post(
    "/ride/create",
    {
      pickUp,
      destination,
      vehicleType,
    },
    {
      tokenKey: "User_Token_Key",
    }
  );
  return data;
};

// confirm ride by Captain
export const confirmRide = async ({ rideId, captainId }) => {
  const { data } = await API.post(
    "/ride/confirm",
    { rideId, captainId },
    {
      tokenKey: "Captain_Token_Key",
    }
  );
  return data;
};

// Start ride by captain (after getting correct OTP)

export const StartRide = async ({ rideId, OTP }) => {
  try {
    const { data } = await API.post(
      "/ride/start-ride",
      { rideId, OTP },
      { tokenKey: "Captain_Token_Key" }
    );
    return data;
  } catch (error) {
    console.log("error ", error);
  }
};

export const endRide = async ({ rideId }) => {
  const { data } = await API.post(
    "/ride/end-ride",
    { rideId },
    { tokenKey: "Captain_Token_Key" }
  );
  return data;
};
