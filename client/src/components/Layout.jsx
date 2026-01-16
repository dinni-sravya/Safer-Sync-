import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Shield, Leaf } from 'lucide-react';

const Layout = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === '/';

    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/30 rounded-full blur-[100px] animate-pulse-slow"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-secondary/20 rounded-full blur-[100px] animate-pulse-slow"></div>
            </div>

            {!isLoginPage && (
                <nav className="glass-card m-4 px-6 py-4 flex justify-between items-center z-10">
                    <Link to="/search" className="flex items-center gap-2 text-2xl font-bold font-display tracking-wide">
                        <div className="bg-primary p-2 rounded-lg shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                            <Shield size={24} className="text-white" />
                        </div>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                            SaferSync
                        </span>
                    </Link>
                    <div className="flex gap-6 items-center">
                        <Link to="/eco-impact" className="hover:text-secondary transition-colors font-medium flex items-center gap-1">
                            <Leaf size={18} /> Eco-Impact
                        </Link>
                        <Link to="/search" className="hover:text-secondary transition-colors font-medium">Find Groups</Link>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center font-bold shadow-lg">
                            D
                        </div>
                    </div>
                </nav>
            )}

            <main className="flex-1 z-10 p-4">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
