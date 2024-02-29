// services/captureService.js
const cityService = require('./cityService');
const vehicleService = require('./vehicleService');
const fugitiveService = require('./fugitiveService');

function handleCaptureRequest(req, res) {
    // Ensure that req.body has copSelections and it's an array
    const copSelections = req.body && Array.isArray(req.body.copSelections) ? req.body.copSelections : [];

    if (copSelections.length === 0) {
        return res.status(400).json({ error: 'No cop selections provided' });
    }

    // Validation variables
    let citySet = new Set(); // To track selected cities for uniqueness
    let vehicleMap = new Map(); // To track selected vehicles and their counts

    let fugitiveLocation = fugitiveService.simulateFugitiveLocation();
    let capturingCop = null;

    // Iterate over cop selections
    for (const cop of copSelections) {
        const { name, city, vehicle } = cop;
        const chosenCity = cityService.cities.find(c => c.name === city);
        const chosenVehicle = vehicleService.vehicles.find(v => v.type === vehicle);

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
}

module.exports = {
    handleCaptureRequest
};
