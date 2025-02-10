import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Timer, Clock } from 'lucide-react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import TimerPage from './pages/TimerPage';
import CreateTimer from './pages/CreateTimer';
import Profile from './pages/Profile';
import About from './pages/About';
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