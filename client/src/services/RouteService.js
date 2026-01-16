
// Simple cache to prevent excessive API calls
const routeCache = {};

// Mock coordinates for fallback/demo
const CITY_COORDS = {
    'bangalore': [12.9716, 77.5946],
    'bengaluru': [12.9716, 77.5946],
    'malleswaram': [13.0031, 77.5643],
    'airport': [13.1986, 77.7066], // KIA
    'kempegowda': [13.1986, 77.7066],
    'nandi hills': [13.3702, 77.6835],
    'mysore': [12.2958, 76.6394],
    'hsr layout': [12.9121, 77.6446],
    'koramangala': [12.9352, 77.6245],
    'whitefield': [12.9698, 77.7500],
    'indiranagar': [12.9719, 77.6412]
};

export const getCoordinates = async (placeName) => {
    const key = placeName.toLowerCase();

    // Check known mock locations first
    for (const [name, coords] of Object.entries(CITY_COORDS)) {
        if (key.includes(name)) return coords;
    }

    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(placeName)}`);
        const data = await response.json();
        if (data && data.length > 0) {
            return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
        }
    } catch (error) {
        console.error("Geocoding failed", error);
    }

    // Default fallback (Bangalore center)
    return [12.9716, 77.5946];
};

export const getRoute = async (fromCoords, toCoords) => {
    const key = `${fromCoords.join(',')}-${toCoords.join(',')}`;
    if (routeCache[key]) return routeCache[key];

    try {
        // OSRM Public API (Driving)
        const url = `https://router.project-osrm.org/route/v1/driving/${fromCoords[1]},${fromCoords[0]};${toCoords[1]},${toCoords[0]}?overview=full&geometries=geojson`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.code === 'Ok' && data.routes.length > 0) {
            const route = data.routes[0];
            const result = {
                distance: (route.distance / 1000).toFixed(1), // km
                duration: (route.duration / 60).toFixed(0), // minutes
                geometry: route.geometry.coordinates.map(c => [c[1], c[0]]) // Flip to [lat, lng] for Leaflet
            };
            routeCache[key] = result;
            return result;
        }
    } catch (error) {
        console.error("Routing failed", error);
    }

    // Fallback: Haversine distance and straight line
    return {
        distance: calculateHaversine(fromCoords, toCoords),
        duration: 45, // Mock
        geometry: [fromCoords, toCoords]
    };
};

function calculateHaversine(coords1, coords2) {
    const toRad = (x) => x * Math.PI / 180;
    const R = 6371; // km

    const dLat = toRad(coords2[0] - coords1[0]);
    const dLon = toRad(coords2[1] - coords1[1]);
    const lat1 = toRad(coords1[0]);
    const lat2 = toRad(coords2[0]);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return (R * c).toFixed(1);
}
