import React, { useReducer } from "react";
import "./App.css";
import Post from "./Post";
import { postList, post3 } from "./postList";

const addPost = {
  fn: dispatch => {
    dispatch({
      type: "add_post",
      post: post3
    });
  },
  text: "Add a New Post"
};

const removePost = {
  fn: dispatch => {
    dispatch({
      type: "remove_post",
      id: "post3"
    });
  },
  text: "Remove That Post"
};

const initialState = {
  posts: postList,
  button: addPost
};

function reducer(state, action) {
  switch (action.type) {
    case "add_post":
      return { posts: [...state.posts, action.post], button: removePost };
    case "remove_post":
      return {
        posts: [...state.posts.filter(p => p.id !== action.id)],
        button: addPost
      };
    default:
      throw new Error();
  }
}

function Posts() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const postItems = state.posts.map(p => (
    <li key={p.id}>
      <Post {...p} />
    </li>
  ));
  console.log("rendering all posts");
  return (
    <div>
      <h1>All of the Posts</h1>
      <ul>{postItems}</ul>
      <button onClick={() => state.button.fn(dispatch)}>
        {state.button.text}
      </button>
    </div>
  );
}

export default Posts;
