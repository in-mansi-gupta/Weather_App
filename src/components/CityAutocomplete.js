import React, { useState, useCallback } from 'react';
import axios from 'axios';
import './CityAutocomplete.css';

const CityAutocomplete = ({ setCity }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [input, setInput] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(-1); // Track focused index for keyboard navigation

  const API_KEY = "94e73ca305177de3a64552030e8fcc0b";

  const fetchSuggestions = useCallback(async (query) => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`);
      setSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching city suggestions:', error);
      setSuggestions([]);
    }
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
    fetchSuggestions(value);
  };

  const handleSelect = (city) => {
    setInput(city.name);
    setCity(city.name);
    setSuggestions([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      setFocusedIndex((prevIndex) => Math.min(prevIndex + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      setFocusedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === 'Enter') {
      if (focusedIndex >= 0) {
        handleSelect(suggestions[focusedIndex]);
      }
    }
  };

  return (
    <div className="autocomplete-container">
      <input
        type="text"
        placeholder="Enter city name"
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => fetchSuggestions(input)}
      />
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSelect(suggestion)}
              className={index === focusedIndex ? 'focused' : ''}
            >
              {suggestion.name}, {suggestion.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CityAutocomplete;
