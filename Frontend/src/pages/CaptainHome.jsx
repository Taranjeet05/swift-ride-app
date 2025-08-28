import React, { useState } from "react";
import CaptainLogout from "../components/CaptainLogout";
import CaptainDetail from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const CaptainHome = () => {
  const [ridePopUpPanel, setRidePopUpPanel] = useState(true);
  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false);

  const ridePopUpPanelRef = useRef(null);
  const confirmRidePopUpRef = useRef(null);

  useGSAP(() => {
    if (ridePopUpPanel) {
      gsap.to(ridePopUpPanelRef.current, {
        y: "0%",
        duration: 0.5,
      });
    } else {
      gsap.to(ridePopUpPanelRef.current, {
        y: "100%",
        duration: 0.5,
      });
    }
  }, [ridePopUpPanel]);

  useGSAP(() => {
    if (confirmRidePopUpPanel) {
      gsap.to(confirmRidePopUpRef.current, { y: "0%", duration: 0.5 });
    } else {
      gsap.to(confirmRidePopUpRef.current, { y: "100%", duration: 0.5 });
    }
  }, [confirmRidePopUpPanel]);

  return (
    <div className="h-screen flex flex-col">
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
        <img src="images/uber.svg" alt="uber-log" className="w-16" />
        <CaptainLogout />
      </div>

      {/* Map Section */}
      <div className="h-3/5 w-full">
        {/* uber map image for temporary use until api integration */}
        <img
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="uber-map"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Info Section of Captain */}
      <div className="h-2/5 p-6">
        <CaptainDetail />
      </div>

      <div
        ref={ridePopUpPanelRef}
        className="fixed w-full z-10 bottom-0 px-3 py-10 bg-white translate-y-full  pt-12"
      >
        <RidePopUp
          setRidePopUpPanel={setRidePopUpPanel}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
        />
      </div>

      <div
        ref={confirmRidePopUpRef}
        className="fixed w-full h-screen z-10 bottom-0 px-3 py-10 bg-white translate-y-full  pt-12"
      >
        <ConfirmRidePopUp setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} />
      </div>
    </div>
  );
};

export default CaptainHome;
