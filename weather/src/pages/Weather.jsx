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
          <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-cyan-400 to-indigo-600">

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

            <div className='text-8xl font-light text-gray-200 my-8'>{selectedLocation || "Bangalore"}</div>

            <div className="flex flex-row space-x-4 w-full justify-center items-center space-x-10">
              <div>
                <img
                  src={weatherData.current.condition.icon}
                  alt={weatherData.current.condition.text}
                  height={"77px"}
                  width={"75px"}
                />
              </div>
              <div className='text-white font-light text-6xl'>
                <div className='my-4'>
                  <div className='text-center'>{weatherData.current.temp_c}°C</div>
                  <div className='text-center text-4xl'>{weatherData.current.condition.text}</div>
                </div>

                <div className='my-4'>
                  <div className='text-xl justify-between flex space-x-2'>
                    <div>Humidity:</div>
                    <div>{weatherData.current.humidity}%</div>
                  </div>
                  <div className='text-xl justify-between flex '>
                    <div>Wind: </div>
                    <div>{weatherData.current.wind_kph}KPH</div>
                  </div>
                </div>


              </div>
            </div>

            <div>

            </div>

          </div>
        </>
      ) : (
        'Loading weather...'
      )}
    </>
  );
};

export default Weather;
