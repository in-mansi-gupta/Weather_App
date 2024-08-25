import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Weather.css'

const Weather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [units, setUnits] = useState('metric');

    const handleCheckButton = async () => {
        if (city === '')
            return;

        const API_KEY = "94e73ca305177de3a64552030e8fcc0b";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${API_KEY}`;

        try {
            const response = await axios.get(url);
            setWeatherData(response.data);
        } catch (error) {
            console.error("Error fetching weather data: " + error);
        }
    };

    useEffect(() => {
        if (weatherData) {
            handleCheckButton();
        }
      }, [units]);
    

    return (
        <div className="weather-container">
            <div className="search">
                <input  type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="City"
                />
                <button onClick={handleCheckButton}>Check!</button>
            </div>
            <div>
                <input type="radio" id="celsius" name="units" value="metric" checked={units === 'metric'} onChange={() => setUnits('metric')}/>
                <label htmlFor="celsius">Celsius</label>
                <input type="radio" id="fahrenheit" name="units" value="imperial" checked={units === 'imperial'} onChange={() => setUnits('imperial')} />
                <label htmlFor="fahrenheit">Fahrenheit</label>
            </div>
            {weatherData && (
                <div className="weather-info">
                    <h2>{weatherData.name}, {weatherData.sys.country}</h2>
                    <p>Current temperature: {weatherData.main.temp}°{units === 'metric' ? 'C' : 'F'}</p>
                    <p>Feels like: {weatherData.main.feels_like}°{units === 'metric' ? 'C' : 'F'}</p>
                    <p>Max: {weatherData.main.temp_max}°{units === 'metric' ? 'C' : 'F'}, Min: {weatherData.main.temp_min}°{units === 'metric' ? 'C' : 'F'}</p>
                    <p>{weatherData.weather[0].description}</p>
                </div>
            )}
        </div>
    )
};

export default Weather;