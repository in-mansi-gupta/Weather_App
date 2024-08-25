Weather Application

Overview
The Weather Application is a React-based web app that provides real-time weather information for cities around the world. Users can search for a city and view current weather conditions, including temperature, humidity, and weather description. The app also features dynamic background changes based on the current weather, using images fetched from Unsplash.

Features
City Search: Type in a city name to get current weather information.
Temperature Units: Toggle between Celsius and Fahrenheit.
Dynamic Backgrounds: The background image of the app changes based on the weather description, using Unsplash API for image fetching.
Error Handling: Displays error messages if weather data cannot be fetched.

Technologies Used
React: For building the user interface.
Axios: For making HTTP requests to the OpenWeatherMap API and Unsplash API.
CSS: For styling the application.
OpenWeatherMap API: To fetch weather data.
Unsplash API: To fetch weather-related background images.

Usage
Search for a City: Enter a city name in the search box and click "Check!" to fetch weather data.
Select Temperature Units: Choose between Celsius and Fahrenheit using the radio buttons.
View Weather Information: Current temperature, feels like temperature, and weather description will be displayed.
Dynamic Background: The background image changes based on the weather description.
Project Structure
src/: Contains the source code for the application.
components/: Includes reusable React components like CityAutocomplete.
Weather.js: Main component for fetching and displaying weather data.
CityAutocomplete.js: Component for city name autocomplete functionality.
Weather.css: CSS for styling the weather component.
CityAutocomplete.css: CSS for styling the autocomplete component.
.env: Environment file for API keys (not included in version control).
package.json: Contains project dependencies and scripts.
Contributing
Contributions are welcome! Please open an issue or submit a pull request to contribute to this project. Follow the standard GitHub workflow:

Fork the repository.
Create a new branch (git checkout -b feature-branch).
Make your changes.
Commit your changes (git commit -am 'Add new feature').
Push to the branch (git push origin feature-branch).
Open a pull request.
