// geolocation.js

export function getUserCoordinates(callback, errorCallback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                callback(latitude, longitude);
            },
            (error) => {
                console.error('Geolocation Error:', error);
                if (errorCallback) errorCallback(error);
            }
        );
    } else {
        console.error('Geolocation is not supported by this browser.');
        if (errorCallback) errorCallback(new Error('Geolocation not supported'));
    }
}
