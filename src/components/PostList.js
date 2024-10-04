import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { PostContext } from "../App";


function PostList() {
  const { state } = useContext(PostContext);

  return (
    <div>
      <h1>Posts</h1>
      {state.posts.map((post) => (
        <div key={post.id} style={{ border: "1px solid black", margin: "10px" }}>
          <Link to={`/post/${post.id}`}>
            <h2>{post.content}</h2>
          </Link>
          {post.image && <img src={post.image} alt="Post" style={{ width: '100px', height: 'auto' }} />}
          <p>Likes: {post.likes}</p>
        </div>
      ))}
    </div>
  );
}


export default PostList;
