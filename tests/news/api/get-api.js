module.exports = [
  // HAPPY PATH
  {
    section: "essential",
    endpoint: "/api",
    method: "get",
    makeAssertion: (res, expect) => {
      expect(res.status).to.equal(200);
    },
    hints: ["use a 200 status code"],
  },
  {
    section: "essential",
    endpoint: "/api",
    method: "get",
    makeAssertion: (res, expect) => {
      expect(res.body).to.be.an("object");
    },
    hints: ["return a body on the response"],
  },
];
