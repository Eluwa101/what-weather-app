// ui.js

export function displayCurrentWeather(weatherData) {
    const weatherContainer = document.querySelector('#current-weather');
    weatherContainer.innerHTML = `
        <h2>${weatherData.name}</h2>
        <p>${weatherData.weather[0].description}</p>
        <p>Temperature: ${weatherData.main.temp}°C</p>
        <p>Humidity: ${weatherData.main.humidity}%</p>
        <p>Wind Speed: ${weatherData.wind.speed} m/s</p>
    `;
    addWeatherAnimation(weatherData.weather[0].main);
}

function addWeatherAnimation(condition) {
    const weatherContainer = document.querySelector('#current-weather');
    weatherContainer.classList.remove('rain', 'clear', 'clouds');
    switch (condition.toLowerCase()) {
        case 'rain':
            weatherContainer.classList.add('rain');
            break;
        case 'clear':
            weatherContainer.classList.add('clear');
            break;
        case 'clouds':
            weatherContainer.classList.add('clouds');
            break;
    }
}

export function displayError(message) {
    const errorContainer = document.querySelector('#error-message');
    errorContainer.textContent = message;
    errorContainer.style.display = 'block';
}

export function hideError() {
    const errorContainer = document.querySelector('#error-message');
    errorContainer.style.display = 'none';
}
