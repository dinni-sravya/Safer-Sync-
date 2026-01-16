import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Share2, Navigation, ShieldCheck, MapPin } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getCoordinates, getRoute } from '../services/RouteService';
import { useAppContext } from '../context/AppContext';

// Fix for default marker icon in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const RecenterMap = ({ from, to }) => {
    const map = useMap();
    useEffect(() => {
        if (from && to) {
            const bounds = L.latLngBounds([from, to]);
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [from, to, map]);
    return null;
};

const customIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

// Component to center map on coordinates
function MapCenter({ position }) {
    const map = useMap();
    useEffect(() => {
        map.setView(position, 10);
    }, [position, map]);
    return null;
}

const TripDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const locationState = useLocation().state; // Get passed state from TravelDetails
    const { t } = useAppContext();
    const [trip, setTrip] = useState(null);

    const [route, setRoute] = useState(null);

    useEffect(() => {
        // Prioritize fetching from backend to get latest members
        const fetchTrip = async () => {
            let tripData = null;

            if (locationState && locationState.id === 'custom') { // Handle legacy mock if needed
                tripData = {
                    id: 'custom',
                    from: locationState.from,
                    to: locationState.to,
                    date: locationState.date,
                    time: '09:00 AM',
                    driver: { name: 'Assigning...', rating: 0, vehicle: 'Pending' },
                    passengers: [{ name: 'You (Creator)', role: 'Admin', status: 'Confirmed' }],
                    womenOnly: locationState.womenOnly,
                    mood: locationState.mood,
                    status: 'Open',
                    total: 4,
                    cost: locationState.cost || 800 // Fallback
                };
            } else {
                try {
                    const res = await fetch(`http://localhost:5000/api/trips/${id}`);
                    if (res.ok) {
                        tripData = await res.json();
                        if (!tripData.passengers) tripData.passengers = [{ name: 'Host', role: 'Admin' }];
                    }
                } catch (err) {
                    console.error("Failed to fetch trip", err);
                }
            }

            if (tripData) {
                // Calculate Coordinates and Route
                const fromCoords = await getCoordinates(tripData.from);
                const toCoords = await getCoordinates(tripData.to);
                tripData.coords = { from: fromCoords, to: toCoords };

                const routeData = await getRoute(fromCoords, toCoords);
                setRoute(routeData);

                setTrip(tripData);
            }
        };
        fetchTrip();
    }, [id, locationState, setRoute]); // Added setRoute to dependencies

    if (!trip) return <div className="p-10 text-center">Loading Trip...</div>;

    const center = trip.coords ? [
        (trip.coords.from[0] + trip.coords.to[0]) / 2,
        (trip.coords.from[1] + trip.coords.to[1]) / 2
    ] : [12.9716, 77.5946];

    return (
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Main Itinerary */}
            <div className="md:col-span-2 space-y-6">
                {/* Map Component */}
                <div className="glass-card p-2 h-80 relative overflow-hidden rounded-2xl z-0">
                    <MapContainer
                        center={trip.coords.from} // Initial center, will be adjusted by RecenterMap
                        zoom={11} // Initial zoom, will be adjusted by RecenterMap
                        style={{ height: '100%', width: '100%', borderRadius: '12px' }}
                        zoomControl={false}
                    >
                        <TileLayer
                            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                        />
                        <Marker position={trip.coords.from} icon={customIcon}>
                            <Popup>From: {trip.from}</Popup>
                        </Marker>
                        <Marker position={trip.coords.to} icon={customIcon}>
                            <Popup>To: {trip.to}</Popup>
                        </Marker>
                        {route && <Polyline positions={route.geometry} color="#a855f7" weight={4} opacity={0.8} />}
                        <RecenterMap from={trip.coords.from} to={trip.coords.to} />
                    </MapContainer>

                    {/* Distance & Time Overlay */}
                    {route && (
                        <div className="absolute bottom-4 left-4 right-4 z-[1000]">
                            <div className="glass-card p-3 flex justify-between items-center text-sm bg-black/80 backdrop-blur-md border border-white/10">
                                <div className="flex flex-col">
                                    <span className="text-gray-400">Total Distance</span>
                                    <span className="font-bold text-white text-lg">{route.distance} km</span>
                                </div>
                                <div className="h-8 w-px bg-white/10"></div>
                                <div className="flex flex-col text-right">
                                    <span className="text-gray-400">Est. Time</span>
                                    <span className="font-bold text-secondary text-lg">{route.duration} min</span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="absolute top-4 right-4 z-[400] bg-black/50 p-2 rounded-full backdrop-blur-sm">
                        <Navigation size={20} className="text-secondary" />
                    </div>
                </div>

                <div className="glass-card p-6">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                        <MapPin size={18} className="text-secondary" /> {t('tripItinerary')}
                    </h3>
                    <div className="relative pl-6 border-l-2 border-white/10 space-y-8">
                        <div className="relative">
                            <div className="absolute -left-[31px] top-1 w-4 h-4 bg-secondary rounded-full border-2 border-black"></div>
                            <p className="text-sm text-gray-400">09:00 AM</p>
                            <p className="font-bold text-lg">{trip.from}</p>
                            <p className="text-xs text-gray-500">{t('fromLoc')}</p>
                        </div>
                        <div className="relative">
                            <div className="absolute -left-[31px] top-1 w-4 h-4 bg-white rounded-full border-2 border-black"></div>
                            <p className="text-sm text-gray-400">11:30 AM</p>
                            <p className="font-bold text-lg">{trip.to}</p>
                            <p className="text-xs text-gray-500">{t('destination')}</p>
                        </div>
                    </div>
                    {trip.womenOnly && (
                        <div className="mt-4 p-3 bg-pink-500/10 border border-pink-500/20 rounded-xl flex items-center gap-2">
                            <ShieldCheck size={18} className="text-pink-400" />
                            <span className="text-pink-400 text-sm font-semibold">Women Only Trip</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
                <div className="glass-card p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold">{t('teamMembers')}</h3>
                        <span className={`px-2 py-1 rounded text-xs font-bold ${trip.passengers.length >= trip.total ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'}`}>
                            {trip.passengers.length >= trip.total ? t('full') : t('open')}
                        </span>
                    </div>
                    <div className="space-y-4">
                        {trip.passengers.map((p, i) => (
                            <div key={i} className="flex items-center gap-3 border-b border-white/5 pb-2 last:border-0">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center font-bold text-white shadow-lg">
                                    {p.name[0]}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <p className="font-medium">{p.name}</p>
                                        {p.role === 'Admin' && <span className="text-[10px] bg-yellow-500/20 text-yellow-500 px-1.5 rounded border border-yellow-500/30">{t('admin')}</span>}
                                    </div>
                                    <p className="text-xs text-gray-400 flex gap-2">
                                        <span>{p.gender || 'N/A'}</span> • <span>{p.mood || 'Chill'}</span>
                                    </p>
                                </div>
                                {p.safety === 'Verified' && <ShieldCheck size={14} className="text-green-400" />}
                            </div>
                        ))}
                    </div>

                    {/* Admin Approval Toggle (Mock) */}
                    <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-sm text-gray-400">
                        <span>{t('adminApproval')}</span>
                        <div className="w-8 h-4 bg-secondary rounded-full relative cursor-pointer opacity-50"><div className="w-4 h-4 bg-white rounded-full absolute right-0"></div></div>
                    </div>
                </div>



                <div className="glass-card p-6">
                    <h3 className="font-bold mb-4">{t('vibeMood')}</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                        <span className="px-3 py-1 rounded-full bg-secondary/20 border border-secondary text-secondary text-sm">
                            {trip.mood || 'Chill'}
                        </span>
                    </div>

                    <button
                        onClick={() => navigate('/payment', { state: { amount: Math.floor(trip.cost / trip.total) || 300, tripId: id } })}
                        className="glass-btn w-full flex items-center justify-center gap-2"
                    >
                        <span>{t('confirmJoin')}</span>
                        <span className="bg-white/20 px-2 py-0.5 rounded text-sm">₹{Math.floor(trip.cost / trip.total) || 300}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TripDetails;
