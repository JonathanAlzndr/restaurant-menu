import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, isAdmin, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">Product List</Link>
      </div>
      <div className="navbar-menu">
        <div className="navbar-end">
          {isLoggedIn ? (
            <>
              <button onClick={onLogout} className="navbar-item button is-danger">Logout</button>
            </>
          ) : (
            <Link to="/login" className="navbar-item">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
