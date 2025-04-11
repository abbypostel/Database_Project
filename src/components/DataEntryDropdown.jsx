import React from 'react';

export default function DataEntryDropdown({ isOpen, toggleDropdown, navigateTo }) {
  return (
    <li className="nav-item dropdown px-3">
      <button
        className={`nav-link dropdown-toggle btn ${isOpen ? 'active' : ''}`}
        id="dataEntryDropdown"
        onClick={toggleDropdown}
      >
        Data Entry
      </button>
      <div className={`dropdown-menu p-0 ${isOpen ? 'show' : ''}`}>
        <button className="dropdown-item p-3 fs-5" onClick={() => navigateTo('projectEntry')}>
          Project Information
        </button>
        {/* Add more entries here as needed */}
      </div>
    </li>
  );
}
