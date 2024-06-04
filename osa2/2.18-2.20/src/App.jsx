import { useState, useEffect } from 'react';
import axios from 'axios';
import Country from './components/Country';
import WeatherInCapital from './components/WeatherInCapital';



const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');
  const [showCountry, setShowCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState(null);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setShowCountry(null);
    setWeather(null);
  };

  const handleShowCountry = (country) => {
    setShowCountry(country);
    setWeather(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://studies.cs.helsinki.fi/restcountries/api/all');
        console.log('Fetched countries:', response.data);
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
        alert('Failed to fetch countries data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      if (showCountry) {
        const apiKey = '84b8949cdec6f38f42ad2263082eb836';
        const capital = showCountry.capital[0];

        console.log(`Fetching weather for ${capital}`);
        
        try {
          const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`);
          console.log('Fetched weather:', response.data);
          setWeather(response.data);
        } catch (error) {
          console.error('Error fetching weather:', error);
          alert('Failed to fetch weather data. Please try again later.');
        }
      }
    };

    fetchWeather();
  }, [showCountry]);

  useEffect(() => {
    if (filteredCountries.length === 1) {
      setShowCountry(filteredCountries[0]);
    }
  }, [filter, countries]); // Runs whenever filter or countries change

  const filteredCountries = countries.filter(country => 
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <div>
        find countries <input value={filter} onChange={handleFilterChange} />
      </div>
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            {filteredCountries.length > 10
              ? 'Too many matches, specify another filter'
              : filteredCountries.length === 1
                ? null
                : filteredCountries.map(country =>
                  <div key={country.name.common}>
                    {country.name.common}
                    <button onClick={() => handleShowCountry(country)}>show</button>
                  </div>
                )
            }
          </>
        )}
      </div>
      <div>
        {showCountry && <Country country={showCountry} />}
        {weather && <WeatherInCapital weather={weather} />}
      </div>
    </div>
  );
};

export default App;
