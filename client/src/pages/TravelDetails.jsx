import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, User, Calendar, ShieldCheck, Music, Mic2, AlertCircle, Coins, Languages } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const TravelDetails = () => {
    const navigate = useNavigate();
    const { location, updateLocation, t } = useAppContext();
    const [date, setDate] = useState('2026-01-15');
    const [womenOnly, setWomenOnly] = useState(false);
    const [mood, setMood] = useState('Chill');
    const [language, setLanguage] = useState('English');
    const [budget, setBudget] = useState('2500');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/groups', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    from: location.pickup,
                    to: location.drop,
                    date,
                    womenOnly,
                    mood,
                    language,
                    cost: budget,
                    time: '09:00 AM' // Default for now
                })
            });

            if (response.ok) {
                // Navigate to search page to see the new group listed immediately
                navigate('/search');
            }
        } catch (error) {
            console.error("Failed to create group", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-display font-bold mb-2">{t('createGroupTitle')}</h2>
            <p className="text-gray-400 mb-6">{t('enterDetails')}</p>

            <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">

                {/* Location Section */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-300 border-b border-white/10 pb-2">{t('routeDetails')}</h3>
                    <div className="space-y-2">
                        <label className="text-sm text-gray-400">{t('fromLoc')}</label>
                        <div className="input-field flex items-center gap-2">
                            <MapPin size={18} className="text-secondary" />
                            <input
                                type="text"
                                placeholder={t('enterPickup')}
                                value={location.pickup}
                                onChange={(e) => updateLocation('pickup', e.target.value)}
                                className="bg-transparent outline-none w-full"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-gray-400">{t('toLoc')}</label>
                        <div className="input-field flex items-center gap-2">
                            <MapPin size={18} className="text-secondary" />
                            <input
                                type="text"
                                placeholder={t('enterDrop')}
                                value={location.drop}
                                onChange={(e) => updateLocation('drop', e.target.value)}
                                className="bg-transparent outline-none w-full"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Schedule & Budget */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm text-gray-400">{t('dateJourney')}</label>
                        <div className="input-field flex items-center gap-2">
                            <Calendar size={18} className="text-secondary" />
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="bg-transparent outline-none w-full"
                                required
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm text-gray-400">{t('approxBudget')}</label>
                        <div className="input-field flex items-center gap-2">
                            <Coins size={18} className="text-secondary" />
                            <input
                                type="number"
                                value={budget}
                                onChange={(e) => setBudget(e.target.value)}
                                className="bg-transparent outline-none w-full"
                                placeholder="₹ 2500"
                            />
                        </div>
                    </div>
                </div>

                {/* Preferences */}
                <div className="space-y-4 pt-2">
                    <h3 className="text-lg font-semibold text-gray-300 border-b border-white/10 pb-2">{t('groupPref')}</h3>

                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${womenOnly ? 'bg-pink-500/20 text-pink-400' : 'bg-gray-700/50 text-gray-400'}`}>
                                <ShieldCheck size={24} />
                            </div>
                            <div>
                                <p className="font-semibold">{t('womenOnly')}</p>
                                <p className="text-xs text-gray-400">{t('womenOnlyDesc')}</p>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" checked={womenOnly} onChange={() => setWomenOnly(!womenOnly)} />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
                        </label>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-gray-400">{t('prefLang')}</label>
                        <div className="input-field flex items-center gap-2">
                            <Languages size={18} className="text-secondary" />
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="bg-transparent outline-none w-full bg-black"
                            >
                                <option>English</option>
                                <option>Hindi</option>
                                <option>Kannada</option>
                                <option>Telugu</option>
                                <option>Tamil</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-gray-400">{t('vibeMood')}</label>
                        <div className="grid grid-cols-3 gap-2">
                            {['Chill', 'Talkative', 'Silent', 'Music', 'Songs', 'Business'].map((m) => (
                                <button
                                    key={m}
                                    type="button"
                                    onClick={() => setMood(m)}
                                    className={`p-2 text-sm rounded-lg border transition-all ${mood === m
                                        ? 'bg-secondary/20 border-secondary text-secondary'
                                        : 'border-white/10 hover:bg-white/5 text-gray-400'
                                        }`}
                                >
                                    {m}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="pt-4">
                    <button type="submit" disabled={loading} className="glass-btn w-full flex justify-center items-center gap-2">
                        {loading ? t('processing') : t('continueBtn')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TravelDetails;
