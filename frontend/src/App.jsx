import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import VendorDashboard from './pages/VendorDashboard';
import PublicMenu from './pages/PublicMenu';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicMenu />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/vendor/dashboard" element={<VendorDashboard />} />
    </Routes>
  );
}
