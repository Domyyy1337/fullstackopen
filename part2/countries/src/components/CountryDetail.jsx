import Weather from "./Weather";

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

export default CountryDetail;