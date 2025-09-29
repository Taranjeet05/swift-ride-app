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
      localStorage.removeItem("Captain_Token_Key");
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
      localStorage.removeItem("Captain_Token_Key");
      // clear query cache
      queryClient.clear();
      // redirect to login page
      navigate("/captain-login");
    },
  });

  const handleLogOut = async () => {
    const token = localStorage.getItem("Captain_Token_Key");
    if (!token) {
      clearCaptain();
      navigate("/captain-login");
      return;
    }
    // call the logout mutation
    logoutMutate(token);
  };

return (
    <button
      onClick={handleLogOut}
      disabled={isLoading}
      className="h-10 w-10 bg-white flex items-center justify-center rounded-full shadow hover:bg-gray-100 transition"
    >
      {isLoading ? (
        <i className="ri-loader-4-line animate-spin text-lg text-gray-700"></i>
      ) : (
        <i className="ri-logout-box-line text-lg font-medium"></i>
      )}
    </button>
  );
};

export default CaptainLogout;
