import React, { useContext, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';

import CommentForm from './CommentForm';
import { PostContext } from '../App';

function PostDetail() {
  const { id } = useParams();
  const { state, dispatch } = useContext(PostContext);
  const [editingContent, setEditingContent] = useState('');
  const post = state.posts.find(p => p.id === parseInt(id));

  const totalComments = useMemo(() => post.comments.length, [post.comments]);

  const handleDeletePost = () => {
    dispatch({ type: 'DELETE_POST', payload: post.id });
  };

  const handleEditPost = () => {
    dispatch({
      type: 'UPDATE_POST',
      payload: { id: post.id, content: editingContent, image: post.image },
    });
    setEditingContent('');
  };

  const handleLike = () => {
    dispatch({ type: 'TOGGLE_LIKE', payload: post.id });
  };

  return (
    <div>
      <h1>{post.content}</h1>
      {post.image && <img src={post.image} alt="Post" style={{ width: '200px', height: 'auto' }} />}
      <p>Likes: {post.likes}</p>
      <button onClick={handleLike}>Like</button>
      <button onClick={handleDeletePost}>Delete</button>

      <h2>Edit Post</h2>
      <input
        type="text"
        value={editingContent}
        onChange={(e) => setEditingContent(e.target.value)}
        placeholder="Edit post content"
      />
      <button onClick={handleEditPost}>Save</button>

      <h2>Comments ({totalComments})</h2>
      {post.comments.map(comment => (
        <div key={comment.id}>
          <p>{comment.text}</p>
          <button onClick={() =>
            dispatch({
              type: 'DELETE_COMMENT',
              payload: { postId: post.id, commentId: comment.id },
            })
          }>
            Delete Comment
          </button>
        </div>
      ))}
      <CommentForm postId={post.id} />
      <Link to="/">Back to Posts</Link>
    </div>
  );
}


export default PostDetail;
