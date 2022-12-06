module.exports = [
  // HAPPY PATH
  {
    section: "further",
    endpoint: "/api/comments/1",
    method: "patch",
    body: { inc_votes: 1 },
    makeAssertion: (res, expect) => {
      expect(res.status).to.equal(200);
    },
    hints: ["use a 200: OK status code for successful `patch` requests"],
  },
  {
    section: "further",
    endpoint: "/api/comments/1",
    method: "patch",
    body: { inc_votes: 1 },
    makeAssertion: (res, expect) => {
      expect(res.body).to.contain.keys("comment");
      expect(res.body.comment.comment_id).to.equal(1);
    },
    hints: [
      "send the updated comment back to the client in an object, with a key of comment: `{ comment: {} }`",
    ],
  },
  {
    section: "further",
    endpoint: "/api/comments/1",
    method: "patch",
    body: { inc_votes: 1 },
    makeAssertion: (res, expect) => {
      expect(res.body.comment.votes).to.equal(17);
    },
    hints: ["increment the `votes` of the specified article"],
  },
  {
    section: "further",
    endpoint: "/api/comments/1",
    method: "patch",
    body: { inc_votes: -1 },
    makeAssertion: (res, expect) => {
      expect(res.body.comment.votes).to.equal(15);
    },
    hints: ["decrement the `votes` of the specified article"],
  },
  // SAD PATH
  {
    section: "further",
    endpoint: "/api/comments/1",
    method: "patch",
    body: { inc_votes: "not a number" },
    makeAssertion: (res, expect) => {
      expect(res.status).to.equal(400);
    },
    hints: [
      "use a 400: Bad Request status code when sent an invalid `inc_votes` value",
    ],
  },
  {
    section: "further",
    endpoint: "/api/comments/1",
    method: "patch",
    body: {},
    makeAssertion: (res, expect) => {
      expect(res.status).to.equal(200);
      expect(res.body.comment.votes).to.equal(16);
    },
    hints: [
      "use 200: OK status code when sent a body with no `inc_votes` property",
      "send an unchanged comment when no `inc_votes` is provided in the request body",
    ],
  },
  // SAD PATH
  {
    section: "further",
    endpoint: "/api/comments/1000",
    method: "patch",
    body: { inc_votes: 1 },
    makeAssertion: (res, expect) => {
      expect(res.status).to.equal(404);
    },
    hints: [
      "use a 404: Not Found when `PATCH` contains a valid comment_id that does not exist",
    ],
  },
  {
    section: "further",
    endpoint: "/api/comments/not-a-valid-id",
    method: "patch",
    body: { inc_votes: 1 },
    makeAssertion: (res, expect) => {
      expect(res.status).to.equal(400);
    },

    hints: [
      "use a 400: Bad Request when `PATCH` contains an invalid comment_id",
    ],
  },
  {
    section: "further",
    endpoint: "/api/comments/1",
    method: "patch",
    body: { inc_votes: "not a number" },
    makeAssertion: (res, expect) => {
      expect(res.status).to.equal(400);
    },
    hints: [
      "use a 400: Bad Request status code when sent an invalid `inc_votes` value",
    ],
  },
];
