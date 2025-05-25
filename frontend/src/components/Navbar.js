import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, logout } from '../utils/auth';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <Link to="/search" style={{ marginRight: '1rem' }}>Search</Link>
      {isAuthenticated() && <Link to="/preferences" style={{ marginRight: '1rem' }}>Preferences</Link>}
      {isAuthenticated() && <Link to="/recommendations" style={{ marginRight: '1rem' }}>Recommendations</Link>}
      {!isAuthenticated() && <Link to="/login" style={{ marginRight: '1rem' }}>Login</Link>}
      {!isAuthenticated() && <Link to="/register">Register</Link>}
      {isAuthenticated() && <button onClick={handleLogout} style={{ marginLeft: '1rem' }}>Logout</button>}
    </nav>
  );
}

export default Navbar;
