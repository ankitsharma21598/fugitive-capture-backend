// services/fugitiveService.js
const { getAllCities } = require('./cityService');

function simulateFugitiveLocation() {
    const cities = getAllCities(); // Retrieve all cities
    if (cities.length === 0) {
        console.error("No cities found.");
        return null;
    }

    const randomIndex = Math.floor(Math.random() * cities.length);
    return cities[randomIndex].name;
}

module.exports = {
    simulateFugitiveLocation
};
