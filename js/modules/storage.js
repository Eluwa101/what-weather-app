// storage.js

const favoritesKey = 'weatherAppFavorites';

export function getFavorites() {
    const favorites = localStorage.getItem(favoritesKey);
    return favorites ? JSON.parse(favorites) : [];
}

export function addFavorite(location) {
    const favorites = getFavorites();
    if (!favorites.includes(location)) {
        favorites.push(location);
        localStorage.setItem(favoritesKey, JSON.stringify(favorites));
    }
}

export function removeFavorite(location) {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter(fav => fav !== location);
    localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites));
}

export function isFavorite(location) {
    const favorites = getFavorites();
    return favorites.includes(location);
}
