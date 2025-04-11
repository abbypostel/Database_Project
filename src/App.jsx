import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [activePage, setActivePage] = useState('home');
  const [dataEntryMenuOpen, setDataEntryMenuOpen] = useState(false);
  const [queryMenuOpen, setQueryMenuOpen] = useState(false);

  const toggleDropdown = (dropdown) => {
    if (dropdown === 'dataEntry') {
      setDataEntryMenuOpen((prev) => !prev);
      setQueryMenuOpen(false);
    } else if (dropdown === 'query') {
      setQueryMenuOpen((prev) => !prev);
      setDataEntryMenuOpen(false);
    }
  };

  const navigateTo = (page) => {
    setActivePage(page);
    setDataEntryMenuOpen(false);
    setQueryMenuOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dataEntryMenuOpen && !event.target.closest('#dataEntryDropdown')) {
        setDataEntryMenuOpen(false);
      }
      if (queryMenuOpen && !event.target.closest('#queryDropdown')) {
        setQueryMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dataEntryMenuOpen, queryMenuOpen]);

  const renderPageContent = () => {
    switch (activePage) {
      case 'home':
        return (
          <div className="page-container">
            <div className="hero-section">
              <h1>Social Media Analysis Platform</h1>
              <p>Collect, organize, and analyze social media data for research projects</p>
            </div>
            
            <div className="features-section">
              <div className="feature-cards">
                <div className="feature-card">
                  <div className="feature-icon">📝</div>
                  <h3>Data Entry</h3>
                  <p>Create projects, record posts, and enter analysis results</p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">🔍</div>
                  <h3>Advanced Queries</h3>
                  <p>Search posts by platform, time period, or user information</p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">📊</div>
                  <h3>Project Analytics</h3>
                  <p>View statistics and completion metrics for your projects</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'projectEntry':
        return (
          <div className="page-container">
            <div className="page-header">
              <h1>Project Entry</h1>
              <p>Create a new research project to organize your social media analysis</p>
            </div>
            <div className="form-container">
              <div className="form-section">
                <h2>Project Details</h2>
                <p>Enter the basic information about your research project</p>
                {/* Project form would go here */}
              </div>
            </div>
          </div>
        );
      case 'postEntry':
        return (
          <div className="page-container">
            <div className="page-header">
              <h1>Post Entry</h1>
              <p>Record social media posts for analysis</p>
            </div>
            <div className="form-container">
              <div className="form-section">
                <h2>Post Details</h2>
                <p>Enter information about the social media post</p>
                {/* Post entry form would go here */}
              </div>
            </div>
          </div>
        );
      case 'userEntry':
        return (
          <div className="page-container">
            <div className="page-header">
              <h1>User Information</h1>
              <p>Record details about social media users</p>
            </div>
            <div className="form-container">
              <div className="form-section">
                <h2>User Details</h2>
                <p>Enter demographic and account information</p>
                {/* User entry form would go here */}
              </div>
            </div>
          </div>
        );
      // Add other cases for additional pages
      default:
        return (
          <div className="page-container error-page">
            <h1>404</h1>
            <p>The page you're looking for could not be found.</p>
            <button className="primary-button" onClick={() => navigateTo('home')}>
              Return to Home
            </button>
          </div>
        );
    }
  };

  return (
    <div className="app-container">
      <Navbar
        activePage={activePage}
        navigateTo={navigateTo}
        toggleDropdown={toggleDropdown}
        dataEntryMenuOpen={dataEntryMenuOpen}
        queryMenuOpen={queryMenuOpen}
      />
      <main className="main-content">
        {renderPageContent()}
      </main>
    </div>
  );
}

export default App;