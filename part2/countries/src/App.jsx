import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import service from "./services/service.js";

const App = () => {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState(countries);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => setCountries(response.data));
  }, []);

  let result = <p>Enter a Country</p>;
  if (filteredCountries.length > 10) {
    result = <p>Too many matches, specify another filter</p>;
  } else if (filteredCountries.length === 1) {
    result = <CountryDetail country={filteredCountries[0]} />;
  } else {
    result = <CountryList countries={filteredCountries} />;
  }

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilter(value);
    setFilteredCountries(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(value.toLowerCase()),
      ),
    );
  };

  return (
    <div>
      <Filter value={filter} onChange={handleFilterChange} />
      <Result value={result} />
    </div>
  );
};

const Filter = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="countries">Find Countries:</label>
      <input type="text" value={value} onChange={onChange} />
    </div>
  );
};

const Result = ({ value }) => {
  return <div>{value}</div>;
};

const CountryList = ({ countries }) => {
  return (
    <ul>
      {countries.map((country) => (
        <CountryListItem key={country.name.common} country={country} />
      ))}
    </ul>
  );
};

const CountryListItem = ({ country }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <li key={country.name.common}>
      {country.name.common}
      <button onClick={handleExpand}>{expanded ? "Hide" : "Show"}</button>
      {!expanded ? null : <CountryDetail country={country} />}
    </li>
  );
};

const CountryDetail = ({ country }) => {
  const altText = `Flag of ${country.name.common}`;
  return (
    <div>
      <div>
        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital[0]}</p>
        <p>Area: {country.area}</p>
      </div>
      <div>
        <h2>Languages</h2>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={altText} />
        <Weather country={country} />
      </div>
    </div>
  );
};

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

export default App;
