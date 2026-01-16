import React, { createContext, useContext, useState, useEffect } from 'react';

import { translations } from '../utils/translations';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => localStorage.getItem('saferSync_lang') || 'en');
    const [location, setLocation] = useState(() => {
        try {
            const saved = localStorage.getItem('saferSync_loc');
            return saved ? JSON.parse(saved) : { pickup: '', drop: '' };
        } catch (e) {
            console.error("Failed to parse location from storage", e);
            return { pickup: '', drop: '' };
        }
    });

    useEffect(() => {
        localStorage.setItem('saferSync_lang', language);
    }, [language]);

    useEffect(() => {
        localStorage.setItem('saferSync_loc', JSON.stringify(location));
    }, [location]);

    const updateLocation = (key, value) => {
        setLocation(prev => ({ ...prev, [key]: value }));
    };

    const t = (key) => {
        return translations[language]?.[key] || translations['en'][key] || key;
    };

    return (
        <AppContext.Provider value={{ language, setLanguage, location, setLocation, updateLocation, t }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
