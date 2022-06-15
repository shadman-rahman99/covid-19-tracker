// Used for basic utilies to provide simple functionalities

import React from 'react'
import numeral from 'numeral'
import {Circle, Popup} from "react-leaflet"

// Used to set different colors to circles for cases, recovered and deaths
const casesTypeColors = {
    cases: {
      hex: "#CC1034",
      rgb: "rgb(204, 16, 52)",
      half_op: "rgba(204, 16, 52, 0.5)",
    //   multiplier used for circle radius calculation. Value is set randomly
      multiplier: 200,
    },
    recovered: {
      hex: "#7dd71d",
      rgb: "rgb(125, 215, 29)",
      half_op: "rgba(125, 215, 29, 0.5)",
      multiplier: 300,
    },
    deaths: {
      hex: "#fb4443",
      rgb: "rgb(251, 68, 67)",
      half_op: "rgba(251, 68, 67, 0.5)",
      multiplier: 700,
    },
  };

export const sortData = (data)=>{
    // ... is a split operator, console log to see the differece between a
    // regular array object and split operated object.
    // console.log("reg data >>> ",data);
    // console.log("split operated data >>>", ...data);

    const sortedData = [...data];
    // sort is a built in sorting function
    // Sorting data in ascending order by number of cases in a country
    return sortedData.sort((a,b)=> (a.cases > b.cases)? -1:1 );
}

// Draws circles on the map with interactive tooltip so when clicked on a 
// country it will zoom in.
// Although casesType can be passed manually, but by default it is set to cases
export const showDataOnMap = (data, casesType) => (
  console.log("Cases Type Color Util >>> ",casesTypeColors[casesType].hex),
    data.map(country => (
        // <Circle  pathOptions={{
        //   center : [country.countryInfo.lat, country.countryInfo.long] ,
        //     fillOpacity : 0.2 ,
        //     fillcolor:casesTypeColors[casesType].hex,
        //     // color = "#7dd71d"
        //     radius:
        //         // country[casesType] gives the total number of cases 
        //      Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
        // }} >
        <Circle
            center={[country.countryInfo.lat, country.countryInfo.long]}
            pathOptions={{color: casesTypeColors[casesType].hex,
            fillColor: casesTypeColors[casesType].hex }}
            fillOpacity={0.4}
            radius={
            Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
          }>
              { console.log("Cases Type Color Util 2 >>> ",casesTypeColors[casesType].hex)}
        <Popup>
            <div className="mapInfo-container">
                <div className="mapInfo-flag" style={
                    { backgroundImage: `url(${country.countryInfo.flag})`}}/>
                <div className="mapInfo-name" > {country.country} </div>
                <div className="mapInfo-cases" > Cases :  {numeral(country.cases).format("0,0")} </div>
                <div className="mapInfo-recovered" > Recovered: {numeral(country.recovered).format("0,0")} </div>
                <div className="mapInfo-deaths" > Deaths : {numeral(country.deaths).format("0,0")} </div>
            </div>
        </Popup>
        </Circle>
    ))
)

export const prettyPrintStat = (stat) => (
  // If stat is true then following takes place or else it returns null
  stat ? `+${numeral(stat).format("0.0a")}` : "+0"
)