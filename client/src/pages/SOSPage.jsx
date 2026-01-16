import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldAlert, Phone, CheckCircle, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const SOSPage = () => {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(3);
    const [active, setActive] = useState(false);
    const [notified, setNotified] = useState(false);

    useEffect(() => {
        let timer;
        if (countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        } else {
            setActive(true);
            // Simulate notifying contacts
            setTimeout(() => setNotified(true), 2000);
        }
        return () => clearTimeout(timer);
    }, [countdown]);

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
            {!active ? (
                <div className="space-y-8">
                    <h1 className="text-4xl font-display font-bold text-red-500">Sending Alert</h1>
                    <div className="relative flex items-center justify-center">
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 1 }}
                            className="w-48 h-48 rounded-full border-4 border-red-500/30 flex items-center justify-center"
                        >
                            <span className="text-8xl font-bold text-white">{countdown}</span>
                        </motion.div>
                    </div>
                    <button onClick={handleCancel} className="glass-btn bg-white/10 hover:bg-white/20">
                        Cancel Alert
                    </button>
                    <p className="text-gray-400">Notifying Emergency Contacts & Police</p>
                </div>
            ) : (
                <div className="space-y-6 w-full max-w-md">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-6 bg-red-600/20 border border-red-500 rounded-2xl flex flex-col items-center gap-4"
                    >
                        <ShieldAlert size={64} className="text-red-500 animate-pulse" />
                        <h2 className="text-2xl font-bold text-white">SOS ACTIVE</h2>
                        <p className="text-red-300">Your live location is being broadcasted.</p>
                    </motion.div>

                    <div className="glass-card p-6 text-left space-y-4">
                        <h3 className="font-bold border-b border-white/10 pb-2">Emergency Contacts</h3>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg"><Phone size={20} /></div>
                                <span>Police Control Room</span>
                            </div>
                            {notified && <CheckCircle size={18} className="text-green-400" />}
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-500/20 text-green-400 rounded-lg"><Phone size={20} /></div>
                                <span>Ambulance</span>
                            </div>
                            {notified && <CheckCircle size={18} className="text-green-400" />}
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-purple-500/20 text-purple-400 rounded-lg"><Phone size={20} /></div>
                                <span>Mom (Trusted)</span>
                            </div>
                            {notified && <CheckCircle size={18} className="text-green-400" />}
                        </div>
                    </div>

                    <div className="glass-card p-4 flex items-center gap-3">
                        <MapPin className="text-secondary" />
                        <div className="text-left">
                            <p className="text-xs text-gray-400">Current Location</p>
                            <p className="font-mono text-sm">12.9716° N, 77.5946° E</p>
                        </div>
                    </div>

                    <button onClick={handleCancel} className="glass-btn w-full bg-green-600/20 hover:bg-green-600/30 border-green-500/50 text-green-400">
                        I am Safe Now
                    </button>
                </div>
            )}
        </div>
    );
};

export default SOSPage;
