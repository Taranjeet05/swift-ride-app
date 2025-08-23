import React, { useRef, useState } from "react";
import UserLogout from "../components/UserLogout";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";

// Register the ReactPlugin once
gsap.registerPlugin(useGSAP);

const Home = () => {
  const [pickUp, setPickUp] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);

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

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, { height: "70%", padding: "24" });
      gsap.to(panelCloseRef.current, { opacity: 1 });
    } else {
      gsap.to(panelRef.current, { height: "0%", padding: "0" });
      gsap.to(panelCloseRef.current, { opacity: 0 });
    }
  }, [panelOpen]);

  return (
    <div className="h-screen relative">
      <div>
        <img
          src="images/uber.svg"
          alt="uber-log"
          className="w-16 absolute left-5 top-5"
        />
      </div>

      {/* *** */}

      <div className="h-screen w-screen">
        {/* uber map image for temporary use until api integration */}
        <img
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="uber-map"
          className="h-full w-full object-cover"
        />
      </div>

      {/* **** */}

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
          <LocationSearchPanel />
        </div>
      </div>
      {/* *** */}
    </div>
  );
};

export default Home;
