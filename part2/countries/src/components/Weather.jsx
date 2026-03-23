import { useState, useEffect } from "react";
import service from '../services/service.js'

const Weather = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const lat = country.capitalInfo.latlng[0];
    const long = country.capitalInfo.latlng[1];
    service.getWeather(lat, long).then((weather) => setWeather(weather));
  }, [country]);

  return (
    <div>
      <h2>Weather for {country.capital[0]}</h2>
      <div>
        <p>Temperature: {weather ? weather.main.temp : null} ° Celsius</p>
        <img src={weather ?  `https://openweathermap.org/payload/api/media/file/${weather.weather[0].icon}.png` : null} alt={weather ? weather.weather[0].description: null} />
        <p>Wind: {weather ? weather.wind.speed : null} km/h</p>
      </div>
    </div>
  );
};

export default Weather;