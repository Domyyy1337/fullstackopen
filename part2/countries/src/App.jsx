import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const App = () => {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState([]);

  let result = <p>Enter a Country</p>;
  if (countries.length > 10) {
    result = <p>Too many matches, specify another filter</p>;
  } else if (countries.length === 1) {
    result = <CountryDetail country={countries[0]} />;
  } else {
    result = <CountryList countries={countries} />;
  }

  const handleFilterChange = async (event) => {
    const value = event.target.value;
    setFilter(event.target.value);
    const filtered = await getCountries(value);
    setCountries(filtered);
  };

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
        <CountryListItem country={country} />
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
      </div>
    </div>
  );
};

export default App;
