// app.js
import { getCurrentWeather, getWeatherByCoords } from './modules/weatherService.js';
import { displayCurrentWeather, displayError } from './modules/ui.js';
import { handleApiError, handleGeolocationError } from './modules/errorHandler.js';
import { getUserCoordinates } from './modules/geolocation.js';

// Fetch and display weather by city
async function fetchAndDisplayWeather(city) {
    try {
        const weatherData = await getCurrentWeather(city);
        displayCurrentWeather(weatherData);
    } catch (error) {
        handleApiError(error);
    }
}

// Fetch and display weather by location (geolocation)
function fetchAndDisplayWeatherByLocation() {
    getUserCoordinates(
        async (latitude, longitude) => {
            try {
                const weatherData = await getWeatherByCoords(latitude, longitude);
                displayCurrentWeather(weatherData);
            } catch (error) {
                handleApiError(error);
            }
        },
        (error) => handleGeolocationError(error)
    );
}

// Fetch and display weather based on user-input coordinates
async function fetchAndDisplayWeatherByCoords() {
    const latitude = parseFloat(document.getElementById('latitude-input').value);
    const longitude = parseFloat(document.getElementById('longitude-input').value);

    // Validate coordinates
    if (isNaN(latitude) || isNaN(longitude)) {
        displayError('Please enter valid coordinates.');
        return;
    }
    if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
        displayError('Latitude must be between -90 and 90 and longitude between -180 and 180.');
        return;
    }

    try {
        const weatherData = await getWeatherByCoords(latitude, longitude);
        displayCurrentWeather(weatherData);
    } catch (error) {
        handleApiError(error);
    }
}

// Event listeners
document.getElementById('search-btn').addEventListener('click', () => {
    const city = document.getElementById('city-search').value;
    if (city) {
        fetchAndDisplayWeather(city);
    } else {
        displayError('Please enter a city name.');
    }
});

document.getElementById('location-btn').addEventListener('click', fetchAndDisplayWeatherByLocation);

document.getElementById('coord-search-btn').addEventListener('click', fetchAndDisplayWeatherByCoords);
