import React from "react";

function Comment({ id, author, comment, deleteComment, post }) {
  console.log(`    rendering comment ${id}`);

  return (
    <div>
      <p>
        {comment} - <i>{author.username}</i>
        <button onClick={() => deleteComment(id, post)}>x</button>
      </p>
    </div>
  );
}

export default Comment;
