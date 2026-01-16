import React, { useEffect, useState } from 'react';
import EcoImpactCard from '../components/EcoImpactCard';

const EcoImpact = () => {
    // In a real app, you might fetch specific user impact here
    // For now, we reuse the card which simulates data
    return (
        <div className="max-w-4xl mx-auto py-8">
            <h1 className="text-3xl font-display font-bold mb-6 text-center">Your Contribution</h1>
            <p className="text-center text-gray-400 mb-8">
                See how your shared rides are saving the planet 🌍
            </p>
            <EcoImpactCard />
        </div>
    );
};

export default EcoImpact;
