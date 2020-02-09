export const postList = [
  {
    id: "post1",
    author: { username: "user1", name: "User 1" },
    body: "post 1",
    comments: [
      {
        id: "comment1",
        author: { username: "user2", name: "User 2" },
        comment: "comment 1 on post 1"
      },
      {
        id: "comment2",
        author: { username: "user3", name: "User 3" },
        comment: "comment 2 on post 1"
      }
    ]
  },
  {
    id: "post2",
    author: { username: "user2", name: "User 2" },
    body: "post 2",
    comments: [
      {
        id: "comment3",
        author: { username: "user3", name: "User 3" },
        comment: "comment 3 on post 2"
      },
      {
        id: "comment4",
        author: { username: "user1", name: "User 1" },
        comment: "comment 4 on post 2"
      },
      {
        id: "comment5",
        author: { username: "user3", name: "User 3" },
        comment: "comment 5 on post 2"
      }
    ]
  }
];

export const post3 = {
  id: "post3",
  author: { username: "user1", name: "User 1" },
  body: "post 3",
  comments: []
};
