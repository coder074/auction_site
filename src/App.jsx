import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { LanguageProvider } from './contexts/LanguageContext.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import { AuctionProvider } from './contexts/AuctionContext.jsx';
import { Navbar } from './components/Navbar.jsx';
import { Landing } from './pages/Landing.jsx';
import { Login } from './pages/Login.jsx';
import { Register } from './pages/Register.jsx';
import { Dashboard } from './pages/Dashboard.jsx';
import { Auctions } from './pages/Auctions.jsx';

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