import React, { useState } from 'react';

function ProjectEntry() {
  const [project, setProject] = useState({ name: '', description: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting project:', project);
  };

  return (
    <div className="page-container">
      <h2>Project Entry</h2>
      <form onSubmit={handleSubmit}>
        <label>Project Name:</label>
        <input
          type="text"
          value={project.name}
          onChange={(e) => setProject({ ...project, name: e.target.value })}
        />
        <label>Description:</label>
        <textarea
          value={project.description}
          onChange={(e) => setProject({ ...project, description: e.target.value })}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ProjectEntry;
