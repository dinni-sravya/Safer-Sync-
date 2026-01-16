import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import LanguageSelect from './pages/LanguageSelect';
import GroupSearch from './pages/GroupSearch';
import TravelDetails from './pages/TravelDetails';
import TripDetails from './pages/TripDetails';
import Payment from './pages/Payment';
import EcoImpact from './pages/EcoImpact';
import TripConfirmation from './pages/TripConfirmation';
import LiveDashboard from './pages/LiveDashboard';
import GroupChat from './pages/GroupChat';
import EcoSummary from './pages/EcoSummary';

// Placeholder components if pages don't exist yet to prevent crash during dev
const Placeholder = ({ title }) => <div className="p-10 text-center text-2xl">{title} (Coming Soon)</div>;

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Login />} />
                    <Route path="/language" element={<LanguageSelect />} />
                    <Route path="/search" element={<GroupSearch />} />
                    <Route path="/travel-details" element={<TravelDetails />} />
                    <Route path="/trip/:id" element={<TripDetails />} />
                    <Route path="/payment" element={<Payment />} />
                    <Route path="/eco-impact" element={<EcoImpact />} />

                    {/* Extended Journey Routes */}
                    <Route path="/trip/:id/confirmed" element={<TripConfirmation />} />
                    <Route path="/trip/:id/live" element={<LiveDashboard />} />
                    <Route path="/trip/:id/chat" element={<GroupChat />} />
                    <Route path="/trip/:id/eco-summary" element={<EcoSummary />} />

                    {/* Fallback */}
                    <Route path="*" element={<Placeholder title="404 Not Found" />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
