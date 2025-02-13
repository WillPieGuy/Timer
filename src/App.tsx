import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Timer, Clock } from 'lucide-react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import TimerPage from './pages/TimerPage';
import CreateTimer from './pages/CreateTimer';
import Profile from './pages/Profile';
import CreateQuickTimer from './pages/CreateQuickTimer';
import About from './pages/About';
import Contact from './pages/Contact';
import ForgotPassword from './pages/ForgotPassword';
import Privacy from './pages/privacypolicy';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/timer/:id" element={<TimerPage />} />
              <Route path="/create" element={<CreateTimer />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact-us" element={<Contact />} />
              <Route path="/privacy-policy" element={<Privacy />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/create-quick-timer" element={<CreateQuickTimer />} />
            </Routes>
          </main>
          <Footer />
          <AuthModal />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;