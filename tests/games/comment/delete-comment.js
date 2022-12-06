module.exports = [
  {
    section: "further",
    endpoint: "/api/comments/1",
    method: "delete",
    makeAssertion: (res, expect) => {
      expect(res.status).to.equal(204);
      expect(res.body).to.eql({});
    },
    hints: [
      "use a 204: No Content status code",
      "do not return anything on the body",
    ],
  },
  {
    section: "further",
    endpoint: "/api/comments/1000",
    method: "delete",
    makeAssertion: (res, expect) => {
      expect(res.status).to.equal(404);
    },
    hints: [
      "use a 404: Not Found when `DELETE` contains a valid comment_id that does not exist",
    ],
  },
  {
    section: "further",
    endpoint: "/api/comments/not-a-number",
    method: "delete",
    makeAssertion: (res, expect) => {
      expect(res.status).to.equal(400);
    },
    hints: [
      "use a 400: Bad Request when `DELETE` contains an invalid comment_id",
    ],
  },
];
