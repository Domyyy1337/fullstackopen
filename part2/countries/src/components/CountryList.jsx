import { useState } from "react";
import CountryDetail from "./CountryDetail";

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

export default CountryList;