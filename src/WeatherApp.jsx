import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './weatherApp.css';

//Icons
import { FaWind } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import { LiaThermometerHalfSolid } from "react-icons/lia";
import { IoUmbrella } from "react-icons/io5";




function WeatherApp() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('Torremolinos');



  useEffect(() => {
    const apiKey = 'ffb6a4d88de64d339f3115612251501';
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;


    axios.get(apiUrl)
      .then(response => {
        setWeatherData(response.data);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  }, [city]);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  }

  return (

    <div className='weather-app-container'>
      {weatherData && (
        <>
          <input type="text" value={city} onChange={handleCityChange} />
          {weatherData ? (
            <div className='current-weather'>
              <h1>{weatherData.location.name}, {weatherData.location.region}</h1>
              <p className='temperature'>{weatherData.current.temp_c} °C</p>
              <img className='weather-img' src={weatherData.current.condition.icon} alt="" />
              
              <div className="weather-info">
                <p><LiaThermometerHalfSolid /> {weatherData.current.feelslike_c} °C</p>
                <p><WiHumidity /> {weatherData.current.humidity}%</p>
                <p><FaWind /> {weatherData.current.wind_kph} km/h </p>
                <p><IoUmbrella /> {weatherData.current.precip_mm} mm</p>
                
              </div>

              {/* <p>Última actualización: {weatherData.current.last_updated}</p>
              <p>{weatherData.location.localtime}</p> */}
            </div>

          ) : (
            <p>Cargando...</p>
          )}

          <p>Powered by <a href="https://www.weatherapi.com/" title="Free Weather API">WeatherAPI.com</a></p>


        </>
      )}
    </div>


  );
}

export default WeatherApp;