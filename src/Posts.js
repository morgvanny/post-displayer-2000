import React from "react";
import { connect } from "react-redux";
import "./App.css";
import Post from "./Post";
import { post3, comment6 } from "./postList";

function Posts({ posts, buttons, dispatch }) {
  const button = buttons.button(dispatch);
  const commentButton = buttons.commentButton(dispatch);
  const postItems = posts.map(p => (
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

export const addPost = dispatch => {
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

export const addComment = dispatch => {
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
    comment: comment6
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
    comment: "comment6",
    text: "Remove that comment"
  };
};

export default connect(({ posts, buttons }) => {
  return { posts, buttons };
})(Posts);
