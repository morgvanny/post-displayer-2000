import React from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

function Post({
  id,
  author,
  body,
  comments,
  action,
  deletePost,
  deleteComment
}) {
  const commentItems = comments.map(c => {
    return (
      <li key={c.id}>
        <Comment {...c} {...{ deleteComment }} post={id} />
      </li>
    );
  });
  console.log(`  rendering post ${id}`);
  return (
    <div>
      <p>{body}</p>
      <p>posted by: {author.username}</p>
      <button onClick={() => deletePost(id)}>Delete</button>
      <h2>Comments for post: {id}</h2>
      <ul>{commentItems}</ul>
      {action ? <CommentForm action={action} post={id} /> : null}
    </div>
  );
}

export default Post;
