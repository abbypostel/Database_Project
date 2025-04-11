import React from 'react';

export default function QueryDropdown({ isOpen, toggleDropdown, navigateTo }) {
  return (
    <li className="nav-item dropdown px-3">
      <button
        className={`nav-link dropdown-toggle btn ${isOpen ? 'active' : ''}`}
        id="queryDropdown"
        onClick={toggleDropdown}
      >
        Query Interface
      </button>
      <div className={`dropdown-menu p-0 ${isOpen ? 'show' : ''}`}>
        <button className="dropdown-item p-3 fs-5" onClick={() => navigateTo('postQuery')}>
          Post Query
        </button>
        <button className="dropdown-item p-3 fs-5" onClick={() => navigateTo('projectQuery')}>
          Project Query
        </button>
      </div>
    </li>
  );
}
