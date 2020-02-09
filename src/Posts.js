import React, { useReducer } from "react";
import "./App.css";
import Post from "./Post";
import { postList, post3 } from "./postList";

function Posts() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const button = state.button(dispatch);
  const commentButton = state.commentButton(dispatch);

  const postItems = state.posts.map(p => (
    <li key={p.id}>
      <Post {...p} button={p.id === "post1" ? commentButton : null} />
    </li>
  ));

  console.log("rendering all posts");
  return (
    <div>
      <h1>All of the Posts</h1>
      <ul>{postItems}</ul>
      <button onClick={button.fn}>{button.text}</button>
    </div>
  );
}

const addPost = dispatch => {
  return {
    fn: () => {
      dispatch({
        type: "add_post",
        post: post3,
        newFn: removePost
      });
    },
    text: "Add a New Post"
  };
};

const removePost = dispatch => {
  return {
    fn: () => {
      dispatch({
        type: "remove_post",
        id: "post3",
        newFn: addPost
      });
    },
    text: "Remove That Post"
  };
};

const addComment = dispatch => {
  return {
    fn: (post, comment) => {
      dispatch({
        type: "add_comment",
        post,
        comment,
        newFn: removeComment
      });
    },
    text: "Add a new comment",
    payload: {
      id: "comment6",
      author: { username: "user3", name: "User 3" },
      comment: "comment 6 on post 1"
    }
  };
};

const removeComment = dispatch => {
  return {
    fn: (post, comment) => {
      dispatch({
        type: "remove_comment",
        post,
        comment,
        newFn: addComment
      });
    },
    payload: "comment6",
    text: "Remove that comment"
  };
};

const initialState = {
  posts: postList,
  button: addPost,
  commentButton: addComment
};

function reducer(state, action) {
  let idx;
  let post;
  switch (action.type) {
    case "add_post":
      return {
        ...state,
        posts: [...state.posts, action.post],
        button: action.newFn
      };
    case "remove_post":
      //incidentally removes all the post's comments
      return {
        ...state,
        posts: [...state.posts.filter(p => p.id !== action.id)],
        button: action.newFn
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
        ],
        commentButton: action.newFn
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
        ],
        commentButton: action.newFn
      };
    default:
      console.error("there's no reducer case for that");
      console.dir(action);
      return state;
  }
}

export default Posts;
