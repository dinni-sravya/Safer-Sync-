import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Phone, ArrowRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const Login = () => {
    const navigate = useNavigate();
    const { t } = useAppContext();
    const [mobile, setMobile] = useState('');
    const [showOtp, setShowOtp] = useState(false);
    const [otp, setOtp] = useState('');

    const handleSendOtp = () => {
        if (mobile.length >= 10) {
            setShowOtp(true);
        } else {
            alert(t('alertInvalidMobile')); // Using t() for alert message
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        // This handleLogin is now specifically for OTP verification
        if (otp.length === 4) { // Mock validation
            navigate('/language');
        } else {
            alert(t('alertInvalidOtp')); // Using t() for alert message
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] relative z-10">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-8 w-full max-w-md relative z-10"
            >
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-display font-bold mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">{t('loginTitle')}</h1>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    {!showOtp ? (
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400 ml-1">{t('enterMobile')}</label>
                            <div className="input-field flex items-center gap-3">
                                <Phone size={20} className="text-gray-400" />
                                <input
                                    type="tel"
                                    placeholder="98765 43210"
                                    className="bg-transparent outline-none w-full text-lg"
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                    required
                                />
                            </div>
                            <button
                                type="button"
                                onClick={handleSendOtp}
                                disabled={!mobile || mobile.length < 10}
                                className="glass-btn w-full mt-4"
                            >
                                {t('getOtp')}
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <label className="text-sm text-gray-400 ml-1">{t('otpPlaceholder')}</label>
                            <div className="input-field flex items-center justify-center gap-2">
                                <input
                                    type="text"
                                    placeholder="• • • •"
                                    className="bg-transparent outline-none w-full text-center text-2xl tracking-widest"
                                    maxLength={4}
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    autoFocus
                                    required
                                />
                            </div>
                            <button type="submit" disabled={otp.length !== 4} className="glass-btn w-full group">
                                {t('verifyLogin')}
                                <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowOtp(false)}
                                className="text-xs text-gray-400 underline hover:text-white mt-2"
                            >
                                {t('changeNumber')}
                            </button>
                        </div>
                    )}
                </form>

                <div className="mt-6 text-sm text-gray-500">
                    <p>By continuing, you agree to our Terms & Safety Guidelines.</p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
