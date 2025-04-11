import React, { useState } from 'react';

function UserEntry() {
  const [user, setUser] = useState({ username: '', email: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting user:', user);
  };

  return (
    <div className="page-container">
      <h2>User Information Entry</h2>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <label>Email:</label>
        <input
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UserEntry;
