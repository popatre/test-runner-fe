module.exports = [
  {
    section: "essential",
    endpoint: "/api/topics",
    method: "get",
    makeAssertion: (res, expect) => {
      expect(res.status).to.equal(200);
    },
    hints: ["use a 200 status code"],
  },
  {
    section: "essential",
    endpoint: "/api/topics",
    method: "get",
    makeAssertion: (res, expect) => {
      expect(res.body).to.contain.keys("topics");
      expect(res.body.topics).to.be.an("array");
      expect(res.body.topics).to.have.length(3);
      expect(res.body.topics[0]).to.eql({
        slug: "mitch",
        description: "The man, the Mitch, the legend",
      });
    },
    hints: [
      "send topics to the client in an object, with a key of topics: `{ topics: [] }`",
      "use the data from the `test-data` in your tests",
      "ensure there are no discrepancies between the README specification and your table column names",
    ],
  },
];
