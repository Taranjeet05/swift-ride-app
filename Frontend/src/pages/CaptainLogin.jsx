import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginCaptain } from "../api/captainApi";
import { useCaptainStore } from "../Store/useCaptainStore";
import { useNavigate } from "react-router-dom";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const setCaptain = useCaptainStore((state) => state.setCaptain);
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: loginCaptain,
    onSuccess: (data) => {
      setCaptain(data.captain);
      localStorage.setItem("token", data.token);
      navigate("/home");
      setEmail("");
      setPassword("");
    },
  });

  const submitHandler = (e) => {
    e.preventDefault();
    mutate({
      email,
      password,
    });
  };

  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div>
        <img
          src="/images/uber-driver.svg"
          alt="uber-logo"
          className="w-20 mb-3"
        />

        <form action="" onSubmit={(e) => submitHandler(e)}>
          <h3 className="text-lg font-medium mb-2">What's your Email</h3>

          <input
            required
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            placeholder="email@example.com"
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg  placeholder:text-base"
          />

          <h3 className="text-lg font-medium mb-2">Enter Password</h3>

          <input
            required
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            placeholder="password"
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg  placeholder:text-base"
          />
          <button
            disabled={isPending}
            className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg  placeholder:text-base"
          >
            {isPending ? "Logging in..." : "Login"}
          </button>
          {isError && (
            <p className="text-red-500 text-sm my-2 text-center hover:underline cursor-no-drop">
              {error?.response?.data?.message || "Something went wrong"}
            </p>
          )}
          <p className="text-center">
            join a fleet ?
            <Link
              to="/captain-signup"
              className="text-blue-600 hover:text-blue-800 ml-0.5"
            >
              Register as a Captain
            </Link>
          </p>
        </form>
      </div>

      <div>
        <Link
          to="/login"
          className="bg-[#d5622d] flex justify-center items-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg  placeholder:text-base"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
