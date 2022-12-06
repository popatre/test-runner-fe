module.exports = [
  {
    section: "essential",
    endpoint: "/api/categories",
    method: "get",
    makeAssertion: (res, expect) => {
      expect(res.status).to.equal(200);
    },
    hints: ["use a 200 status code"],
  },
  {
    section: "essential",
    endpoint: "/api/categories",
    method: "get",
    makeAssertion: (res, expect) => {
      expect(res.body).to.contain.keys("categories");
      expect(res.body.categories).to.be.an("array");
      expect(res.body.categories).to.have.length(4);
      expect(res.body.categories[0]).to.eql({
        slug: "euro game",
        description: "Abstact games that involve little luck",
      });
    },
    hints: [
      "send categories to the client in an object, with a key of categories: `{ categories: [] }`",
      "use the data from the `test-data` in your tests",
      "ensure there are no discrepancies between the README specification and your table column names",
    ],
  },
];
