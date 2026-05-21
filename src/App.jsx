import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardLayout from './components/DashboardLayout';
import Dashboard from './pages/Dashboard';
import AudienceComparison from './pages/AudienceComparison';
import PosterStudio from './pages/PosterStudio';
import PresentationMode from './pages/PresentationMode';
import SavedCampaigns from './pages/SavedCampaigns';
import Settings from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        {/* Dashboard Routes with Sidebar */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/comparison" element={<AudienceComparison />} />
          <Route path="/dashboard/poster" element={<PosterStudio />} />
          <Route path="/dashboard/saved" element={<SavedCampaigns />} />
          <Route path="/dashboard/settings" element={<Settings />} />
        </Route>

        {/* Fullscreen Presentation Mode Route */}
        <Route path="/presentation" element={<PresentationMode />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
