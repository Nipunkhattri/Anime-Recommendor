import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Preferences from './pages/Preferences';
import Search from './pages/Search';
import Recommendations from './pages/Recommendations';
import { AuthContext } from './contexts/AuthContext';

function App() {
  const { isAuth } = useContext(AuthContext);

  console.log('App rendered, isAuth:', isAuth);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/search" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/preferences"
          element={isAuth ? <Preferences /> : <Navigate to="/login" />}
        />
        <Route
          path="/recommendations"
          element={isAuth ? <Recommendations /> : <Navigate to="/login" />}
        />
        <Route path="/search" element={<Search />} />
      </Routes>
    </div>
  );
}

export default App;