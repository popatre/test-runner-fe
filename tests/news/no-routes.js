module.exports = [
  {
    section: "essential",
    endpoint: "/non-existent-route",
    method: "get",
    makeAssertion: (res, expect) => {
      expect(res.status).to.equal(404);
    },
    hints: [
      "have middleware to catch non-existent routes with a wildcard: `/*`",
      "use a 404 status code",
    ],
  },
];
