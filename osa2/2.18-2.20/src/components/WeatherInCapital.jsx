const WeatherInCapital = ({ weather }) => {
    if (!weather || !weather.weather || !weather.main) {
      return <div>Weather data is not available.</div>;
    }
  
    return (
      <div>
        <h2>Weather in {weather.name}</h2>
        <div><strong>temperature:</strong> {weather.main.temp} Celsius</div>
        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
        <div><strong>wind:</strong> {weather.wind.speed} m/s direction {weather.wind.deg}°</div>
      </div>
    );
  };

export default WeatherInCapital;