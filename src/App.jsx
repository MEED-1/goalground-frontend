import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/layout/Navbar';
import { MobileNav } from './components/layout/MobileNav';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/public/HomePage';
import { ExploreTerrains } from './pages/public/ExploreTerrains';
import { TerrainDetail } from './pages/public/TerrainDetail';
import { FindMatch } from './pages/public/FindMatch';
import { AdminReports } from './pages/admin/AdminReports';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { CompleteProfile } from './pages/auth/CompleteProfile';
import { BookingPage } from './pages/booking/BookingPage';
import { PaymentSuccess } from './pages/booking/PaymentSuccess';
import { PlayerProfile } from './pages/player/PlayerProfile';
import { MyBookings } from './pages/player/MyBookings';
import { AddTerrain } from './pages/owner/AddTerrain';

import { ThemeProvider } from './context/ThemeContext';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <LanguageProvider>
          <ThemeProvider>
            <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] flex flex-col">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  {/* Public */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/explore" element={<ExploreTerrains />} />
                  <Route path="/terrains/:id" element={<TerrainDetail />} />
                  <Route path="/matches" element={<FindMatch />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />

                  {/* Auth */}
                  <Route path="/complete-profile" element={<CompleteProfile />} />

                  {/* Protected/User */}
                  <Route path="/profile" element={<PlayerProfile />} />
                  <Route path="/my-bookings" element={<MyBookings />} />
                  <Route path="/booking/:id" element={<BookingPage />} />
                  <Route path="/booking/success" element={<PaymentSuccess />} />

                  {/* Owner */}
                  <Route path="/owner/add-terrain" element={<AddTerrain />} />

                  {/* Admin Routes */}
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/reports" element={<AdminReports />} />

                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
              <Footer />
              <MobileNav />
              <Toaster
                position="top-center"
                toastOptions={{
                  style: {
                    background: 'var(--color-card)',
                    color: 'var(--color-text)',
                    border: '1px solid var(--color-border)'
                  },
                }}
              />
            </div>
          </ThemeProvider>
        </LanguageProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;