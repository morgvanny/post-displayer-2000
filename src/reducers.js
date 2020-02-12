import { combineReducers } from "redux";
import { postList } from "./postList";
import { addPost, addComment } from "./Posts";

function buttons(
  state = { button: addPost, commentButton: addComment },
  action
) {
  switch (action.type) {
    case "add_post":
      return { ...state, button: action.newFn };
    case "remove_post":
      return { ...state, button: action.newFn };
    case "add_comment":
      return { ...state, commentButton: action.newFn };
    case "remove_comment":
      return { ...state, commentButton: action.newFn };
    default:
      return state;
  }
}

function posts(state = postList, action) {
  let idx;
  let post;
  switch (action.type) {
    case "add_post":
      return [...state, action.post];
    case "remove_post":
      //incidentally removes all the post's comments
      return [...state.filter(p => p.id !== action.id)];
    case "add_comment":
      idx = state.findIndex(p => p.id === action.post);
      post = state[idx];
      const commentedPost = {
        ...post,
        comments: [...post.comments, action.comment]
      };
      return [...state.slice(0, idx), commentedPost, ...state.slice(idx + 1)];
    case "remove_comment":
      idx = state.findIndex(p => p.id === action.post);
      post = state[idx];
      const unCommentedPost = {
        ...post,
        comments: post.comments.filter(c => c.id !== action.comment)
      };
      return [...state.slice(0, idx), unCommentedPost, ...state.slice(idx + 1)];
    default:
      return state;
  }
}

const rootReducer = combineReducers({ posts, buttons });

export default rootReducer;
