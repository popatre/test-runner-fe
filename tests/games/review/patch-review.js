module.exports = [
  // HAPPY PATH
  {
    section: "essential",
    endpoint: "/api/reviews/1",
    method: "patch",
    body: { inc_votes: 1 },
    makeAssertion: (res, expect) => {
      expect(res.status).to.equal(200);
    },
    hints: ["use a 200: OK status code for successful `patch` requests"],
  },
  {
    section: "essential",
    endpoint: "/api/reviews/1",
    method: "patch",
    body: { inc_votes: 1 },
    makeAssertion: (res, expect) => {
      expect(res.body).to.contain.keys("review");
      expect(res.body.review).to.be.an("object");
    },
    hints: ["send the updated review with a key of `review`"],
  },
  {
    section: "essential",
    endpoint: "/api/reviews/2",
    method: "patch",
    body: { inc_votes: 1 },
    makeAssertion: (res, expect) => {
      expect(res.body.review.votes).to.be.equal(6);
    },

    hints: ["increment the `votes` of the specified review"],
  },
  {
    section: "essential",
    endpoint: "/api/reviews/2",
    method: "patch",
    body: { inc_votes: -1 },
    makeAssertion: (res, expect) => {
      expect(res.body.review.votes).to.be.equal(4);
    },

    hints: ["decrement the `votes` of the specified review"],
  },
  {
    section: "essential",
    endpoint: "/api/reviews/1",
    method: "patch",
    body: {},
    makeAssertion: (res, expect) => {
      expect(res.status).to.be.equal(200);
      expect(res.body.review.votes).to.be.equal(1);
    },
    hints: [
      "ignore a `patch` request with no information in the request body, and send the unchanged review to the client",
    ],
  },
  {
    section: "essential",
    endpoint: "/api/reviews/1",
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
