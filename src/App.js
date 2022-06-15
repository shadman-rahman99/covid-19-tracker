import React, {useState, useEffect} from 'react';
import {MenuItem, FormControl, Select, Card, CardContent} from '@material-ui/core';
import './App.css';
import InfoBox from './Component/InfoBox';
import Map from './Component/Map';
import Table from './Component/Table';
import LineGraph from './Component/LineGraph';
import { sortData, prettyPrintStat } from './util';
// import numeral from "numeral";
import 'leaflet/dist/leaflet.css'


function App() {
  // country is used in the drop down menu
  // countryInfo is passed to Infobox
  // countries is used for the options in drop down menu
  // tabledata is passed to Table component 
  // mapCountries is used in the Map component
  // casesType is used in InfoBox
  const [country, setCountry] = useState(["worldwide"]);
  const [countryInfo, setCountryInfo] = useState([]);
  const [countries, setCountries] = useState([]); //initially set to empty array
  const [tableData, setTableData] = useState([]);

  // Setting up the latitude and longitude of the map. lat and lng
  // are default varibales from MapContainer component in react-leaflet.
  // Folowing values for latitude and longitude are approx centre of the map
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  // console.log("mapCenter Initial >>>",mapCenter);
  const [mapZoom, setMapZoom] = useState(2);
  const [mapCountries, setMapCountries] = useState([]);

  // Initially set to cases.
  const [casesType, setCasesType] = useState("cases");
  
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data);
    });
  }, []);

  useEffect(() => {
    const getCountriesData = async ()=> {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response)=> response.json())
      .then((data)=> {
        const countries = data.map((country)=> ({
          name: country.country,
          value:country.countryInfo.iso2,
        }));
        setCountries(countries);

        // sortData function is imported from util.js and data is
        // passed through as arguement
        const sortedData = sortData(data);
        setTableData(sortedData);
        setMapCountries(data);
      });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (event)=> {
    const countryCode = event.target.value;
    setCountry(countryCode);
    const url = 
    // ternary operator
    countryCode === "worldwide"
    ? "https://disease.sh/v3/covid-19/all"
    : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url).then(response => response.json())
    .then(data => {
      setCountry(countryCode);
      setCountryInfo(data);

      // set the map zoom before seting map center or else map wont zoom
      // in when center is changed
      if(countryCode !== "worldwide"){
        setMapZoom(4);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      }else{
        setMapZoom(2);
        setMapCenter([ 34.80746, -40.4796]);
        // console.log("mapCenter onChange >>>",mapCenter);
      }
    });
  }
  // console.log(countryInfo);


  return (
    <div className="app">
    <div className="app_left">
    <div className="app_header">
        <h1>Coivd 19 tracker</h1>
        <FormControl className="app_dropdown">
          <Select variant="outlined" value= {country} onChange = {onCountryChange}>
            {/* Whenever the value from Select matches the value from any 
                MenuItem, then the content inside MenuItem (Worldwide)
                 will be displayed*/};
          <MenuItem value="worldwide" >Worldwide</MenuItem>
              {countries.map((country) =>(
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
          </Select>
        </FormControl>
      </div>
        <div className="app_stats">
          <InfoBox 
          // onClickProp will send the function, e => setCaseesType('cases')
          // to InfoBox which will later be used for onClick mouse event
          // in Card.             
          onClickProp = {e => setCasesType('cases')}
          // if casesType is equal to cases then the property active is true
          active = {casesType === 'cases'}
          // isRed is a boolean type property
          isRed
          title="CoronaVirus Cases" 
          cases={prettyPrintStat(countryInfo.todayCases)}
          total= { prettyPrintStat(countryInfo.cases)} />
          
          <InfoBox 
          onClickProp = {e => setCasesType('recovered')}
          active = {casesType === 'recovered'}
          title="Recovered" 
          cases={ prettyPrintStat(countryInfo.todayRecovered)} 
          total= { prettyPrintStat(countryInfo.recovered)} />
          
          <InfoBox 
          onClickProp = {e => setCasesType('deaths')}
          active = {casesType === 'deaths'}
          isRed
          title="Deaths" 
          cases={ prettyPrintStat(countryInfo.todayDeaths)} 
          total= { prettyPrintStat(countryInfo.deaths)} />
        </div>
        <Map casesType={casesType} countries={mapCountries} center={mapCenter} zoom={mapZoom}/>
    </div>

    <Card className="app_right">
      <CardContent>
        <h3> Live Cases by Country </h3>
        <Table countries = {tableData} />
        {/* <h3> Worldwide new cases </h3> */}
        {/* <LineGraph casesType={"cases"} /> */}
      </CardContent>
    </Card>
    </div>
  );
}

export default App;
