import React from 'react';
import ReactDOM from 'react-dom/client'; // or 'react-dom'
import './index.css'; // CSS file for global styles (if needed)
import App from './App'; // Import the App component

// Render the App component inside the element with id 'root'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
