import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useFrappeGetDocList } from 'frappe-react-sdk';

const Weather = () => {
  const [location, setLocation] = useState('Bengaluru'); // Initial location
  const [selectedLocation, setSelectedLocation] = useState(''); // Selected location from dropdown
  const [weatherData, setWeatherData] = useState(null); // Weather data
  const API_KEY = '70549d2e6eb149f788262334230712';

  const { data, error, isLoading, mutate } = useFrappeGetDocList('Weather App', {
    fields: ['city', 'country', 'state'],
  });

  // Update selected location state
  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  // Update weather data based on selected location
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${selectedLocation || location},India&aqi=no`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchWeather();
  }, [selectedLocation, location]);

  return (
    <>
      {weatherData ? (
        <>
          <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-4">Weather</h1>
            <div className="flex flex-row items-center">
              <select
                className="border rounded shadow p-2"
                onChange={handleLocationChange}
              >
                <option value="">Select Location</option>
                {data &&
                  data.map((location) => (
                    <option key={location.name} value={location.name}>
                      {location.name}, {location.country}
                    </option>
                  ))}
              </select>
             
            </div>
            <div className="flex flex-col items-center mt-4">
              <h3 className="text-2xl font-bold">{weatherData.current.condition.text}</h3>
              <img
                src={weatherData.current.condition.icon}
                alt={weatherData.current.condition.text}
              />
              <p className="text-lg">
                Temperature: {weatherData.current.temp_c}°C
              </p>
            </div>
            <div>Humidity: {weatherData.current.humidity}</div>
            <div>Wind: {weatherData.current.wind_kph}</div>
          </div>
        </>
      ) : (
        'Loading weather...'
      )}
    </>
  );
};

export default Weather;
