import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import DashboardLayout from './components/DashboardLayout';
import Dashboard from './pages/Dashboard';
import AudienceComparison from './pages/AudienceComparison';
import PosterStudio from './pages/PosterStudio';
import PresentationMode from './pages/PresentationMode';
import SavedCampaigns from './pages/SavedCampaigns';
import Settings from './pages/Settings';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return null; // Or a loading spinner
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<AuthPage />} />
          
          {/* Dashboard Routes with Sidebar (Protected) */}
          <Route element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/comparison" element={<AudienceComparison />} />
            <Route path="/dashboard/poster" element={<PosterStudio />} />
            <Route path="/dashboard/saved" element={<SavedCampaigns />} />
            <Route path="/dashboard/settings" element={<Settings />} />
          </Route>

          {/* Fullscreen Presentation Mode Route */}
          <Route path="/presentation" element={
            <ProtectedRoute>
              <PresentationMode />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
