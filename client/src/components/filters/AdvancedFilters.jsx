import React, { useState, useEffect } from 'react';
import { Filter, X, MapPin, Calendar, DollarSign, Users } from 'lucide-react';

const AdvancedFilters = ({ filters, setFilters, onClose }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="glass-card p-6 mt-4 relative animate-in fade-in slide-in-from-top-4">
            <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
            >
                <X size={18} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">

                {/* Location Filters */}
                <div className="space-y-3">
                    <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                        <MapPin size={14} className="text-secondary" /> Location
                    </label>
                    <input
                        type="text"
                        name="from"
                        placeholder="From (e.g., HSR Layout)"
                        value={filters.from || ''}
                        onChange={handleChange}
                        className="input-field text-sm"
                    />
                    <input
                        type="text"
                        name="to"
                        placeholder="To (e.g., Nandi Hills)"
                        value={filters.to || ''}
                        onChange={handleChange}
                        className="input-field text-sm"
                    />
                </div>

                {/* Date & Budget */}
                <div className="space-y-3">
                    <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                        <Calendar size={14} className="text-secondary" /> Date & Budget
                    </label>
                    <input
                        type="date"
                        name="date"
                        value={filters.date || ''}
                        onChange={handleChange}
                        className="input-field text-sm"
                    />
                    <div className="flex gap-2">
                        <input
                            type="number"
                            name="minCost"
                            placeholder="Min ₹"
                            value={filters.minCost || ''}
                            onChange={handleChange}
                            className="input-field text-sm"
                        />
                        <input
                            type="number"
                            name="maxCost"
                            placeholder="Max ₹"
                            value={filters.maxCost || ''}
                            onChange={handleChange}
                            className="input-field text-sm"
                        />
                    </div>
                </div>

                {/* Preferences */}
                <div className="space-y-3">
                    <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                        <Users size={14} className="text-secondary" /> Preferences
                    </label>
                    <select
                        name="language"
                        value={filters.language || ''}
                        onChange={handleChange}
                        className="input-field text-sm bg-black option:bg-black"
                    >
                        <option value="">Any Language</option>
                        <option value="English">English</option>
                        <option value="Hindi">Hindi</option>
                        <option value="Kannada">Kannada</option>
                        <option value="Telugu">Telugu</option>
                        <option value="Tamil">Tamil</option>
                    </select>

                    <select
                        name="safety"
                        value={filters.safety || ''}
                        onChange={handleChange}
                        className="input-field text-sm bg-black"
                    >
                        <option value="">Safety Level</option>
                        <option value="Standard">Standard</option>
                        <option value="Verified Driver">Verified Driver</option>
                        <option value="All Women">All Women Group</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default AdvancedFilters;
