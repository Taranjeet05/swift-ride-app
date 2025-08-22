import React from "react";
import { useMutation } from "@tanstack/react-query";
import { logoutCaptain } from "../api/captainApi";
import { useNavigate } from "react-router-dom";
import { useCaptainStore } from "../Store/useCaptainStore";
import { useQueryClient } from "@tanstack/react-query";

const CaptainLogout = () => {
  const navigate = useNavigate();
  const clearCaptain = useCaptainStore((state) => state.clearCaptain);
  const queryClient = useQueryClient();

  const { mutate: logoutMutate, isLoading } = useMutation({
    mutationFn: logoutCaptain,
    // onsuccess callback : runs when the api successfully logs out the Captain
    onSuccess: () => {
      // clear local state and storage on successful logout
      clearCaptain();
      localStorage.removeItem("token");
      // clear query cache
      queryClient.clear();
      // redirect to login page
      navigate("/captain-login");
    },
    // onError callback : runs when the api fails to log out the Captain
    onError: (error) => {
      console.log("Error while logging out:", error.message);
      // fallback : clear everything anyway
      clearCaptain();
      localStorage.removeItem("token");
      // clear query cache
      queryClient.clear();
      // redirect to login page
      navigate("/captain-login");
    },
  });

  const handleLogOut = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      clearCaptain();
      navigate("/captain-login");
      return;
    }
    // call the logout mutation
    logoutMutate(token);
  };

  return (
    <div>
      <button disabled={isLoading} onClick={handleLogOut}>
        {isLoading ? "Logging out..." : "Logout Captain"}
      </button>
    </div>
  );
};

export default CaptainLogout;
