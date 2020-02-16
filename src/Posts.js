import React, { useReducer } from "react";
import "./App.css";
import Post from "./Post";
import PostForm from "./PostForm";
import { postList } from "./postList";

function Posts() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const postItems = state.posts.map(p => (
    <li key={p.id}>
      <Post
        {...p}
        deletePost={removePost(dispatch)}
        deleteComment={removeComment(dispatch)}
        action={p.id === "post1" ? addComment(dispatch) : null}
      />
    </li>
  ));

  console.log("rendering all posts");
  return (
    <div>
      <h1>All of the Posts</h1>
      <ul>{postItems}</ul>
      <PostForm action={addPost(dispatch)} />
    </div>
  );
}

const addPost = dispatch => {
  return post =>
    dispatch({
      type: "add_post",
      post
    });
};

const removePost = dispatch => {
  return post =>
    dispatch({
      type: "remove_post",
      post
    });
};

const addComment = dispatch => {
  return (comment, post) =>
    dispatch({
      type: "add_comment",
      comment,
      post
    });
};

const removeComment = dispatch => {
  return (comment, post) =>
    dispatch({
      type: "remove_comment",
      comment,
      post
    });
};

const initialState = {
  posts: postList
};

function reducer(state, action) {
  let idx;
  let post;
  switch (action.type) {
    case "add_post":
      action.post.comments = [];
      return {
        ...state,
        posts: [...state.posts, action.post]
      };
    case "remove_post":
      //incidentally removes all the post's comments
      return {
        ...state,
        posts: [...state.posts.filter(p => p.id !== action.post)]
      };
    case "add_comment":
      idx = state.posts.findIndex(p => p.id === action.post);
      post = { ...state.posts[idx] };
      const commentedPost = {
        ...post,
        comments: [...post.comments, action.comment]
      };
      return {
        ...state,
        posts: [
          ...state.posts.slice(0, idx),
          commentedPost,
          ...state.posts.slice(idx + 1)
        ]
      };
    case "remove_comment":
      idx = state.posts.findIndex(p => p.id === action.post);
      post = { ...state.posts[idx] };
      const unCommentedPost = {
        ...post,
        comments: post.comments.filter(c => c.id !== action.comment)
      };
      return {
        ...state,
        posts: [
          ...state.posts.slice(0, idx),
          unCommentedPost,
          ...state.posts.slice(idx + 1)
        ]
      };
    default:
      console.error("there's no reducer case for that");
      console.dir(action);
      return state;
  }
}

export default Posts;
