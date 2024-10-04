import React, { useState, useContext, useRef, useEffect } from 'react';
import { PostContext } from '../App';


function PostForm() {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const { dispatch } = useContext(PostContext);
  const postInputRef = useRef(null);

  useEffect(() => {
    postInputRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim() || image) {
      dispatch({
        type: 'CREATE_POST',
        payload: {
          id: Date.now(),
          content,
          likes: 0,
          comments: [],
          image, // Include the image in the payload
        },
      });
      setContent('');
      setImage(null); // Reset the image
    }
  };

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0])); // Preview the uploaded image
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={postInputRef}
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a new post..."
      />
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {image && <img src={image} alt="Preview" style={{ width: '100px', height: 'auto' }} />}
      <button type="submit">Submit</button>
    </form>
  );
}


export default PostForm;
