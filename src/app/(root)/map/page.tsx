"use client";

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useState } from "react";

export default function MapPage() {
  const containerStyle = {
    width: "100%",
    height: "100vh",
  };

  const center = {
    lat: 34.7293466708865,
    lng: 135.49939605607292,
  };
  const lists = [
    { lat: 34.7024856, lng: 135.4959516 },
    { lat: 34.5024856, lng: 135.5 },
    { lat: 34.9024856, lng: 135.3 },
  ];

  const [clickPoint, setClickPoint] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const point = (e) => {
    if (!e.latLng) return;
    setClickPoint({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  };

  return (
    <div className="grid grid-cols-12 h-screen">
      <div className="grid-item col-span-1"></div>
      <div className="grid-item col-span-4">
        {clickPoint && (
          <p>
            x:{clickPoint.lat} / y:{clickPoint.lng}
          </p>
        )}
      </div>
      <div className="grid-item col-span-7">
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GMAP_API!}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={11}
            onClick={point}
          >
            {lists.map((list) => (
              <Marker
                key={list.lat}
                position={{ lat: list.lat, lng: list.lng }}
                // icon={{
                //   url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                //   scaledSize: new google.maps.Size(40, 40), // オプション（サイズ調整）
                // }}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
}
