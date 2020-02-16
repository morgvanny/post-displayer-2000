import React, { useReducer } from "react";

export default function CommentForm({ action, post }) {
  const [{ id, comment }, setInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      comment: "comment 6",
      id: 6
    }
  );

  const handleInput = ({ target: { name, value } }) => {
    setInput({ [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    action(
      {
        comment,
        id: `comment${id}`,
        author: { username: "user1", name: "User 1" }
      },
      post
    );
    setInput({ comment: `comment ${id + 1}`, id: id + 1 });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="comment">New comment: </label>
      <input
        type="text"
        id="comment"
        name="comment"
        value={comment}
        onChange={handleInput}
      />
      <label htmlFor="commentId">Mock ID: </label>
      <input
        type="text"
        id="commentId"
        name="id"
        value={id}
        onChange={handleInput}
      />
      <input type="submit" value="Submit" />
    </form>
  );
}
