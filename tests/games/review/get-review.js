module.exports = [
  // HAPPY PATH
  {
    section: "essential",
    endpoint: "/api/reviews/2",
    method: "get",
    makeAssertion: (res, expect) => {
      expect(res.status).to.equal(200);
    },
    hints: ["use a 200 status code"],
  },
  {
    section: "essential",
    endpoint: "/api/reviews/2",
    method: "get",
    makeAssertion: (res, expect) => {
      expect(res.body).to.contain.keys("review");
      expect(res.body.review).to.be.an("object");
      expect(res.body.review).to.contain.keys(
        "review_id",
        "review_body",
        "title",
        "category",
        "owner",
        "created_at",
        "votes",
        "comment_count",
        "review_img_url",
        "designer"
      );
    },
    hints: [
      "send the review to the client in an object, with a key of `review`: `{ review: {} }`",
      "return the single review in an object, not in an array",
      "ensure there are no discrepancies between the README specification and your table column names",
    ],
  },
  {
    section: "essential",
    endpoint: "/api/reviews/1",
    method: "get",
    makeAssertion: (res, expect) => {
      expect(res.body.review.comment_count.toString()).to.equal("0");
    },
    hints: [
      "review with review_id 1 has no comments, you may need to check your join",
    ],
  },
  {
    section: "essential",
    endpoint: "/api/reviews/2",
    method: "get",
    makeAssertion: (res, expect) => {
      expect(res.body.review.comment_count.toString()).to.equal("3");
    },
    hints: ["ensure you have calculated a comment_count for the review"],
  },
  // SAD PATH
  {
    section: "essential",
    endpoint: "/api/reviews/1000",
    method: "get",
    makeAssertion: (res, expect) => {
      expect(res.status).to.equal(404);
    },

    hints: [
      "if an review is not found with a valid `review_id`, use a 404: Not Found status code",
    ],
  },
  {
    section: "essential",
    endpoint: "/api/reviews/dog",
    method: "get",
    makeAssertion: (res, expect) => {
      expect(res.status).to.equal(400);
    },
    hints: [
      "if send an invalid `review_id`, use a 400: Bad Request status code",
    ],
  },
];
