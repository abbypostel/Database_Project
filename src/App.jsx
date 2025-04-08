import React, { useState } from 'react';  // Ensure React is imported
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <h1>Vite + React + Bootstrap</h1>
      <div className="card p-4">
        <button className="btn btn-primary" onClick={() => setCount(count + 1)}>
          count is {count}
        </button>
        <p>Edit <code>src/App.jsx</code> and save to test HMR</p>
      </div>
      <p className="mt-4">
        Click on the logos to learn more
      </p>
    </div>
  );
}

export default App;
