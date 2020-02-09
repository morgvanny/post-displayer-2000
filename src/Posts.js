import React, { useReducer } from "react";
import "./App.css";
import Post from "./Post";
import { initialData, post3, comment6 } from "./initialData";

function Posts() {
  const rootReducer = combineReducers({
    posts: combineReducers({
      byId: postsByIdReducer,
      allIds: postsAllIdsReducer
    }),
    comments: combineReducers({
      byId: commentsByIdReducer,
      allIds: commentsAllIdsReducer
    }),
    button: (state, action) => {
      if (action.type === "add_post" || action.type === "remove_post") {
        return action.newFn;
      } else {
        return state;
      }
    },
    commentButton: (state, action) => {
      if (action.type === "add_comment" || action.type === "remove_comment") {
        return action.newFn;
      } else {
        return state;
      }
    }
  });
  const [state, dispatch] = useCombinedReducer(rootReducer, initialState);

  const button = state.button(dispatch);
  const commentButton = state.commentButton(dispatch);

  const postItems = state.posts.allIds.map(id => {
    const post = state.posts.byId[id];
    const comments = post.comments.map(c => state.comments.byId[c]);
    const author = state.users.byId[post.author];
    return (
      <li key={id}>
        <Post
          {...post}
          comments={comments}
          // starting to want to un-normalize data or make it globally available
          authors={state.users}
          author={author}
          button={post.id === "post1" ? commentButton : null}
        />
      </li>
    );
  });

  console.log("rendering all posts");
  return (
    <div>
      <h1>All of the Posts</h1>
      <ul>{postItems}</ul>
      <button onClick={button.fn}>{button.text}</button>
    </div>
  );
}

const addPost = dispatch => {
  return {
    fn: () => {
      dispatch({
        type: "add_post",
        post: post3,
        newFn: removePost
      });
    },
    text: "Add a New Post"
  };
};

const removePost = dispatch => {
  //this isn't affecting state - it's to prevent the mock post from
  // being added with a comment after it's been deleted the first time
  post3.comments = [];
  return {
    fn: () => {
      dispatch({
        type: "remove_post",
        post: "post3",
        newFn: addPost,
        comments: ["comment7"]
      });
    },
    text: "Remove That Post"
  };
};

const addComment = dispatch => {
  return {
    fn: (post, comment) => {
      dispatch({
        type: "add_comment",
        post,
        comment,
        newFn: removeComment
      });
    },
    text: "Add a new comment",
    comment: comment6
  };
};

const removeComment = dispatch => {
  return {
    fn: (post, comment) => {
      dispatch({
        type: "remove_comment",
        post,
        comment,
        newFn: addComment
      });
    },
    comment: "comment6",
    text: "Remove that comment"
  };
};

const initialState = {
  ...initialData,
  button: addPost,
  commentButton: addComment
};

function postsByIdReducer(state, action) {
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

function postsAllIdsReducer(state, action) {
  switch (action.type) {
    case "add_post":
      return [...state, action.post.id];
    case "remove_post":
      return state.filter(id => id !== action.post);
    default:
      return state;
  }
}

function commentsByIdReducer(state, action) {
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

function commentsAllIdsReducer(state, action) {
  switch (action.type) {
    case "add_comment":
      return [...state, action.comment.id];
    case "remove_comment":
      return state.filter(id => id !== action.comment);
    default:
      return state;
  }
}

function combineReducers(reducerDict) {
  const _initialState = getInitialState(reducerDict);
  return function(state = _initialState, action) {
    return Object.keys(reducerDict).reduce((acc, curr) => {
      let slice = reducerDict[curr](state[curr], action);
      return { ...acc, [curr]: slice };
    }, state);
  };
}

function useCombinedReducer(rootReducer, state) {
  const initialState = state || rootReducer(undefined, { type: undefined });
  return useReducer(rootReducer, initialState);
}

function getInitialState(reducerDict) {
  return Object.keys(reducerDict).reduce((acc, curr) => {
    const slice = reducerDict[curr](undefined, { type: undefined });
    return { ...acc, [curr]: slice };
  }, {});
}

export default Posts;
