import React, { useState } from 'react';

function AnalysisEntry() {
  const [formData, setFormData] = useState({ result: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting analysis:', formData);
  };

  return (
    <div className="page-container">
      <h2>Analysis Entry</h2>
      <form onSubmit={handleSubmit}>
        <label>Analysis Result:</label>
        <textarea
          value={formData.result}
          onChange={(e) => setFormData({ ...formData, result: e.target.value })}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AnalysisEntry;
