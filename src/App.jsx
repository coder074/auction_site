import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import { useAuth } from './contexts/AuthContext.jsx';

function AppContent() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route 
          path="/" 
          element={user ? <Navigate to="/dashboard" replace /> : <Landing />} 
        />
        <Route 
          path="/login" 
          element={user ? <Navigate to="/dashboard" replace /> : <Login />} 
        />
        <Route 
          path="/register" 
          element={user ? <Navigate to="/dashboard" replace /> : <Register />} 
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/auctions" element={<Auctions />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <ThemeProvider>
          <AuctionProvider>
            <Router>
              <AppContent />
            </Router>
          </AuctionProvider>
        </ThemeProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;