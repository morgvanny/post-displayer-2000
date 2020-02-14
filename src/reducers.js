import { combineReducers } from "redux";
import { initialData } from "./initialData";
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

function postsById(state = initialData.posts.byId, action) {
  let postId;
  let post;
  let newComments;
  switch (action.type) {
    case "add_post":
      return {
        ...state,
        [action.post.id]: { ...action.post }
      };
    case "remove_post":
      const posts = { ...state };
      delete posts[action.post];
      return posts;
    //duplicate source of truth :( ..also really messy
    case "add_comment":
      postId = action.post;
      post = { ...state[postId] };
      newComments = [...post.comments, action.comment.id];
      const commentedPost = { ...post, comments: newComments };
      return {
        ...state,
        [postId]: commentedPost
      };
    case "remove_comment":
      postId = action.post;
      post = { ...state[postId] };
      newComments = post.comments.filter(c => c !== action.comment);
      const unCommentedPost = { ...post, comments: newComments };
      return {
        ...state,
        [postId]: unCommentedPost
      };
    default:
      return state;
  }
}

function postsAllIds(state = initialData.posts.allIds, action) {
  switch (action.type) {
    case "add_post":
      return [...state, action.post.id];
    case "remove_post":
      return state.filter(id => id !== action.post);
    default:
      return state;
  }
}

function commentsById(state = initialData.comments.byId, action) {
  let comments;
  switch (action.type) {
    case "add_comment":
      return {
        ...state,
        [action.comment.id]: { ...action.comment }
      };
    case "remove_comment":
      comments = { ...state };
      delete comments[action.comment];
      return comments;
    case "remove_post":
      comments = { ...state };
      action.comments.forEach(c => delete comments[c]);
      return comments;
    default:
      return state;
  }
}

function commentsAllIds(state = initialData.comments.allIds, action) {
  switch (action.type) {
    case "add_comment":
      return [...state, action.comment.id];
    case "remove_comment":
      return state.filter(id => id !== action.comment);
    default:
      return state;
  }
}

function usersById(state = initialData.users.byId, action) {
  switch (action.type) {
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  postsById,
  postsAllIds,
  commentsById,
  commentsAllIds,
  usersById,
  buttons
});

export default rootReducer;
