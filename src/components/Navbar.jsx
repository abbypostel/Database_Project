import React from 'react';
import './Navbar.css';

function Navbar({ activePage, navigateTo }) {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="logo" onClick={() => navigateTo('home')}>
          <span className="logo-icon">📊</span>
          <span className="logo-text">Project Name</span>
        </div>
        
        <nav className="nav-links">
          <button 
            className={`nav-link ${activePage === 'home' ? 'active' : ''}`}
            onClick={() => navigateTo('home')}
          >
            Home
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;