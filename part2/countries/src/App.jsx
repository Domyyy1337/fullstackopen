import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import CountryList from "./components/CountryList.jsx";
import CountryDetail from "./components/CountryDetail.jsx";

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
  } else if (filteredCountries.length > 1) {
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

export default App;
