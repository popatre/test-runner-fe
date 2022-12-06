module.exports = [
  // HAPPY PATH
  {
    section: "further",
    endpoint: "/api/users/bainesface",
    method: "get",
    makeAssertion: (res, expect) => {
      expect(res.status).to.equal(200);
    },
    hints: ["use a 200 status code"],
  },
  {
    section: "further",
    endpoint: "/api/users/bainesface",
    method: "get",
    makeAssertion: (res, expect) => {
      expect(res.body).to.contain.keys("user");
      expect(res.body.user).to.be.an("object");
      expect(res.body.user).to.contain.keys("username", "avatar_url", "name");
    },
    hints: [
      "send the user to the client in an object, with a key of `user`: `{ user: {} }`",
      "return the single user in an object, not in an array",
      "ensure there are no discrepancies between the README specification and your table column names",
    ],
  },
  {
    section: "further",
    endpoint: "/api/users/not-a-username",
    method: "get",
    makeAssertion: (res, expect) => {
      expect(res.status).to.equal(404);
    },
    hints: [
      "if a user is not found with a valid `user_id`, use a 404: Not Found status code",
    ],
  },
];
