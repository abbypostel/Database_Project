import React from 'react';
import './Navbar.css';

function Navbar({ activePage, navigateTo, toggleDropdown, dataEntryMenuOpen, queryMenuOpen }) {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="logo" onClick={() => navigateTo('home')}>
          <span className="logo-icon">📊</span>
          <span className="logo-text">SocialMediaAnalyzer</span>
        </div>
        
        <nav className="nav-links">
          <button 
            className={`nav-link ${activePage === 'home' ? 'active' : ''}`}
            onClick={() => navigateTo('home')}
          >
            Home
          </button>
          
          <div className="dropdown-container" id="dataEntryDropdown">
            <button 
              className={`nav-link dropdown-toggle ${dataEntryMenuOpen ? 'active' : ''}`}
              onClick={() => toggleDropdown('dataEntry')}
            >
              Data Entry
              <span className="dropdown-arrow">{dataEntryMenuOpen ? '▲' : '▼'}</span>
            </button>
            
            {dataEntryMenuOpen && (
              <div className="dropdown-menu">
                <button 
                  className={`dropdown-item ${activePage === 'projectEntry' ? 'active' : ''}`}
                  onClick={() => navigateTo('projectEntry')}
                >
                  Projects
                </button>
                <button 
                  className={`dropdown-item ${activePage === 'postEntry' ? 'active' : ''}`}
                  onClick={() => navigateTo('postEntry')}
                >
                  Social Media Posts
                </button>
                <button 
                  className={`dropdown-item ${activePage === 'userEntry' ? 'active' : ''}`}
                  onClick={() => navigateTo('userEntry')}
                >
                  User Information
                </button>
                <button 
                  className={`dropdown-item ${activePage === 'analysisEntry' ? 'active' : ''}`}
                  onClick={() => navigateTo('analysisEntry')}
                >
                  Analysis Results
                </button>
              </div>
            )}
          </div>
          
          <div className="dropdown-container" id="queryDropdown">
            <button 
              className={`nav-link dropdown-toggle ${queryMenuOpen ? 'active' : ''}`}
              onClick={() => toggleDropdown('query')}
            >
              Queries
              <span className="dropdown-arrow">{queryMenuOpen ? '▲' : '▼'}</span>
            </button>
            
            {queryMenuOpen && (
              <div className="dropdown-menu">
                <button 
                  className={`dropdown-item ${activePage === 'postQuery' ? 'active' : ''}`}
                  onClick={() => navigateTo('postQuery')}
                >
                  Query Posts
                </button>
                <button 
                  className={`dropdown-item ${activePage === 'projectQuery' ? 'active' : ''}`}
                  onClick={() => navigateTo('projectQuery')}
                >
                  Query Projects
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;