import React, {useState} from 'react';
import { MapContainer, useMapEvents, TileLayer, Marker } from 'react-leaflet';
import './index.css';
import * as L from "leaflet";

var airplaneIcon = L.icon({
  iconUrl: './airplane.png',

  // iconSize:     [70, 70], // size of the icon
  // iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
  // popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

function MyComponent() {
    const map = useMapEvents({
      click: () => {
        map.locate()
      },
      locationfound: (location) => {
        console.log('location found:', location)
      },
    })
    return null
  }

function MapComponent() {

    const ZOOM_LEVEL = 2;
    return (
      <div className="leaflet-container">
        <MapContainer center={[30.5, 10.5]} zoom={ZOOM_LEVEL} scrollWheelZoom={false}>
            {/* <MyComponent /> */}
            <Marker position={[30.5, 10.5]}/>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
     </div>
    )
}

export default MapComponent;