import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CreditCard, CheckCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { motion } from 'framer-motion';

const Payment = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useAppContext();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handlePay = async () => {
        setLoading(true);
        // Simulate Backend API call
        setTimeout(() => {
            setLoading(false);
            // Navigate to confirmation with tripId and amount
            navigate(`/trip/${location.state?.tripId || '1'}/confirmed`, {
                state: {
                    tripId: location.state?.tripId || '1',
                    amount: location.state?.amount || 300
                }
            });
        }, 2000);
    };



    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-display font-bold mb-6">{t('paymentDetails')}</h2>
            <div className="glass-card p-6 mb-6">
                <h3 className="text-gray-400 mb-4 uppercase text-sm tracking-wider">{t('billBreakdown')}</h3>
                <div className="space-y-3">
                    <div className="flex justify-between">
                        <span>{t('totalCost')}</span>
                        <span>₹{(location?.state?.amount || 300) * 4}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>{t('splitRatio')} (4 Pax)</span>
                        <span>÷ 4</span>
                    </div>
                    <div className="h-px bg-white/10 my-2"></div>
                    <div className="flex justify-between text-xl font-bold text-secondary">
                        <span>{t('yourShare')}</span>
                        <span>₹{location?.state?.amount || 300}</span>
                    </div>
                </div>
            </div>

            <div className="glass-card p-6">
                <h3 className="text-gray-400 mb-4 uppercase text-sm tracking-wider">Payment Method</h3>
                <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 border border-secondary/50 bg-secondary/10 rounded-xl cursor-pointer">
                        <CreditCard className="text-secondary" />
                        <div className="flex-1">
                            <p className="font-bold">UPI / GPay / Paytm</p>
                            <p className="text-xs text-gray-400">Fastest method</p>
                        </div>
                        <div className="w-5 h-5 rounded-full border-2 border-secondary flex items-center justify-center">
                            <div className="w-2.5 h-2.5 rounded-full bg-secondary"></div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 border border-white/10 hover:bg-white/5 rounded-xl cursor-pointer transition-colors">
                        <CreditCard className="text-gray-400" />
                        <div className="flex-1">
                            <p className="font-bold text-gray-400">Credit / Debit Card</p>
                        </div>
                    </div>
                </div>

                <button
                    onClick={handlePay}
                    disabled={loading}
                    className="glass-btn w-full mt-8 flex justify-center"
                >
                    {loading ? t('processing') : `${t('paySecurely')} ₹${location?.state?.amount || 300}`}
                </button>
            </div>
        </div>
    );
};

export default Payment;
