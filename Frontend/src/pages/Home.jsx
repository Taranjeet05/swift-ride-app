import React, { useRef, useState } from "react";
import UserLogout from "../components/UserLogout";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";

// Register the ReactPlugin once
gsap.registerPlugin(useGSAP);

const Home = () => {
  const [pickUp, setPickUp] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);

  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const WaitingForDriverRef = useRef(null);

  const handlePanelOpen = () => {
    setPanelOpen(true);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    alert("Form Submitted");
    setPickUp("");
    setDestination("");
    setPanelOpen(false);
  };
  // GSAP Animations
  // Animation for panel open/close based on panelOpen state
  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, { height: "70%", padding: "24" });
      gsap.to(panelCloseRef.current, { opacity: 1 });
    } else {
      gsap.to(panelRef.current, { height: "0%", padding: "0" });
      gsap.to(panelCloseRef.current, { opacity: 0 });
    }
  }, [panelOpen]);
  // Animation for vehicle panel based on vehiclePanelOpen state
  useGSAP(() => {
    if (vehiclePanelOpen) {
      gsap.to(vehiclePanelRef.current, { transform: "translateY(0%)" });
    } else {
      gsap.to(vehiclePanelRef.current, { translateY: "100%" });
    }
  }, [vehiclePanelOpen]);
  // Animation for confirm ride panel based on confirmRidePanel state
  useGSAP(() => {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, { transform: "translateY(0%)" });
    } else {
      gsap.to(confirmRidePanelRef.current, { translateY: "100%" });
    }
  }, [confirmRidePanel]);

  useGSAP(() => {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, { y: "0%" });

      const timer = setTimeout(() => {
        gsap.to(vehicleFoundRef.current, {
          y: "100%",
          onComplete: () => {
            setVehicleFound(false);
            setWaitingForDriver(true);
          },
        });
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      gsap.to(vehicleFoundRef.current, { translateY: "100%" });
    }
  }, [vehicleFound]);

  useGSAP(() => {
    if (waitingForDriver) {
      gsap.to(WaitingForDriverRef.current, { transform: "translateY(0%)" });
    } else {
      gsap.to(WaitingForDriverRef.current, { translateY: "100%" });
    }
  }, [waitingForDriver]);

  return (
    <div className="h-screen relative">
      {/*//*in this DIV: We have the uber logo */}
      <div>
        <img
          src="images/uber.svg"
          alt="uber-log"
          className="w-16 absolute left-5 top-5"
        />
      </div>

      {/* *** */}
      {/* //*in this DIV: we have the map image for temporary use until api integration */}
      <div className="h-screen w-screen">
        {/* uber map image for temporary use until api integration */}
        <img
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="uber-map"
          className="h-full w-full object-cover"
        />
      </div>

      {/* **** */}
      {/* //*in this DIV: we have the form for pick-up and destination input */}
      <div className="h-screen flex flex-col justify-end absolute w-full top-0 ">
        {/* div to handle form for pick-up and destination input */}
        <div className="h-[30%] p-6 bg-white relative">
          <h5
            ref={panelCloseRef}
            onClick={() => setPanelOpen(!panelOpen)}
            className="absolute top-6 opacity-0 right-6 text-2xl"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a Trip</h4>
          <form onSubmit={(e) => submitHandler(e)}>
            <div className="line absolute bg-gray-700 rounded-full h-16 w-1 top-[45%] left-10"></div>
            <input
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5"
              value={pickUp}
              onChange={(e) => setPickUp(e.target.value)}
              onClick={handlePanelOpen}
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              onClick={handlePanelOpen}
              type="text"
              placeholder="Enter your destination"
            />
          </form>
        </div>
        {/* div to handle suggestion for pre destination */}
        <div ref={panelRef} className="bg-white h-0 overflow-hidden">
          <LocationSearchPanel
            vehiclePanelOpen={vehiclePanelOpen}
            setVehiclePanelOpen={setVehiclePanelOpen}
            panelOpen={panelOpen}
            setPanelOpen={setPanelOpen}
          />
        </div>
      </div>

      {/* *** */}
      {/* //*in this DIV: we have the vehicle panel for vehicle selection */}
      {/* vehicle panel for vehicle selection */}
      <div
        ref={vehiclePanelRef}
        className="fixed w-full z-10 bottom-0 px-3 py-10 bg-white translate-y-full pt-12"
      >
        <VehiclePanel
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanelOpen={setVehiclePanelOpen}
        />
      </div>

      {/* *** */}
      {/* //*in this DIV: we have the confirm ride panel for confirming ride */}
      {/* confirm ride panel for confirming ride */}
      <div
        ref={confirmRidePanelRef}
        className="fixed w-full z-10 bottom-0 px-3 py-6 bg-white translate-y-full pt-12"
      >
        <ConfirmRide
          confirmRidePanel={confirmRidePanel}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
        />
      </div>

      {/* *** */}
      <div
        ref={vehicleFoundRef}
        className="fixed w-full z-10 bottom-0 px-3 py-6 bg-white translate-y-full pt-12"
      >
        <LookingForDriver setVehicleFound={setVehicleFound} />
      </div>

      {/* *** */}
      <div
        ref={WaitingForDriverRef}
        className="fixed w-full z-10 bottom-0 px-3 py-6 bg-white translate-y-full  pt-12"
      >
        <WaitingForDriver
          waitingForDriver={waitingForDriver}
          setWaitingForDriver={setWaitingForDriver}
        />
      </div>
    </div>
  );
};

export default Home;
