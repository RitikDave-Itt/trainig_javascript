"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import the necessary library for fetching weather data
const weatherApi_1 = require("./weatherApi"); // Replace with your actual API call
// Get DOM elements
const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchButton');
const weatherInfo = document.getElementById('weatherInfo');
// Event listener for the search button
searchButton.addEventListener('click', () => {
    const city = cityInput.value;
    // Fetch weather data
    (0, weatherApi_1.getWeatherData)(city)
        .then(weatherData => {
        // Display weather information
        weatherInfo.innerHTML = `
        <h2>${weatherData.name}</h2>
        <p>Temperature: ${weatherData.main.temp}°C</p>
        <p>Description: ${weatherData.weather[0].description}</p>
        <!-- Add more weather details as needed -->
      `;
    })
        .catch(error => {
        console.error('Error fetching weather data:', error);
        weatherInfo.innerHTML = '<p>Error fetching weather data. Please try again.</p>';
    });
});
