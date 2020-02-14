import React from "react";
import { connect } from "react-redux";
import "./App.css";
import Post from "./Post";
import { post3, comment6 } from "./initialData";

function Thing() {
  console.log("  rendering thing");
  return <div></div>;
}

const ConnectedThing = connect()(Thing);

function Posts({ postsAllIds, button, dispatch }) {
  const postButton = button(dispatch);
  const postItems = postsAllIds.map(p => (
    <li key={p}>
      <Post id={p} />
    </li>
  ));

  console.log("rendering all posts");
  return (
    <div>
      <h1>All of the Posts</h1>
      <ul>{postItems}</ul>
      <button onClick={postButton.fn}>{postButton.text}</button>
      <ConnectedThing />
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
  //this isn't affecting state - it's to prevent the mock post from
  // being added with a comment after it's been deleted the first time
  post3.comments = [];
  return {
    fn: () => {
      dispatch({
        type: "remove_post",
        post: "post3",
        newFn: addPost,
        comments: ["comment7"]
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

export default connect(({ postsAllIds, buttons }) => {
  return { postsAllIds, button: buttons.button };
})(Posts);
