import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function Navbar() {
  const { isAuth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  console.log('Navbar rendered, isAuth:', isAuth);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <Link to="/search" style={{ marginRight: '1rem' }}>Search</Link>
      {isAuth && <Link to="/preferences" style={{ marginRight: '1rem' }}>Preferences</Link>}
      {isAuth && <Link to="/recommendations" style={{ marginRight: '1rem' }}>Recommendations</Link>}
      {!isAuth && <Link to="/login" style={{ marginRight: '1rem' }}>Login</Link>}
      {!isAuth && <Link to="/register">Register</Link>}
      {isAuth && <button onClick={handleLogout} style={{ marginLeft: '1rem' }}>Logout</button>}
    </nav>
  );
}

export default Navbar;