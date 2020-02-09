import React from "react";
import Comment from "./Comment";

function Post({ id, author, body, comments, button }) {
  const commentItems = comments.map(c => {
    return (
      <li key={c.id}>
        <Comment {...c} />
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
        <button onClick={() => button.fn(id, button.payload)}>
          {button.text}
        </button>
      ) : null}
    </div>
  );
}

export default Post;
