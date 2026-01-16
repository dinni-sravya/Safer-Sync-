
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MessageCircle, Phone, ShieldAlert, Navigation, Leaf, Share2, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Fix for default marker icon in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Car Icon
const carIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/3202/3202926.png', // Premium car icon
    iconSize: [38, 38],
    iconAnchor: [19, 19],
    popupAnchor: [0, -20]
});

const LiveDashboard = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [liveData, setLiveData] = useState(null);
    const [sosActive, setSosActive] = useState(false);

    // Mock moving car (Interpolation)
    const [carPos, setCarPos] = useState([12.9716, 77.5946]);

    useEffect(() => {
        // Fetch initial live status
        fetch(`http://localhost:5000/api/trips/${id}/live`)
            .then(res => res.json())
            .then(data => {
                setLiveData(data);
                if (data.driverLocation) setCarPos(data.driverLocation);
            })
            .catch(err => console.error(err));

        // Simulate movement
        const interval = setInterval(() => {
            setCarPos(prev => [
                prev[0] + 0.0001, // Move slightly North
                prev[1] + 0.0001  // Move slightly East
            ]);
        }, 3000);

        return () => clearInterval(interval);
    }, [id]);

    if (!liveData) return <div className="p-10 text-center text-white">Connecting to Live Server...</div>;

    return (
        <div className="h-screen w-full relative flex flex-col bg-black overflow-hidden">
            {/* Map Background */}
            <div className="absolute top-0 left-0 w-full h-[65%] z-0">
                <MapContainer
                    center={carPos}
                    zoom={15}
                    style={{ height: '100%', width: '100%' }}
                    zoomControl={false}
                >
                    <TileLayer
                        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                        attribution='&copy; CARTO'
                    />
                    <Marker position={carPos} icon={carIcon}>
                        <Popup>
                            <div className="text-black text-center">
                                <p className="font-bold">{liveData.driver.vehicle}</p>
                                <p className="text-xs">{liveData.driver.name}</p>
                            </div>
                        </Popup>
                    </Marker>
                </MapContainer>

                {/* Floating Map Controls */}
                <div className="absolute top-4 left-4 z-[999] flex flex-col gap-2">
                    <button onClick={() => navigate('/search')} className="bg-black/80 p-2 rounded-full text-white border border-white/10 backdrop-blur-md">
                        <Navigation size={20} className="rotate-180" />
                    </button>
                </div>
            </div>

            {/* Bottom Dashboard Panel */}
            <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                className="absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-t from-black via-black/95 to-transparent z-10 pt-10 px-6 pb-6 flex flex-col justify-end"
            >
                {/* Driver & ETA Card */}
                <div className="glass-card p-4 mb-4 border-t border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-secondary"></div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gray-800 border border-white/10 flex items-center justify-center overflow-hidden">
                                <span className="font-bold text-lg">RK</span>
                            </div>
                            <div>
                                <p className="font-bold text-lg">{liveData.driver.name}</p>
                                <p className="text-gray-400 text-xs">{liveData.driver.vehicle} • ⭐ {liveData.driver.rating}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-bold text-secondary">{liveData.eta}</p>
                            <p className="text-xs text-gray-400">Arriving in</p>
                        </div>
                    </div>
                </div>

                {/* Quick Actions Grid */}
                <div className="grid grid-cols-4 gap-4">
                    <button
                        onClick={() => navigate(`/trip/${id}/chat`)}
                        className="flex flex-col items-center gap-2 group"
                    >
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-green-500/20 transition-all border border-white/5">
                            <MessageCircle size={20} className="text-green-400" />
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Chat</span>
                    </button>

                    <button
                        onClick={() => navigate(`/trip/${id}/eco-summary`)}
                        className="flex flex-col items-center gap-2 group"
                    >
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-all border border-white/5">
                            <Leaf size={20} className="text-blue-400" />
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Eco</span>
                    </button>

                    <button
                        onClick={() => setSosActive(true)}
                        className="flex flex-col items-center gap-2 group col-span-2"
                    >
                        <div className="w-full h-12 rounded-full bg-red-500/20 flex items-center justify-center gap-2 border border-red-500/50 animate-pulse">
                            <ShieldAlert size={20} className="text-red-500" />
                            <span className="text-red-500 font-bold text-sm">SOS / PANIC</span>
                        </div>
                    </button>
                </div>
            </motion.div>

            {/* SOS Modal */}
            <AnimatePresence>
                {sosActive && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute top-0 left-0 w-full h-full bg-black/90 z-[1000] flex flex-col items-center justify-center p-6 backdrop-blur-xl"
                    >
                        <div className="w-24 h-24 rounded-full bg-red-500/20 flex items-center justify-center mb-6 animate-ping">
                            <ShieldAlert size={40} className="text-red-500" />
                        </div>
                        <h2 className="text-4xl font-bold text-red-500 mb-2">SOS TRIGGERED</h2>
                        <p className="text-gray-400 text-center mb-8">Location broadcasting to 3 Emergency Contacts and Nearby Police.</p>

                        <div className="flex flex-col w-full gap-4">
                            <button onClick={() => setSosActive(false)} className="bg-white text-black font-bold py-4 rounded-xl">
                                I'M SAFE (CANCEL)
                            </button>
                            <button className="bg-red-600 text-white font-bold py-4 rounded-xl border border-red-500">
                                CALL POLICE (100)
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LiveDashboard;
