import React, { useState, useEffect } from "react";
import ForecastCard from "./components/ForecastCard";
import { FaCloudSun, FaSearch } from "react-icons/fa";
import axios from "axios";
import Weather from "./components/Weather.jsx";

export default function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const API_KEY = "ebbecde0aa81b8da203d4b97d30b5036";

  // URL generator helper to include units=metric
  const getUrl = (loc) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${API_KEY}&units=metric`;

  // Fetch Phnom Penh weather on mount (default)
  useEffect(() => {
    axios.get(getUrl("Phnom Penh"))
      .then((response) => {
        setData(response.data);
        console.log("Default data loaded:", response.data);
      })
      .catch((error) => {
        console.error("Failed to load default weather:", error);
      });
  }, []);

  // Search location handler
  const searchLocation = (event) => {
  if (event.key === "Enter" && location.trim() !== "") {

    // Fetch current weather
    axios.get(getUrl(location))
      .then((response) => {
        setData(response.data);
        console.log("Search data loaded:", response.data);
      })
      .catch((error) => {
        console.error("Search failed:", error);
        setData({}); // clear data on error
      });

    // Fetch forecast
    axios.get(getForecastUrl(location))
      .then((response) => {
        // Pick one forecast per day (12:00 PM)
        const dailyForecasts = response.data.list.filter(item =>
          item.dt_txt.includes("12:00:00")
        );
        setForecast(dailyForecasts);
        console.log("Forecast data loaded:", dailyForecasts);
      })
      .catch((error) => console.error("Forecast fetch failed:", error));

    setLocation(""); 
  }
};

  {/**forecasting */}
  const [forecast, setForecast] = useState([]);

const getForecastUrl = (loc) =>
  `https://api.openweathermap.org/data/2.5/forecast?q=${loc}&appid=${API_KEY}&units=metric`;

useEffect(() => {
  // Fetch forecast for Phnom Penh
  axios.get(getForecastUrl("Phnom Penh"))
    .then((response) => {
      const dailyForecasts = response.data.list.filter(item =>
        item.dt_txt.includes("12:00:00") // pick 12 PM forecasts
      );
      setForecast(dailyForecasts);
      console.log("Forecast data:", dailyForecasts);
    })
    .catch((error) => console.error(error));
}, []);

{/**aefa */}
const handleSearch = () => {
  if (location.trim() === "") return;

  // Fetch current weather
  axios.get(getUrl(location))
    .then((response) => {
      setData(response.data);
      console.log("Search data loaded:", response.data);
    })
    .catch((error) => {
      console.error("Search failed:", error);
      setData({});
    });

  // Fetch forecast
  axios.get(getForecastUrl(location))
    .then((response) => {
      const dailyForecasts = response.data.list.filter(item =>
        item.dt_txt.includes("12:00:00")
      );
      setForecast(dailyForecasts);
      console.log("Forecast data loaded:", dailyForecasts);
    })
    .catch((error) => console.error("Forecast fetch failed:", error));

  setLocation("");
};



  return (

  <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-amber-800">


      <div className="flex gap-x-8 flex-col md:flex-row border-none p-6 md:p-15 bg-white/10 backdrop-blur-lg rounded-4xl text-white shadow-lg w-full max-w-6xl">

    {/**center div */}
    <div className="bg-white/20 backdrop-blur-lg rounded-4xl p-6 text-white shadow-xl flex-1 border-none">

        {/* Search bar */}
        <div className="flex items-center bg-white/30 rounded-3xl px-3 py-2">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Search city..."
            className="bg-transparent flex-1 outline-none placeholder-white text-white"
            onKeyDown={searchLocation}
          />
          <FaSearch className="opacity-80" onClick={handleSearch} />
        </div>

        {/* Weather Info */}
        <Weather weatherData={data} />

        
      </div>
       <div className="flex flex-col md:w-50 w-full mb-6 md:mb-0 md:mr-6 items-start">
          <div className="font-serif font-bold text-xl  m-4 ">Forecast</div>
          
              <div className="grid grid-rows-4 md:grid-rows-4 grid-cols-4 md:grid-cols-1 gap-3 w-full">
                 {forecast.map((item, index) => (
                    <ForecastCard
                      key={index}
                      day={new Date(item.dt_txt).toLocaleDateString("en-US", { weekday: "short" })}
                      temp={`${Math.round(item.main.temp)}°`}
                      icon={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                    />
                  ))}
                </div>
        </div>
     

      
      </div>
      
    </div>
  );
}
