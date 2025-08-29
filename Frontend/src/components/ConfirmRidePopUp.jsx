import React from "react";
import { useNavigate } from "react-router-dom";

const ConfirmRidePopUp = (props) => {
  const navigate = useNavigate();

  const handleConfirm = (e) => {
    e.preventDefault();

    navigate("/captain-riding");
  };

  return (
    <div>
      <h5
        onClick={() => {
          props.setConfirmRidePopUpPanel(false);
        }}
        className="p-1 text-center absolute top-0 w-[93%] cursor-pointer"
      >
        <i className="ri-arrow-down-wide-line text-3xl text-gray-200 cursor-pointer"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5 flex items-center">
        Confirm this ride to Start
        <span className="mx-2 flex space-x-1">
          <span className="animate-bounce">.</span>
          <span className="animate-bounce [animation-delay:0.7s]">.</span>
          <span className="animate-bounce [animation-delay:0.9s]">.</span>
        </span>
      </h3>

      <div className="flex items-center justify-between mt-10 p-3 bg-gradient-to-r from-slate-900 via-rose-700 to-amber-500 rounded-lg">
        <div className="flex items-center justify-start gap-4">
          <img
            className="h-20 w-16 rounded-full object-cover"
            src="https://images.pexels.com/photos/1499327/pexels-photo-1499327.jpeg?_gl=1*wj7m17*_ga*MzI3Mjk4ODA4LjE3NTYzOTAyNzg.*_ga_8JE65Q40S6*czE3NTYzOTAyNzckbzEkZzEkdDE3NTYzOTA2NzAkajQ4JGwwJGgw"
            alt="Passenger profile picture"
          />
          <h2 className="text-xl text-gray-100 drop-shadow-md font-medium">
            EMILY GARLAND
          </h2>
        </div>
        <div className="bg-gray-900 py-2 px-4 text-white rounded-bl-3xl rounded-sm shadow-md ring-1 ring-gray-700">
          <p className="font-bold text-lg flex flex-col items-center">
            2.2 <span className="-mt-1">Km</span>
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-2 mt-5">
        <div className="w-full bg-[#eee] flex flex-col items-start justify-center gap-5 px-4 py-4 rounded-lg mb-5 mt-5">
          <div className="flex items-center gap-5 ">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11 A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                Frankfurt am Main, Germany
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">Terminal 1</h3>
              <p className="text-sm -mt-1 text-gray-600">
                Frankfurt Airport, 60549 Germany
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">20 €</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            // here you can handle confirmation logic
            console.log("Ride Confirmed!");
          }}
          className="w-full flex flex-col items-center justify-evenly gap-4 mt-2"
        >
          {/* Input field for confirmation (optional, like entering OTP or code) */}
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={4}
            placeholder="Enter OTP"
            className="font-mono border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
            required
          />
          <div className="flex w-full gap-4 mt-4">
            {/* Cancel button */}
            <button
              type="button"
              onClick={() => props.setConfirmRidePopUpPanel(false)}
              className="flex-1 bg-red-600 hover:bg-red-700 transition cursor-pointer text-white font-semibold p-2 rounded-lg mt-1"
            >
              Cancel
            </button>

            {/* Confirm button (submit form) */}
            <button
              onClick={handleConfirm}
              type="submit"
              className="flex-1 flex justify-center items-center bg-green-600 hover:bg-green-700 transition cursor-pointer text-white font-semibold p-2 rounded-lg mt-1"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;
