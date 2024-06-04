const Country = ({ country }) => {
    return (
      <div>
        <h1>{country.name.common}</h1>
        <div>capital {country.capital && country.capital[0]}</div>
        <div>population {country.population}</div>
        <h2>languages</h2>
        <ul>
          {country.languages && Object.values(country.languages).map(language =>
            <li key={language}>{language}</li>
          )}
        </ul>
        <img src={country.flags.png} alt={`flag of ${country.name.common}`} width="100" />
      </div>
    );
  };
  
export default Country;