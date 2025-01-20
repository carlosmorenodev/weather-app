import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WeatherApp() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('Torremolinos');

 

  useEffect(() => {
    const apiKey = 'ffb6a4d88de64d339f3115612251501';
    //const apiKey = import.meta.env.VITE_API_KEY;
    
    //const city = 'Nueva York';


    //const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
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

    <div>
      {weatherData && (
        <>
          <input type="text" value={city} onChange={handleCityChange} />
          {weatherData ? (
            <div>
              <p>Última actualización: {weatherData.current.last_updated}</p>
              <p>{weatherData.location.localtime}</p>
              <h1>El clima en {weatherData.location.name}, {weatherData.location.region}</h1>
              <img src={weatherData.current.condition.icon} alt="" />
              <p>Temperatura: {weatherData.current.temp_c} °C</p>
              <p>Sensación térmica: {weatherData.current.feelslike_c} °C</p>
              <p>Humedad: {weatherData.current.humidity}%</p>
              <p>Viento: {weatherData.current.wind_kph} km/h </p>
              <p>Precipitaciones: {weatherData.current.precip_mm} mm</p>
              {/* <h1>El clima en {weatherData.name}</h1>
              <p>Temperatura: {weatherData.main.temp}°C</p>
              <p>Humedad: {weatherData.main.humidity}%</p> */}
              {/* Otros datos */}
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