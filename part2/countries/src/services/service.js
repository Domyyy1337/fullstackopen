import axios from "axios";

const getCountries = async (filter) => {
  const request = axios.get(
    "https://studies.cs.helsinki.fi/restcountries/api/all",
  );
  const result = await request;
  const countries = await result.data;
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase()),
  );
  console.log(filteredCountries);
  return filteredCountries;
};

const getWeather = async (lat, long) => {
  const request = axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${import.meta.env.VITE_API_KEY}`,
  );
  const result = await request;
  const weather = await result;
  console.log(weather);
};

export default {
  getCountries,
  getWeather,
};
