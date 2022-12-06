module.exports = [
  // HAPPY PATH
  {
    section: "essential",
    endpoint: "/api/articles/1",
    method: "patch",
    body: { inc_votes: 1 },
    makeAssertion: (res, expect) => {
      expect(res.status).to.equal(200);
    },
    hints: ["use a 200: OK status code for successful `patch` requests"],
  },
  {
    section: "essential",
    endpoint: "/api/articles/1",
    method: "patch",
    body: { inc_votes: 1 },
    makeAssertion: (res, expect) => {
      expect(res.body).to.contain.keys("article");
      expect(res.body.article).to.be.an("object");
    },
    hints: ["send the updated article with a key of `article`"],
  },
  {
    section: "essential",
    endpoint: "/api/articles/1",
    method: "patch",
    body: { inc_votes: 1 },
    makeAssertion: (res, expect) => {
      expect(res.body.article.votes).to.be.equal(101);
    },

    hints: ["increment the `votes` of the specified article"],
  },
  {
    section: "essential",
    endpoint: "/api/articles/1",
    method: "patch",
    body: { inc_votes: -1 },
    makeAssertion: (res, expect) => {
      expect(res.body.article.votes).to.be.equal(99);
    },

    hints: ["decrement the `votes` of the specified article"],
  },
  {
    section: "essential",
    endpoint: "/api/articles/1",
    method: "patch",
    body: {},
    makeAssertion: (res, expect) => {
      expect(res.status).to.be.equal(200);
      expect(res.body.article.votes).to.be.equal(100);
    },
    hints: [
      "ignore a `patch` request with no information in the request body, and send the unchanged article to the client",
    ],
  },
  {
    section: "essential",
    endpoint: "/api/articles/1",
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
