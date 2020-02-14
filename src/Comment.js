import React from "react";
import { connect } from "react-redux";

function Comment({ id, author, comment }) {
  console.log(`    rendering comment ${id}`);

  return (
    <div>
      <p>
        {comment} - <i>{author.username}</i>
      </p>
    </div>
  );
}

export default connect(({ commentsById, usersById }, props) => {
  return {
    ...commentsById[props.id],
    author: usersById[commentsById[props.id].author]
  };
})(Comment);
