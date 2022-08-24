import React from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";

export const MapComponent = ({ data }) => {
  const coords = [data.latitude, data.longitude];

  return (
    <div className="leaflet-container" style={{ borderRadius: "150px" }}>
      <MapContainer center={coords} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={coords}>
          <Popup>{data.name}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
