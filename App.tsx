import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Services from './pages/Services';
import Booking from './pages/Booking';
import BookingDateTime from './pages/BookingDateTime';
import Confirmation from './pages/Confirmation';
import Profile from './pages/Profile';
import Store from './pages/Store';
import Cart from './pages/Cart';
import Schedule from './pages/Schedule';
import Finance from './pages/Finance';
import Management from './pages/Management';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="bg-background-light dark:bg-background-dark min-h-screen">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/services" element={<Services />} />
          <Route path="/store" element={<Store />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/booking/datetime" element={<BookingDateTime />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/management" element={<Management />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;