import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi' },
    { code: 'te', name: 'Telugu' },
    { code: 'ta', name: 'Tamil' },
    { code: 'kn', name: 'Kannada' },
    { code: 'bn', name: 'Bengali' },
    { code: 'mr', name: 'Marathi' },
    { code: 'gu', name: 'Gujarati' },
];

const LanguageSelect = () => {
    const navigate = useNavigate();
    const { setLanguage, t } = useAppContext();

    const handleSelect = (lang) => {
        setLanguage(lang.code);
        navigate('/travel-details');
    };

    return (
        <div className="max-w-4xl mx-auto py-10">
            <h2 className="text-3xl font-display font-bold text-center mb-2">{t('chooseLanguage')}</h2>
            <p className="text-center text-gray-400 mb-10">{t('selectPref')}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {languages.map((lang, index) => (
                    <motion.button
                        key={lang.code}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleSelect(lang)}
                        className="glass-card p-6 text-xl font-semibold hover:bg-primary/20 hover:border-secondary/50 transition-all flex items-center justify-center min-h-[120px]"
                    >
                        {lang.name}
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

export default LanguageSelect;
