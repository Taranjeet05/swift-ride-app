import React, { useState, useEffect } from "react";
import CaptainLogout from "../components/CaptainLogout";
import CaptainDetail from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { useSocketStore } from "../Store/useSocketStore";
import { useCaptainStore } from "../Store/useCaptainStore";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import LiveTracking from "../components/LiveTracking";

const CaptainHome = () => {
  const [ridePopUpPanel, setRidePopUpPanel] = useState(false);
  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false);

  const ridePopUpPanelRef = useRef(null);
  const confirmRidePopUpRef = useRef(null);

  const initializeCaptain = useCaptainStore((state) => state.initializeCaptain);

  const { emitEvent, onEvent } = useSocketStore();
  const { captain, setCurrentRide } = useCaptainStore();

  const initSocket = useSocketStore((state) => state.initSocket);
  const isConnected = useSocketStore((state) => state.isConnected);

  useEffect(() => {
    const setup = async () => {
      await initializeCaptain();
      initSocket();
    };
    setup();
  }, [initializeCaptain, initSocket]);
  // debug console
  console.log("JOIN attempt", { captain, isConnected });

  useEffect(() => {
    if (!captain?._id || !isConnected) return;
    // debug console
    console.log("Emitting join event for user:", captain._id);

    emitEvent("join", { userId: captain._id, userType: "captain" });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;

          emitEvent("update-location-captain", {
            userId: captain._id,
            location: {
              lat: latitude,
              lng: longitude,
            },
          });
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();

    onEvent("new-ride", (data) => {
      //debug console
      console.log("Check new-ride DATA", data);
      setCurrentRide(data);
      setRidePopUpPanel(true);
    });

    return () => clearInterval(locationInterval);
  }, [captain, emitEvent, isConnected, onEvent, setCurrentRide]);

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
        <LiveTracking />
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
