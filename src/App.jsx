import React, { useState, useEffect } from "react";
import ForecastCard from "./components/ForecastCard";
import { FaCloudSun, FaSearch } from "react-icons/fa";
import axios from "axios";
import Weather from "./components/Weather.jsx";

export default function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [forecast, setForecast] = useState([]);
  const [geolocationData, setGeolocationData] = useState(null);

  const API_KEY = "ebbecde0aa81b8da203d4b97d30b5036";

   
  const getUrl = (lat, lon) =>
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  
  const getForecastUrl = (lat, lon) =>
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

   
  useEffect(() => {
   
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setGeolocationData({ lat, lon });
 
          axios
            .get(getUrl(lat, lon))
            .then((response) => {
              setData(response.data);
              console.log("Weather data loaded for geolocation:", response.data);
            })
            .catch((error) => {
              console.error("Failed to load weather data for geolocation:", error);
            });
 
          axios
            .get(getForecastUrl(lat, lon))
            .then((response) => {
               
              const dailyForecasts = response.data.list.filter((item) =>
                item.dt_txt.includes("12:00:00")
              );
              setForecast(dailyForecasts);
              console.log("Forecast data loaded:", dailyForecasts);
            })
            .catch((error) => console.error("Failed to fetch forecast data:", error));
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []); 
  const handleSearch = () => {
    if (location.trim() === "") return;

     
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`)
      .then((response) => {
        setData(response.data);
        console.log("Search data loaded:", response.data);
      })
      .catch((error) => {
        console.error("Search failed:", error);
        setData({});
      });

 
    axios
      .get(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}&units=metric`)
      .then((response) => {
        const dailyForecasts = response.data.list.filter((item) =>
          item.dt_txt.includes("12:00:00")
        );
        setForecast(dailyForecasts);
        console.log("Forecast data loaded:", dailyForecasts);
      })
      .catch((error) => console.error("Forecast fetch failed:", error));

    setLocation(""); 
  };



  
  return (

    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[url('/assets/image.png')]">
      <div className="flex gap-x-8 flex-col md:flex-row border-none p-6 md:p-15   w-full max-w-6xl">
        {/* Center div */}
        <div className="  rounded-4xl p-6 text-white shadow-xl flex-1 border-none">
          {/* Search bar */}
          <div className="flex items-center bg-white/30 rounded-3xl px-3 py-2">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Search city..."
              className="bg-transparent flex-1 outline-none placeholder-white text-white "
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <FaSearch className="opacity-80" onClick={handleSearch} />
          </div>

          {/* Weather Info */}
          <Weather weatherData={data} />
        </div>

        {/* Forecast */}
        <div className="flex flex-col md:w-50 w-full mb-6 md:mb-0 md:mr-6 items-start">
          <div className="font-serif font-bold text-xl m-4">Forecast</div>
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
