module.exports = [
  // HAPPY PATH
  {
    section: "essential",
    endpoint: "/api/articles/1/comments",
    method: "post",
    body: { username: "butter_bridge", body: "this is a comment" },
    makeAssertion: (res, expect) => {
      expect(res.status).to.be.equal(201);
    },
    hints: ["use a 201: Created status code for a successful `POST` request"],
  },
  {
    section: "essential",
    endpoint: "/api/articles/1/comments",
    method: "post",
    body: { username: "butter_bridge", body: "this is a comment" },
    makeAssertion: (res, expect) => {
      expect(res.body).to.be.an("object");
      expect(res.body).to.contain.keys("comment");
      expect(res.body.comment).to.contain.keys(
        "comment_id",
        "author",
        "body",
        "votes",
        "created_at",
      );
      expect(res.body.comment.author).to.equal("butter_bridge");
      expect(res.body.comment.body).to.equal("this is a comment");
    },
    hints: [
      "send the new comment back to the client in an object, with a key of comment: `{ comment: {} }`",
      "ensure all columns in the comments table match the README",
    ],
  },
  {
    section: "essential",
    endpoint: "/api/articles/1/comments",
    method: "post",
    body: { username: "butter_bridge", body: "this is a comment" },
    makeAssertion: (res, expect) => {
      expect(res.body.comment.votes).to.equal(0);
      expect(res.body.comment.created_at).to.be.a("string");
    },
    hints: [
      "default `votes` to `0` in the migrations",
      "default `created_at` to the current time in the migrations",
    ],
  },
  // SAD PATH
  {
    section: "essential",
    endpoint: "/api/articles/1/comments",
    method: "post",
    body: { body: "this is a comment" },
    makeAssertion: (res, expect) => {
      expect(res.status).to.equal(400);
    },
    hints: [
      "use a 400: Bad Request status code when `POST` request does not include all the required keys",
    ],
  },
  {
    section: "essential",
    endpoint: "/api/articles/10000/comments",
    method: "post",
    body: { username: "butter_bridge", body: "this is a comment" },
    makeAssertion: (res, expect) => {
      expect(res.status).to.be.oneOf([404, 422]);
    },
    hints: [
      "use a 404: Not Found _OR_ 422: Unprocessable Entity status code when `POST` contains a valid article ID that does not exist",
    ],
  },
  {
    section: "essential",
    endpoint: "/api/articles/not-a-valid-id/comments",
    method: "post",
    body: { username: "butter_bridge", body: "this is a comment" },
    makeAssertion: (res, expect) => {
      expect(res.status).to.equal(400);
    },
    hints: [
      "use a 400: Bad Request when `POST` contains an invalid article_id",
    ],
  },
  {
    section: "essential",
    endpoint: "/api/articles/1/comments",
    method: "post",
    body: { username: "definitelynotauser", body: "this is a comment" },
    makeAssertion: (res, expect) => {
      expect(res.status).to.be.oneOf([404, 422]);
    },
    hints: [
      "use a 404: Not Found _OR_ 422: Unprocessable Entity status code when `POST` contains a valid username that does not exist",
    ],
  },
];
