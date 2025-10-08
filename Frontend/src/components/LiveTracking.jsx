import React, { useState, useEffect, useRef } from "react";
import { LoadScript, GoogleMap } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const libraries = ["marker"];

const LiveTracking = () => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log("Updated location:", latitude, longitude);
        setCurrentPosition({ lat: latitude, lng: longitude });
      },
      (error) => console.error("Geolocation error:", error),
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  const onLoad = async (map) => {
    mapRef.current = map;
    const { AdvancedMarkerElement } = await window.google.maps.importLibrary(
      "marker"
    );

    markerRef.current = new AdvancedMarkerElement({
      map,
      position: { lat: 0, lng: 0 },
      title: "You are here!",
    });
  };

  useEffect(() => {
    if (currentPosition && markerRef.current && mapRef.current) {
      markerRef.current.position = currentPosition; // Move marker
      mapRef.current.panTo(currentPosition); // Move map to follow you
    }
  }, [currentPosition]);

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      libraries={libraries}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentPosition || { lat: 0, lng: 0 }}
        zoom={15}
        onLoad={onLoad}
        options={{
          mapId: "DEMO_MAP_ID", // Replace with your own Map ID (optional)
          disableDefaultUI: true,
        }}
      />
    </LoadScript>
  );
};

export default LiveTracking;
