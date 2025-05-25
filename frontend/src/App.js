import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Preferences from './pages/Preferences';
import Search from './pages/Search';
import Recommendations from './pages/Recommendations';
import { isAuthenticated } from './utils/auth';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/search" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/preferences"
          element={isAuthenticated() ? <Preferences /> : <Navigate to="/login" />}
        />
        <Route
          path="/recommendations"
          element={isAuthenticated() ? <Recommendations /> : <Navigate to="/login" />}
        />
        <Route path="/search" element={<Search />} />
      </Routes>
    </div>
  );
}

export default App;
