import React, { useReducer, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import AddSeries from "./components/AddSeries";

import PostList from "./components/PostLIst";
import PostDetail from "./components/PostDetail";
import PostForm from "./components/PostForm";
// import axioss from "axios";


// const initialState = {
//   posts: [],
// };
const initialState = {
  posts: [
    {
      id: 1,
      content: "This is the first post",
      likes: 5,
      comments: [],
      image: null, // New property for the image
    },
    {
      id: 2,
      content: "This is the second post",
      likes: 10,
      comments: [],
      image: null, // New property for the image
    },
  ],
};

function postReducer(state, action) {
  switch (action.type) {
    case "CREATE_POST":
      return { ...state, posts: [action.payload, ...state.posts] };
    case "UPDATE_POST":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.id
            ? { content: action.payload.content, ...post }
            : post
        ),
      };
    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
      };
    case "ADD_COMMENT":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.postId
            ? { ...post, comments: [...post.comments, action.payload.comment] }
            : post
        ),
      };
    case "DELETE_COMMENT":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.postId
            ? {
                ...post,
                comments: post.comments.filter(
                  (comment) => comment.id !== action.payload.commentId
                ),
              }
            : post
        ),
      };
    case "TOGGLE_LIKE":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload ? { ...post, likes: post.likes + 1 } : post
        ),
      };
    default:
      return state;
  }
}

export const PostContext = React.createContext();

const App = () => {
  const [state, dispatch] = useReducer(postReducer, initialState);

  //   <template>
  // <ag-grid
  //   :column-defs="state.columnDefs"
  //   :row-data="state.rowData"
  //    @grid-ready="onReady"
  // />
  // </template>
  // const onReady = (params) => {
  //   	params.api.sizeColumnsToFit()
  //  }
  const [data, setData] = useState(null);
  // const onClick = async() =>{
  //   try{
  //     const response = await axios.get(
  //       'https://jsonplaceholder.typicode.com/todos/1',
  //     );
  //     setData(response.data);
  //   }catch(e){
  //     console.log(e);
  //   }
  // };

  return (
    <PostContext.Provider value={{ state, dispatch }}>
      <Router>
        <div className="App">
          <nav
            style={{
              width: "100%",
              height: "30px",
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              padding: "10px",
              backgroundColor: "#f8f9fa",
              position: "relative",
            }}
          >
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "#007bff",
                fontSize: "20px",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "60px",
                position: "absolute",

                left: "27%",
              }}
            >
              Home
            </Link>
            <Link
              to="/new"
              style={{
                textDecoration: "none",
                color: "#f05264",
                fontSize: "20px",
                fontWeight: "bold",
                width: "120px",
                position: "absolute",

                right: "17%",
              }}
            >
              New Post
            </Link>
          </nav>

          <Routes>
            {/* <Route
              path="/"
              element={
                <>
                  <SeriesList />
                  <PostList />
                </>
              }
            /> */}
    
            <Route
              path="/"
              element={
                <div
                  style={{
                    width: "100%",
                    display: "flex",

                    position: "relative",
                    // border: '1px solid blue'
                    // margin: "0 auto",
                  }}
                >
                  <div
                    style={{
                      width: "60%",
                      height: "1000px",
                      display: "flex",
                      justifyContent: "center",
                      position: "absolute",
                      top: "0",
                      left: "0",
                      border: "1px solid  #ccc",
                      paddingBottom: "10px",
                      boxSizing: "border-box",
                    }}
                  >
                    
                   
                    <div
                      style={{
                        width: "100%",
                      }}
                    />
                  </div>

                
                  <div
                    style={{
                      width: "40%",
                      height: "1001px",
                      border: "1px solid  #ccc",
                      // paddingBottom: "10px",
                      boxSizing: "border-box",
                      position: "absolute",
                      top: "0",
                      right: "0",
                    }}
                  >
                    <PostList
                      style={{
                        width: "100%",
                        height: "1001px",
                        margin: "0 auto",
                      }}
                    />
                  </div>
                </div>
              }
            />

            <Route path="/add-series" element={<AddSeries />} />

            <Route path="/new" element={<PostForm />} />
            <Route path="/post/:id" element={<PostDetail />} />
          </Routes>
        </div>
      </Router>
    </PostContext.Provider>
  );
};

export default App;
