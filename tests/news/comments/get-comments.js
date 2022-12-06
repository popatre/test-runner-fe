module.exports = [
  // HAPPY PATH
  {
    section: "essential",
    endpoint: "/api/articles/1/comments",
    method: "get",
    makeAssertion: (res, expect) => {
      expect(res.status).to.equal(200);
    },
    hints: ["use a 200: OK status code for a successful `GET` request"],
  },
  {
    section: "essential",
    endpoint: "/api/articles/1/comments",
    method: "get",
    makeAssertion: (res, expect) => {
      expect(res.body).to.be.an("object");
      expect(res.body.comments).to.be.an("array");
    },
    hints: ["send comments in an array, with a key of `comments`"],
  },
  {
    section: "essential",
    endpoint: "/api/articles/1/comments",
    method: "get",
    makeAssertion: (res, expect) => {
      expect(res.body.comments[0]).to.contain.keys(
        "comment_id",
        "votes",
        "created_at",
        "author",
        "body",
      );
    },
    hints: [
      "send comments to the client in an object, with a key of comments: `{ comments: [] }`",
      "use `author` for the column to store the username that created the comment",
      "each comment does not need a key of `article_id`",
      "use the data from the `test-data` in your tests",
    ],
  },
  {
    section: "essential",
    endpoint: "/api/articles/2/comments",
    method: "get",
    makeAssertion: (res, expect) => {
      expect(res.status).to.equal(200);
      expect(res.body.comments).to.eql([]);
    },
    hints: [
      "return 200: OK when the article exists",
      "serve an empty array when the article exists but has no comments",
    ],
  },
  // SAD PATH
  {
    section: "essential",
    endpoint: "/api/articles/1000/comments",
    method: "get",
    makeAssertion: (res, expect) => {
      expect(res.status).to.equal(404);
    },
    hints: [
      "return 404: Not Found when given a valid `article_id` that does not exist",
    ],
  },
  {
    section: "essential",
    endpoint: "/api/articles/not-a-valid-id/comments",
    method: "get",
    makeAssertion: (res, expect) => {
      expect(res.status).to.equal(400);
    },
    hints: ["return 400: Bad Request when given an invalid `article_id`"],
  },
];
