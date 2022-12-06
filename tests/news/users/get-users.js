module.exports = [
  // HAPPY PATH
  {
    section: "further",
    endpoint: "/api/users",
    method: "get",
    makeAssertion: (res, expect) => {
      expect(res.status).to.equal(200);
    },
    hints: ["use a 200 status code"],
  },
  {
    section: "further",
    endpoint: "/api/users",
    method: "get",
    makeAssertion: (res, expect) => {
      expect(res.body).to.contain.keys("users");
      expect(res.body.users).to.be.an("array");
    },
    hints: [
      "send users to the client in an object, with a key of users: `{ users: [] }`",
    ],
  },
  {
    section: "further",
    endpoint: "/api/users",
    method: "get",
    makeAssertion: (res, expect) => {
      expect(res.body.users[0]).to.contain.keys("username");
    },
    hints: [
      "send users to the client in an object, with a key of users: `{ users: [] }`",
      "use `username` for the column to store the username",
    ],
  },
];
