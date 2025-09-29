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
