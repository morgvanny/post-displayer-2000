export const initialData = {
  posts: {
    byId: {
      post1: {
        id: "post1",
        author: "user1",
        body: "post 1",
        comments: ["comment1", "comment2"]
      },
      post2: {
        id: "post2",
        author: "user2",
        body: "post 2",
        comments: ["comment3", "comment4", "comment5"]
      }
    },
    allIds: ["post1", "post2"]
  },
  comments: {
    byId: {
      comment1: {
        id: "comment1",
        author: "user2",
        comment: "comment 1"
      },
      comment2: {
        id: "comment2",
        author: "user3",
        comment: "comment 2"
      },
      comment3: {
        id: "comment3",
        author: "user3",
        comment: "comment 3"
      },
      comment4: {
        id: "comment4",
        author: "user1",
        comment: "comment 4"
      },
      comment5: {
        id: "comment5",
        author: "user3",
        comment: "comment 5"
      }
    },
    allIds: ["comment1", "comment2", "comment3", "commment4", "comment5"]
  },
  users: {
    byId: {
      user1: {
        username: "user1",
        name: "User 1"
      },
      user2: {
        username: "user2",
        name: "User 2"
      },
      user3: {
        username: "user3",
        name: "User 3"
      }
    },
    allIds: ["user1", "user2", "user3"]
  }
};

export const post3 = {
  id: "post3",
  author: "user1",
  body: "post 3",
  comments: []
};

export const comment6 = {
  id: "comment6",
  author: "user1",
  comment: "comment 6"
};
