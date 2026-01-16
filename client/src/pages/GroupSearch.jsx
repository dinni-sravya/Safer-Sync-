import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, Users, Calendar, Clock, MapPin, ShieldCheck, Heart, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AdvancedFilters from '../components/filters/AdvancedFilters';
import { useAppContext } from '../context/AppContext';

const MOODS = ['Chill', 'Business', 'Party', 'Women-Comfort', 'Silent'];

const GroupSearch = () => {
    const navigate = useNavigate();
    const { location: userLocation, t } = useAppContext();
    const [groups, setGroups] = useState([]);

    // Quick Filters
    const [womenOnly, setWomenOnly] = useState(false);
    const [filterMood, setFilterMood] = useState('All');
    const [selectedMood, setSelectedMood] = useState('');

    // Advanced Filters State
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [filters, setFilters] = useState({
        from: '', to: '', date: '',
        minCost: '', maxCost: '',
        language: '', safety: ''
    });

    // Debounce Advanced Filters
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchGroups();
        }, 500); // 500ms debounce
        return () => clearTimeout(timeoutId);
    }, [womenOnly, selectedMood, filters]);

    const fetchGroups = async () => {
        try {
            const params = new URLSearchParams();
            if (womenOnly) params.append('womenOnly', 'true');
            if (selectedMood) params.append('mood', selectedMood);

            // Append advanced filters
            Object.keys(filters).forEach(key => {
                if (filters[key]) params.append(key, filters[key]);
            });

            const res = await fetch(`http://localhost:5000/api/groups?${params.toString()}`);
            if (res.ok) {
                const data = await res.json();
                setGroups(data);
            }
        } catch (error) {
            console.error("Failed to fetch groups", error);
        }
    };

    const isFilterApplied = womenOnly || selectedMood || Object.values(filters).some(val => val);

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-3xl font-display font-bold mb-2">{t('findGroups')}</h2>
                    <p className="text-gray-400">
                        {userLocation?.pickup && userLocation?.drop
                            ? `${userLocation.pickup} → ${userLocation.drop}`
                            : t('enterDetails')
                        }
                    </p>
                </div>
                <button
                    onClick={() => navigate('/travel-details')}
                    className="glass-btn text-sm px-4 py-2"
                >
                    + {t('createGroupBtn')}
                </button>
            </div>

            <div className="glass-card p-6 mb-8">
                <div className="flex flex-col md:flex-row gap-6 justify-between items-center">

                    {/* Women Only Toggle */}
                    <div className="flex items-center gap-3">
                        <span className={`font-medium ${womenOnly ? 'text-pink-400' : 'text-gray-400'}`}>{t('womenOnly')}</span>
                        <button
                            onClick={() => setWomenOnly(!womenOnly)}
                            className={`w-14 h-7 rounded-full relative transition-colors duration-300 ${womenOnly ? 'bg-pink-600 shadow-[0_0_10px_#db2777]' : 'bg-gray-700'}`}
                        >
                            <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all duration-300 ${womenOnly ? 'left-8' : 'left-1'}`}></div>
                        </button>
                    </div>

                    {/* Mood Filters */}
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        {MOODS.map(mood => (
                            <button
                                key={mood}
                                onClick={() => setSelectedMood(selectedMood === mood ? '' : mood)}
                                className={`px-4 py-1 rounded-full text-sm border transition-all ${selectedMood === mood
                                    ? 'bg-secondary/20 border-secondary text-secondary shadow-[0_0_10px_rgba(168,85,247,0.3)]'
                                    : 'border-white/10 hover:bg-white/5 text-gray-400'
                                    }`}
                            >
                                {mood}
                            </button>
                        ))}
                    </div>

                    {/* Advanced Filter Button */}
                    <button
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        className={`p-3 rounded-xl transition-all border ${showAdvanced ? 'bg-secondary/20 border-secondary text-secondary' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                    >
                        <SlidersHorizontal size={20} />
                    </button>
                </div>

                {/* Collapsible Advanced Filters */}
                <AnimatePresence>
                    {showAdvanced && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <AdvancedFilters
                                filters={filters}
                                setFilters={setFilters}
                                onClose={() => setShowAdvanced(false)}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="space-y-4">
                {groups.length === 0 ? (
                    <div className="text-center py-10 text-gray-400">
                        <p className="text-xl">{isFilterApplied ? t('noMatch') : t('noGroups')}</p>
                    </div>
                ) : (
                    groups.map((group) => (
                        <motion.div
                            key={group.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass-card p-6 flex flex-col md:flex-row justify-between items-center hover:border-secondary/30 transition-all group"
                        >
                            <div className="flex-1 w-full md:w-auto">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-lg font-bold">{group.from}</span>
                                    <span className="text-gray-500">→</span>
                                    <span className="text-lg font-bold">{group.to}</span>
                                </div>
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-400 mb-3">
                                    <span className="flex items-center gap-1"><Calendar size={14} /> {group.date}</span>
                                    <span className="flex items-center gap-1"><Clock size={14} /> {group.time}</span>
                                    <span className="px-2 py-0.5 rounded bg-white/5 text-xs border border-white/10">{group.mood}</span>
                                    {group.language && <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-xs border border-blue-500/20">{group.language}</span>}
                                    {group.womenOnly && <span className="px-2 py-0.5 rounded bg-pink-500/10 text-pink-400 text-xs border border-pink-500/20">Women Only</span>}
                                </div>
                                <div className="flex items-center justify-between md:justify-start gap-4">
                                    <div className="flex items-center gap-2">
                                        <div className="flex -space-x-2">
                                            {[...Array(group.pooled)].map((_, i) => (
                                                <div key={i} className="w-8 h-8 rounded-full bg-gray-600 border-2 border-black flex items-center justify-center text-xs">U{i + 1}</div>
                                            ))}
                                        </div>
                                        <span className="text-sm text-gray-400 ml-2">{group.pooled}/{group.total}</span>
                                    </div>
                                    {group.safety && <span className="text-xs text-green-400 flex items-center gap-1"><ShieldCheck size={12} /> {group.safety}</span>}
                                </div>
                            </div>

                            <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto mt-4 md:mt-0 gap-3">
                                <span className="text-2xl font-bold text-secondary">{t('cost')}{group.cost}</span>
                                <button
                                    onClick={() => navigate(`/trip/${group.id}`)}
                                    className="glass-btn px-8"
                                >
                                    {t('join')}
                                </button>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
};

export default GroupSearch;
