import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, DollarSign, Fuel, Trees } from 'lucide-react';

const Stat = ({ icon: Icon, value, label, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        className="flex flex-col items-center bg-white/5 p-4 rounded-xl border border-white/5 hover:bg-white/10 transition-colors"
    >
        <div className="p-3 bg-primary/20 rounded-full mb-2 text-secondary shadow-[0_0_10px_rgba(168,85,247,0.3)]">
            <Icon size={24} />
        </div>
        <span className="text-2xl font-bold font-display text-white">{value}</span>
        <span className="text-xs text-gray-400 uppercase tracking-wider">{label}</span>
    </motion.div>
);

const EcoImpactCard = () => {
    // In a real app, these would come from the backend or props
    // We'll simulate a fetching effect or just load static for now
    const stats = {
        co2: "12.5 kg",
        money: "₹450",
        fuel: "5.2 L",
        trees: "2"
    };

    return (
        <div className="glass-card p-6 w-full max-w-4xl mx-auto mt-8 border-t-4 border-t-primary relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

            <div className="flex flex-col md:flex-row justify-between items-center mb-6 relative z-10">
                <h2 className="text-xl font-bold font-display flex items-center gap-2">
                    <Leaf className="text-green-400" /> Your Eco Impact
                </h2>
                <span className="text-sm text-gray-400">Total savings this month</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
                <Stat icon={Fuel} value={stats.co2} label="CO₂ Saved" delay={0.1} />
                <Stat icon={DollarSign} value={stats.money} label="Money Saved" delay={0.2} />
                <Stat icon={Fuel} value={stats.fuel} label="Fuel Saved" delay={0.3} />
                <Stat icon={Trees} value={stats.trees} label="Trees Planted" delay={0.4} />
            </div>
        </div>
    );
};

export default EcoImpactCard;
