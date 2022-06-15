import React from 'react'
// import { Map as LeafletMap, TileLayer } from "react-leaflet";
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import './Map.css'
import {showDataOnMap} from '../util'

function Map({countries, casesType, center,zoom}) {
    return (
        <div className="map" > 
            <MapContainer 
            // key is used because value for center is immutable (or something..)
            key={JSON.stringify(center)}
            center={center} zoom={zoom} >
                {/* ${console.log("mapCenter Map.js >>>",center ,zoom)} */}
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                {showDataOnMap(countries, casesType)}
            </MapContainer>
        </div>
    )
}

export default Map
