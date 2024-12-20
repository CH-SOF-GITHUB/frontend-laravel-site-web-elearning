import React, { useState } from 'react';

const CommentForm = ({ onSubmit }) => {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ author, content });
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <input
        type="text"
        value={author}
        onChange={(event) => setAuthor(event.target.value)}
        placeholder="Author"
      />
      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder="Comment"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CommentForm;
