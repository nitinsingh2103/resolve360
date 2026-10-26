import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ComplaintProvider } from './context/ComplaintContext';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Overview } from './pages/Overview';
import { ComplaintRegistry } from './pages/ComplaintRegistry';
import { ComplaintDetailsPage } from './pages/ComplaintDetailsPage';
import { BureauMonitoring } from './pages/BureauMonitoring';
import { Escalations } from './pages/Escalations';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';

export function App() {
  return (
    <ComplaintProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Overview />} />
            <Route path="complaints" element={<ComplaintRegistry />} />
            <Route path="complaints/:id" element={<ComplaintDetailsPage />} />
            <Route path="bureaus" element={<BureauMonitoring />} />
            <Route path="escalations" element={<Escalations />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ComplaintProvider>
  );
}

export default App;
