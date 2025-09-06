import React from "react";
import { logoutUser } from "../api/userApi";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../Store/useUserStore";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

const UserLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const clearUser = useUserStore((state) => state.clearUser);

  const { mutate: logoutMutate, isLoading } = useMutation({
    mutationFn: logoutUser,
    // onsuccess callback : runs when the api successfully logs out the user
    onSuccess: () => {
      // clear local state and storage on successful logout
      clearUser();
      localStorage.removeItem("token");
      // clear query cache
      queryClient.clear();
      // redirect to login page
      navigate("/login");
    },
    // onError callback : runs when the api fails to log out the user
    onError: (error) => {
      console.log("Error while logging out:", error.message);
      // fallback : clear everything anyway
      clearUser();
      localStorage.removeItem("token");
      // clear query cache
      queryClient.clear();
      // redirect to login Page
      navigate("/login");
    },
  });

  const handleLogOut = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      clearUser();
      navigate("/login");
      return;
    }
    // call the logout mutation
    logoutMutate(token);
  };

  return (
    <div>
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
    </div>
  );
};

export default UserLogout;
