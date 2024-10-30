// errorHandler.js
import { displayError } from './ui.js';

export function handleApiError(error) {
    console.error('API Error:', error);
    displayError('');
}

export function handleGeolocationError(error) {
    console.error('Geolocation Error:', error);
    switch (error.code) {
        case error.PERMISSION_DENIED:
            displayError('Location access denied. Please enable location access.');
            break;
        case error.POSITION_UNAVAILABLE:
            displayError('Location information is unavailable.');
            break;
        case error.TIMEOUT:
            displayError('Request timed out. Please try again.');
            break;
        default:
            displayError('An unknown error occurred with geolocation.');
            break;
    }
}
