import React from "react";

function Comment({ id, author, comment }) {
  console.log(`rendering comment ${id}`);

  return (
    <div>
      <p>
        {comment} - <i>{author.username}</i>
      </p>
    </div>
  );
}

export default Comment;
