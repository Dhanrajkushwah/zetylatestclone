import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLoginClick = () => navigate('/login');
  const handleSignupClick = () => navigate('/signup');

  const showDropdown = (menu) => setDropdownVisible(menu);
  const hideDropdown = () => setDropdownVisible(null);

  const isDropdownOpen = (menu) => dropdownVisible === menu;
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogoutClick = () => {
    // Clear the token from localStorage
    localStorage.removeItem('authToken');
    console.log('Logged out');
    
    // Navigate to the home page or login page
    navigate('/login');
  };
  

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        {/* Link to landing page */}
        <Link to="/" className="navbar-logo">NextStepCV</Link>
      </div>
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>
      <div className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
        <Link to="/">
         <span >Home</span>
        </Link>
        {/* Tools Dropdown */}
        <div
          className="navbar-item"
          onMouseEnter={() => showDropdown('tools')}
          onMouseLeave={hideDropdown}
        >
          <span>
            <a href="#tools">Tools</a>
            <span className={`dropdown-icon ${isDropdownOpen('tools') ? 'open' : ''}`}>▼</span>
          </span>
          {isDropdownOpen('tools') && (
            <div className="dropdown-menu">
              <Link to="/template">Resume Checker</Link>
              <a href="#cv-maker">CV Maker</a>
            </div>
          )}
        </div>

        {/* Resume and CV Dropdown */}
        <div
          className="navbar-item"
          onMouseEnter={() => showDropdown('resume-cv')}
          onMouseLeave={hideDropdown}
        >
          <span>
            <a href="#resume-cv">Resume and CV</a>
            <span className={`dropdown-icon ${isDropdownOpen('resume-cv') ? 'open' : ''}`}>▼</span>
          </span>
          {isDropdownOpen('resume-cv') && (
            <div className="dropdown-menu">
              <a href="#resume-template">Resume Templates</a>
              <a href="#cv-templates">CV Templates</a>
            </div>
          )}
        </div>

        {/* Cover Letter Dropdown */}
        <div
          className="navbar-item"
          onMouseEnter={() => showDropdown('cover-letter')}
          onMouseLeave={hideDropdown}
        >
          <span>
            <a href="#cover-letter">Cover Letter</a>
            <span className={`dropdown-icon ${isDropdownOpen('cover-letter') ? 'open' : ''}`}>▼</span>
          </span>
          {isDropdownOpen('cover-letter') && (
            <div className="dropdown-menu">
              <Link to="/cover-letter-builder">Build Cover Letter</Link>
              <Link to="/cover-letter">Cover Letter Format</Link>
              <Link to="/how-to-cover-letter">How to Write a Cover Letter</Link>
              <Link to="/cover-letter-help">Cover Letter Help</Link>
              <Link to="/cover-letter-builder">Create a Cover Letter Now</Link>
            </div>
          )}
        </div>

        {/* About Dropdown */}
        <div
          className="navbar-item"
          onMouseEnter={() => showDropdown('about')}
          onMouseLeave={hideDropdown}
        >
          <span>
            <a href="#about">About</a>
            <span className={`dropdown-icon ${isDropdownOpen('about') ? 'open' : ''}`}>▼</span>
          </span>
          {isDropdownOpen('about') && (
            <div className="dropdown-menu">
                <Link to="/">Learn more about NextStepCV and our services.</Link>
                  <Link to="/payment">Payment</Link>
                  <Link to="/contact">Contact</Link>
            </div>
          )}
        </div>

        {/* Account Link */}
       {/* My Account Dropdown with Logout */}
       <div
          className="navbar-item"
          onMouseEnter={() => showDropdown('account')}
          onMouseLeave={hideDropdown}
        >
          <span>
            <Link >My Account</Link>
            <span className={`dropdown-icon ${isDropdownOpen('account') ? 'open' : ''}`}>▼</span>
          </span>
          {isDropdownOpen('account') && (
            <div className="dropdown-menu">
              <Link to="/account">My Profile</Link>
              <Link to="/login" onClick={handleLogoutClick}>Logout</Link>
            </div>
          )}
        </div>

        {/* Login and Sign Up buttons */}
        <div className="navbar-buttons">
          <button className="login-btn" onClick={handleLoginClick}>Login</button>
          <button className="signup-btn" onClick={handleSignupClick}>Sign Up</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
