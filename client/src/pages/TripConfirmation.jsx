
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, MapPin, Clock, Calendar, User } from 'lucide-react';

const TripConfirmation = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { tripId, amount } = location.state || { tripId: '1', amount: 800 }; // Fallback

    const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen bg-black text-white p-6 pb-24 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[100px]"></div>
            </div>

            <motion.div
                initial="hidden"
                animate="visible"
                variants={variants}
                transition={{ duration: 0.5 }}
                className="z-10 w-full max-w-md"
            >
                <div className="glass-card p-8 flex flex-col items-center text-center space-y-6 border border-green-500/30 shadow-[0_0_50px_rgba(34,197,94,0.2)]">

                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50"
                    >
                        <CheckCircle size={64} className="text-black" />
                    </motion.div>

                    <div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
                            Trip Confirmed!
                        </h2>
                        <p className="text-gray-400 mt-2">Your payment of ₹{amount} was successful.</p>
                    </div>

                    <div className="w-full bg-white/5 rounded-xl p-4 space-y-4">
                        <h3 className="text-left text-sm font-bold text-gray-500 uppercase tracking-wider">Trip Details</h3>

                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                                <User size={20} />
                            </div>
                            <div className="text-left">
                                <p className="text-sm text-gray-400">Driver</p>
                                <p className="font-bold">Rajesh Kumar</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                                <Clock size={20} />
                            </div>
                            <div className="text-left">
                                <p className="text-sm text-gray-400">Pickup Time</p>
                                <p className="font-bold">09:00 AM</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400">
                                <MapPin size={20} />
                            </div>
                            <div className="text-left">
                                <p className="text-sm text-gray-400">Vehicle</p>
                                <p className="font-bold">Toyota Innova (KA 05 MN 1234)</p>
                            </div>
                        </div>
                    </div>

                    <p className="text-xs text-green-400/80">
                        A confirmation SMS and Email has been sent to you.
                    </p>

                    <button
                        onClick={() => navigate(`/trip/${tripId}/live`)}
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-black font-bold py-4 rounded-xl shadow-lg shadow-green-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                        Go to Live Dashboard
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default TripConfirmation;
