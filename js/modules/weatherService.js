// weatherService.js

const apiKey = '5f00e39a78a9a5377b98ed1479277065';
const baseUrl = 'https://api.openweathermap.org/data/2.5/';

export async function getCurrentWeather(city) {
    const url = `${baseUrl}weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('City not found');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching current weather:', error);
        throw error;
    }
}

export async function getWeatherByCoords(lat, lon) {
    const url = `${baseUrl}weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Location not found');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather by coordinates:', error);
        throw error;
    }
}

export async function getForecast(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Forecast data not available');
        const data = await response.json();
        return data.daily;
    } catch (error) {
        console.error('Error fetching forecast data:', error);
        throw error;
    }
}
