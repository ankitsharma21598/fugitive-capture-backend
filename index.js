// index.js

// Required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Data structures for cities and vehicles
const cities = [
    { name: 'Yapkashnagar', distance: 60 },
    { name: 'Lihaspur', distance: 50 },
    { name: 'Narmis City', distance: 40 },
    { name: 'Shekharvati', distance: 30 },
    { name: 'Nuravgram', distance: 20 }
];

const vehicles = [
    { type: 'EV Bike', range: 60, count: 2 },
    { type: 'EV Car', range: 100, count: 1 },
    { type: 'EV SUV', range: 120, count: 1 }
];

// Function to simulate fugitive's location
function simulateFugitiveLocation() {
    // Choose a random city index
    const randomIndex = Math.floor(Math.random() * cities.length);
    return cities[randomIndex].name;
}

// Route to handle cop selections and determine capture result
app.post('/capture', (req, res) => {
    // Ensure that req.body has copSelections and it's an array
    const copSelections = req.body && Array.isArray(req.body.copSelections) ? req.body.copSelections : [];

    if (copSelections.length === 0) {
        return res.status(400).json({ error: 'No cop selections provided' });
    }

    // Validation variables
    let citySet = new Set(); // To track selected cities for uniqueness
    let vehicleMap = new Map(); // To track selected vehicles and their counts

    let fugitiveLocation = simulateFugitiveLocation();
    let capturingCop = null;

    // Iterate over cop selections
    for (const cop of copSelections) {
        const { name, city, vehicle } = cop;
        const chosenCity = cities.find(c => c.name === city);
        const chosenVehicle = vehicles.find(v => v.type === vehicle);

        // Check if city is already selected by another cop
        if (citySet.has(city)) {
            return res.json({ message: `City ${city} is already selected by another cop` });
        }
        citySet.add(city); // Add city to the set

        // Check if vehicle count is exceeded
        if (vehicleMap.has(vehicle)) {
            if (vehicleMap.get(vehicle) >= chosenVehicle.count) {
                return res.json({ message: `Vehicle ${vehicle} count exceeded` });
            }
            vehicleMap.set(vehicle, vehicleMap.get(vehicle) + 1); // Increment vehicle count
        } else {
            vehicleMap.set(vehicle, 1); // Initialize vehicle count
        }

        // Check if cop can reach the city with chosen vehicle and if the fugitive is in that city
        if (chosenCity && chosenVehicle && chosenCity.distance <= chosenVehicle.range && city === fugitiveLocation) {
            capturingCop = cop; // Assign the capturing cop details
            break; // Found the capturing cop, exit the loop
        }
    }

    // If capturingCop is still null, no cop captured the fugitive
    if (!capturingCop) {
        return res.json({ message: 'Fugitive not captured' });
    }

    // Return details of the capturing cop
    res.json({ capturingCop });
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
