import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuctionProvider } from './contexts/AuctionContext';
import { Navbar } from './components/Navbar';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { Auctions } from './pages/Auctions';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <ThemeProvider>
          <AuctionProvider>
            <Router>
              <div className="min-h-screen bg-gray-50">
                <Navbar />
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/auctions" element={<Auctions />} />
                </Routes>
              </div>
            </Router>
          </AuctionProvider>
        </ThemeProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;