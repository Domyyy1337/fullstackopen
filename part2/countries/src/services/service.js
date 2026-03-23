import axios from "axios";

const getWeather = async (lat, long) => {
  const request = axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${import.meta.env.VITE_API_KEY}&units=metric`,
  );
  const result = await request;
  const weather = await result.data;
  console.log(weather);
  return weather;
};

export default {
  getWeather,
};
