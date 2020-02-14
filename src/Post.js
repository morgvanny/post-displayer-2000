import React from "react";
import { connect } from "react-redux";
import Comment from "./Comment";

function Post({
  id,
  author,
  body,
  comments,
  authors,
  commentButton,
  dispatch
}) {
  let button;
  if (id === "post1") {
    button = commentButton(dispatch);
  }
  const commentItems = comments.map(c => {
    return (
      <li key={c}>
        <Comment id={c} />
      </li>
    );
  });
  console.log(`  rendering post ${id}`);
  return (
    <div>
      <p>{body}</p>
      <p>posted by: {author.username}</p>
      <h2>Comments for post: {id}</h2>
      <ul>{commentItems}</ul>
      {button ? (
        <button onClick={() => button.fn(id, button.comment)}>
          {button.text}
        </button>
      ) : null}
    </div>
  );
}

export default connect(
  ({ postsById, usersById, buttons: { commentButton } }, props) => {
    return {
      ...postsById[props.id],
      author: usersById[postsById[props.id].author],
      commentButton
    };
  }
)(Post);
