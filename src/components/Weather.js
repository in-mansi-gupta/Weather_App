import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import './Weather.css';
import CityAutocomplete from './CityAutocomplete';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [units, setUnits] = useState('metric');
    const [error, setError] = useState(null);

    const API_KEY = "94e73ca305177de3a64552030e8fcc0b";

    const fetchWeatherData = useCallback(async () => {
        if (city === '') return;

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${API_KEY}`;

        try {
            const response = await axios.get(url);
            setWeatherData(response.data);
            setError(null);
        } catch (error) {
            console.error("Error fetching weather data:", error);
            setError("Failed to fetch weather data. Please try again.");
        }
    }, [city, units, API_KEY]);

    useEffect(() => {
        fetchWeatherData();
    }, [fetchWeatherData]);

    return (
        <div className="weather-container">
            <div className="search">
                <CityAutocomplete setCity={setCity} />
                <button onClick={fetchWeatherData}>Check!</button>
            </div>
            <div className="units">
                <input
                    type="radio"
                    id="celsius"
                    name="units"
                    value="metric"
                    checked={units === 'metric'}
                    onChange={() => setUnits('metric')}
                />
                <label htmlFor="celsius">Celsius</label>
                <input
                    type="radio"
                    id="fahrenheit"
                    name="units"
                    value="imperial"
                    checked={units === 'imperial'}
                    onChange={() => setUnits('imperial')}
                />
                <label htmlFor="fahrenheit">Fahrenheit</label>
            </div>
            {error && <p className="error-message">{error}</p>}
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
    );
};

export default Weather;
