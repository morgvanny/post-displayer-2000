import React, { useReducer } from "react";

export default function PostForm({ action }) {
  const [{ id, body }, setInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      body: "post 3",
      id: 3
    }
  );

  const handleInput = ({ target: { name, value } }) => {
    setInput({ [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    action({
      body,
      id: `post${id}`,
      author: { username: "user1", name: "User 1" }
    });
    setInput({ body: `post ${id + 1}`, id: id + 1 });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="postBody">New post: </label>
      <input
        type="text"
        id="postBody"
        name="body"
        value={body}
        onChange={handleInput}
      />
      <label htmlFor="postId">Mock ID: </label>
      <input
        type="text"
        id="postId"
        name="id"
        value={id}
        onChange={handleInput}
      />
      <input type="submit" value="Submit" />
    </form>
  );
}
