import React from "react";
import { FaCloudSun, FaSearch } from "react-icons/fa";


const Weather = ({ weatherData }) => {
  if (!weatherData || !weatherData.weather) return null;

  return (

    <div className="flex flex-col gap-y-10 md:gap-y-16 items-center">
      <div className="flex flex-col md:flex-row gap-x-20 items-center">

            <div className="flex flex-col">
                <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="" />
                <p>Temperature: {weatherData.main?.temp}°C</p>
                <p className="capitalize opacity-80">
                {weatherData.weather[0].description}
               </p>
            </div>
            
             <div className="mt-15 text-white flex flex-col items-start gap-y-2">
                    <h1 className="text-4xl font-bold">Today</h1>
                    <  p className="text-3xl font-semibold">
                    {weatherData.name}, {weatherData.sys.country}
                    </p>

           </div>
         
         
         
         </div> 
        
    <div className=" flex justify-between p-5 py-7 md:flex-row flex-col w-full max-w-[700px] bg-white/30 backdrop-blur-md border border-white/40 rounded-3xl shadow-xl">
         <div className=" text-white ">
                <p className="flex ">Feel like: <p className="font-bold mx-2">{weatherData.main.feels_like.toFixed()}°C</p>   </p>
                <p className="flex ">Humidity: <p className="font-bold mx-2">{weatherData.main.humidity.toFixed()} %</p> </p>
                <p className="flex ">Wind Speed: <p className="font-bold mx-2">{weatherData.wind.speed.toFixed()} KPH</p></p>

                
       </div>
       <div className=" text-white mt-5  gap-y-1">
                <p>Sunset : {weatherData.sys.sunset.toFixed()}</p>
                <p>Sunrise: {weatherData.sys.sunrise.toFixed()}</p>
       </div>
    </div>
      
    </div>
    
  );
};

export default Weather;
