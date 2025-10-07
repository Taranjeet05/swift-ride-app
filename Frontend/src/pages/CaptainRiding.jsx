import React, { useRef, useState } from "react";
import CaptainLogout from "../components/CaptainLogout";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import FinishRide from "../components/FinishRide";
import LiveTracking from "../components/LiveTracking";

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);

  const finishRidePanelRef = useRef(null);

  useGSAP(() => {
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current, { y: "0%", duration: 0.5 });
    } else {
      gsap.to(finishRidePanelRef.current, { y: "100%", duration: 0.5 });
    }
  }, [finishRidePanel]);

  return (
    <div className="h-screen">
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
        <img src="images/uber.svg" alt="uber-log" className="w-16" />
        <CaptainLogout />
      </div>

      <div className="h-4/5">
        {/* map */}
        <LiveTracking />
      </div>

      <div
        onClick={() => {
          setFinishRidePanel(true);
        }}
        className="h-1/5 flex items-center justify-between p-6 relative bg-stone-200"
      >
        <h5 className="p-1 text-center absolute top-0 w-[80%] cursor-pointer">
          <i className="ri-arrow-up-wide-line text-3xl text-gray-400 cursor-pointer"></i>
        </h5>
        <h4 className="text-xl font-semibold">4 km away</h4>
        <button className="bg-green-600 hover:bg-green-700 transition cursor-pointer text-white font-semibold px-4 py-2 rounded-xl shadow-md">
          Complete Ride
        </button>
      </div>

      <div
        ref={finishRidePanelRef}
        className="fixed w-full h-screen z-10 bottom-0 px-3 py-10 bg-white translate-y-full  pt-12"
      >
        <FinishRide setFinishRidePanel={setFinishRidePanel} />
      </div>
    </div>
  );
};

export default CaptainRiding;
