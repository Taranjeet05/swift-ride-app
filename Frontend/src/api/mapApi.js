import API from "./axiosInstance";

// Get location suggestions
export const fetchSuggestions = async (input) => {
  const { data } = await API.get(
    `/map/get-suggestions?input=${encodeURIComponent(input)}`
  );
  return data;
};

// Get fare estimate
export const fetchFare = async (pickup, destination) => {
  const { data } = await API.get(
    `/map/distance-time?origin=${encodeURIComponent(
      pickup
    )}&destination=${encodeURIComponent(destination)}`
  );
  return data;
};

// Create a ride
export const createRide = async ({ pickUp, destination, vehicleType }) => {
  const { data } = await API.post("/rides/create", {
    pickUp,
    destination,
    vehicleType,
  });
  return data;
};
