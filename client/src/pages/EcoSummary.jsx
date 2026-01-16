
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, Wind, Droplets, Wallet, Share2, Home } from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ icon: Icon, label, value, unit, color, delay }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay, duration: 0.4 }}
        className={`glass-card p-6 flex flex-col items-center justify-center gap-4 border border-${color}-500/20`}
    >
        <div className={`w-16 h-16 rounded-full bg-${color}-500/10 flex items-center justify-center text-${color}-400`}>
            <Icon size={32} />
        </div>
        <div className="text-center">
            <p className={`text-3xl font-bold text-${color}-400`}>{value} <span className="text-sm text-gray-400">{unit}</span></p>
            <p className="text-sm text-gray-500 uppercase tracking-wider mt-1">{label}</p>
        </div>
    </motion.div>
);

const EcoSummary = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/api/eco-impact')
            .then(res => res.json())
            .then(data => setStats(data))
            .catch(err => console.error(err));
    }, []);

    if (!stats) return <div className="text-white text-center p-10">Calculating Impact...</div>;

    return (
        <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-[-20%] right-[-20%] w-[60%] h-[60%] bg-green-500/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="z-10 w-full max-w-md space-y-8">
                <header className="text-center space-y-2 mt-8">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 px-4 py-1.5 rounded-full border border-green-500/20 mb-4"
                    >
                        <Leaf size={16} />
                        <span className="text-xs font-bold uppercase tracking-wider">Eco Warrior</span>
                    </motion.div>
                    <h1 className="text-4xl font-display font-bold">Your Impact</h1>
                    <p className="text-gray-400">By choosing to pool, you've made a difference.</p>
                </header>

                <div className="grid grid-cols-1 gap-4">
                    <StatCard
                        icon={Wind}
                        label="CO₂ Emissions Saved"
                        value={stats.co2Saved}
                        unit="kg"
                        color="green"
                        delay={0.1}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <StatCard
                            icon={Droplets}
                            label="Fuel Saved"
                            value={stats.fuelSaved}
                            unit="L"
                            color="blue"
                            delay={0.2}
                        />
                        <StatCard
                            icon={Wallet}
                            label="Money Saved"
                            value={stats.moneySaved}
                            unit="₹"
                            color="yellow"
                            delay={0.3}
                        />
                    </div>
                </div>

                <div className="glass-card p-6 text-center space-y-4">
                    <p className="text-lg font-bold">You saved the equivalent of {stats.trees} Trees! 🌳</p>
                    <button className="w-full glass-btn flex items-center justify-center gap-2 group">
                        <Share2 size={18} />
                        <span>Share Achievement</span>
                    </button>
                    <button
                        onClick={() => navigate('/search')}
                        className="w-full py-4 rounded-xl text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-2"
                    >
                        <Home size={18} />
                        <span>Back to Home</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EcoSummary;
