// ui.js
import { addFavorite, removeFavorite, isFavorite, getFavorites } from './storage.js';

const weatherContainer = document.querySelector('#current-weather');
const threeDayForecastContainer = document.getElementById('three-day-forecast');
const sevenDayForecastContainer = document.getElementById('seven-day-forecast');
const favoritesMenu = document.querySelector('#favorites-menu');
const favoritesToggle = document.querySelector('#favorites-toggle');

// Display current weather data for the UI
export function displayCurrentWeather(weatherData) {
    const iconCode = weatherData.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    weatherContainer.innerHTML = `
        <h2>${weatherData.name}</h2>
        <img src="${iconUrl}" alt="${weatherData.weather[0].description}" class="weather-icon">
        <p>${weatherData.weather[0].description}</p>
        <p>Temperature: ${weatherData.main.temp}°C</p>
        <p>Humidity: ${weatherData.main.humidity}%</p>
        <p>Wind Speed: ${weatherData.wind.speed} m/s</p>
        <button id="favorite-btn">${isFavorite(weatherData.name) ? 'Remove from' : 'Add to'} Favorites</button>
    `;

    document.getElementById('favorite-btn').addEventListener('click', () => {
        toggleFavorite(weatherData.name);
    });
}

// Display the 3-day forecast
export function displayThreeDayForecast(forecastData) {
    threeDayForecastContainer.innerHTML = '';
    forecastData.slice(0,).forEach(day => {
        const iconUrl = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
        const forecastHTML = `
            <div class="forecast-item">
                <p>${new Date(day.dt * 1000).toLocaleDateString()}</p>
                <img src="${iconUrl}" alt="${day.weather[0].description}">
                <p>${day.temp.day}°C</p>
            </div>
        `;
        threeDayForecastContainer.innerHTML += forecastHTML;
    });
}

// Display 7-day forecast
export function displaySevenDayForecast(forecastData) {
    sevenDayForecastContainer.innerHTML = '<h3>7-Day Forecast</h3>';
    forecastData.slice(0, 4).forEach(day => {
        const iconUrl = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
        const forecastHTML = `
            <div class="forecast-item">
                <p>${new Date(day.dt * 1000).toLocaleDateString()}</p>
                <img src="${iconUrl}" alt="${day.weather[0].description}">
                <p>${day.temp.day}°C</p>
            </div>
        `;
        sevenDayForecastContainer.innerHTML += forecastHTML;
    });
}

// Function: toggle location in favorites and update the button text
function toggleFavorite(location) {
    if (isFavorite(location)) {
        removeFavorite(location);
        document.getElementById('favorite-btn').textContent = 'Add to Favorites';
    } else {
        addFavorite(location);
        document.getElementById('favorite-btn').textContent = 'Remove from Favorites';
    }
    displayFavorites();
}

// Functino: Displays all favorite locations in the dropdown menu
export function displayFavorites() {
    favoritesMenu.innerHTML = '';
    const favorites = getFavorites();

    if (favorites.length === 0) {
        favoritesMenu.innerHTML = '<p>No favorites yet.</p>';
    } else {
        favorites.forEach(location => {
            const favElement = document.createElement('div');
            favElement.textContent = location;
            favElement.classList.add('favorite-item');
            favElement.addEventListener('click', () => {
                fetchWeatherByCity(location);
            });
            favoritesMenu.appendChild(favElement);
        });
    }
}

// For visibility of the dropdown menu
favoritesToggle.addEventListener('click', () => {
    const isVisible = favoritesMenu.style.display === 'block';
    favoritesMenu.style.display = isVisible ? 'none' : 'block';
});

// Display th error messages
export function displayError(message) {
    const errorContainer = document.querySelector('#error-message');
    errorContainer.textContent = message;
    errorContainer.style.display = 'block';
}

// Hide the error messages
export function hideError() {
    const errorContainer = document.querySelector('#error-message');
    errorContainer.style.display = 'none';
}
