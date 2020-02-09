import React from "react";
import Comment from "./Comment";

function Post({ id, author, body, comments }) {
  const commentItems = comments.map(c => (
    <li key={c.id}>
      <Comment {...c} />
    </li>
  ));
  console.log(`rendering post ${id}`);
  return (
    <div>
      <p>{body}</p>
      <p>posted by: {author.username}</p>
      <h2>Comments for post: {id}</h2>
      <ul>{commentItems}</ul>
    </div>
  );
}

export default Post;
