// services/vehicleService.js
const vehicles = [
    { type: 'EV Bike', range: 60, count: 2 },
    { type: 'EV Car', range: 100, count: 1 },
    { type: 'EV SUV', range: 120, count: 1 }
];

function getAllVehicles() {
    return vehicles;
}

module.exports = {
    vehicles,
    getAllVehicles
};
