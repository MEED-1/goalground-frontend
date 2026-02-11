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
import { SearchPlayers } from './pages/public/SearchPlayers';
import { AdminReports } from './pages/admin/AdminReports';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { ManageUsers } from './pages/admin/ManageUsers';
import { ManageTerrains } from './pages/admin/ManageTerrains';
import { ManageReservations } from './pages/admin/ManageReservations';
import { ManageTransactions } from './pages/admin/ManageTransactions';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { CompleteProfile } from './pages/auth/CompleteProfile';
import { BookingPage } from './pages/booking/BookingPage';
import { PaymentSuccess } from './pages/booking/PaymentSuccess';
import { PlayerProfile } from './pages/player/PlayerProfile';
import { MyBookings } from './pages/player/MyBookings';
import { AddTerrain } from './pages/owner/AddTerrain';
import { MyTerrains } from './pages/owner/MyTerrains';

import { ThemeProvider } from './context/ThemeContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { AdminRoute } from './components/auth/AdminRoute';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { NotFoundPage } from './pages/public/NotFoundPage';

const App = () => {
  return (
    <Router future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true
    }}>
      <AuthProvider>
        <LanguageProvider>
          <ThemeProvider>
            <ErrorBoundary>
              <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] flex flex-col">
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    {/* Public */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/explore" element={<ExploreTerrains />} />
                    <Route path="/terrains/:id" element={<TerrainDetail />} />
                    <Route path="/matches" element={<FindMatch />} />
                    <Route path="/players" element={<SearchPlayers />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    {/* Auth */}
                    <Route path="/complete-profile" element={<CompleteProfile />} />

                    {/* Protected/User */}
                    <Route path="/profile" element={
                      <ProtectedRoute>
                        <PlayerProfile />
                      </ProtectedRoute>
                    } />
                    <Route path="/my-bookings" element={
                      <ProtectedRoute>
                        <MyBookings />
                      </ProtectedRoute>
                    } />
                    <Route path="/booking/:id" element={
                      <ProtectedRoute>
                        <BookingPage />
                      </ProtectedRoute>
                    } />
                    <Route path="/booking/success" element={
                      <ProtectedRoute>
                        <PaymentSuccess />
                      </ProtectedRoute>
                    } />

                    {/* Owner */}
                    <Route path="/owner/add-terrain" element={
                      <ProtectedRoute>
                        <AddTerrain />
                      </ProtectedRoute>
                    } />
                    <Route path="/owner/terrains" element={
                      <ProtectedRoute>
                        <MyTerrains />
                      </ProtectedRoute>
                    } />

                    {/* Admin Routes */}
                    <Route path="/admin" element={
                      <AdminRoute>
                        <AdminDashboard />
                      </AdminRoute>
                    } />
                    <Route path="/admin/reports" element={
                      <AdminRoute>
                        <AdminReports />
                      </AdminRoute>
                    } />
                    <Route path="/admin/users" element={
                      <AdminRoute>
                        <ManageUsers />
                      </AdminRoute>
                    } />
                    <Route path="/admin/terrains" element={
                      <AdminRoute>
                        <ManageTerrains />
                      </AdminRoute>
                    } />
                    <Route path="/admin/reservations" element={
                      <AdminRoute>
                        <ManageReservations />
                      </AdminRoute>
                    } />
                    <Route path="/admin/transactions" element={
                      <AdminRoute>
                        <ManageTransactions />
                      </AdminRoute>
                    } />

                    <Route path="/404" element={<NotFoundPage />} />
                    <Route path="*" element={<Navigate to="/404" replace />} />
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
            </ErrorBoundary>
          </ThemeProvider>
        </LanguageProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;