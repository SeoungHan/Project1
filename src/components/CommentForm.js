import React, { useState, useContext } from 'react';
import { PostContext } from '../App';


function CommentForm({ postId }) {
  const [comment, setComment] = useState('');
  const { dispatch } = useContext(PostContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      dispatch({
        type: 'ADD_COMMENT',
        payload: { postId, comment: { id: Date.now(), text: comment } },
      });
      setComment('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment..."
      />
      <button type="submit">Add Comment</button>
    </form>
  );
}

export default CommentForm;
