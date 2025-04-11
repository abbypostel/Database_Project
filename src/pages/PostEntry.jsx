import React, { useState } from 'react';

function PostEntry() {
  const [post, setPost] = useState({ platform: '', content: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting post:', post);
  };

  return (
    <div className="page-container">
      <h2>Social Media Post Entry</h2>
      <form onSubmit={handleSubmit}>
        <label>Platform:</label>
        <input
          type="text"
          value={post.platform}
          onChange={(e) => setPost({ ...post, platform: e.target.value })}
        />
        <label>Content:</label>
        <textarea
          value={post.content}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default PostEntry;
