import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          <span className="logo-icon">🎬</span>
          <span className="logo-text">MovieBook</span>
        </Link>

        {/* Desktop Navigation */}
        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/movies" 
            className={`nav-link ${isActive('/movies') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Movies
          </Link>
          <Link 
            to="/bookings" 
            className={`nav-link ${isActive('/bookings') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            My Bookings
          </Link>
          <Link 
            to="/admin" 
            className={`nav-link ${isActive('/admin') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Admin
          </Link>
        </div>

        {/* Search Bar */}
        <div className="nav-search">
          <input 
            type="text" 
            placeholder="Search movies..." 
            className="search-input"
            onKeyPress={(e) => {
              if (e.key === 'Enter' && e.target.value.trim()) {
                navigate(`/movies?search=${encodeURIComponent(e.target.value.trim())}`);
                e.target.value = '';
              }
            }}
          />
          <span className="search-icon">🔍</span>
        </div>

        {/* User Actions */}
        <div className="nav-actions">
          <button className="nav-btn login-btn">
            Sign In
          </button>
          <button className="nav-btn signup-btn">
            Sign Up
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="nav-toggle" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;