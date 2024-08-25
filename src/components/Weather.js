import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import './Weather.css';
import CityAutocomplete from './CityAutocomplete';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [units, setUnits] = useState('metric');
    const [error, setError] = useState(null);
    const [backgroundImage, setBackgroundImage] = useState(''); 

    const API_KEY = "YOUR_OpenWeatherMap_API_KEY";
    const UNSPLASH_API_KEY = "YOUR_UNSPLASH_API_KEY"; 

    const fetchWeatherData = useCallback(async () => {
        if (city === '') return;

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${API_KEY}`;

        try {
            const response = await axios.get(url);
            setWeatherData(response.data);
            setError(null);
            fetchBackgroundImage(response.data.weather[0].description);
        } catch (error) {
            console.error("Error fetching weather data:", error);
            setError("Failed to fetch weather data. Please try again.");
        }
    }, [city, units]);

    const fetchBackgroundImage = async (description) => {
        const query = encodeURIComponent(description);
        const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${UNSPLASH_API_KEY}&orientation=landscape`;

        try {
            const response = await axios.get(url);
            const imageUrl = response.data.results[0]?.urls?.regular;
            setBackgroundImage(imageUrl || '');
        } catch (error) {
            console.error("Error fetching background image:", error);
        }
    };

    useEffect(() => {
        fetchWeatherData();
    }, [fetchWeatherData]);

    return (
        <div className="weather-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="weather-container">
            <h1>Check the weather forecast.</h1>
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
        </div>
    );
};

export default Weather;
