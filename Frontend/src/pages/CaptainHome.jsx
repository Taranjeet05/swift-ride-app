import React from "react";
import CaptainLogout from "../components/CaptainLogout";

const CaptainHome = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Welcome to Captain's Home Page
      </h1>
      <CaptainLogout />
    </div>
  );
};

export default CaptainHome;
