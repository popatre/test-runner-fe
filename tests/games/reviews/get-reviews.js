module.exports = [
  // HAPPY PATH
  {
    section: "essential",
    endpoint: "/api/reviews",
    method: "get",
    makeAssertion: (res, expect) => {
      expect(res.status).to.equal(200);
    },
    hints: ["use a 200 status code"]
  },
  {
    section: "essential",
    endpoint: "/api/reviews",
    method: "get",
    makeAssertion: (res, expect) => {
      expect(res.body).to.contain.keys("reviews");
      expect(res.body.reviews).to.be.an("array");
    },
    hints: [
      "send reviews to the client in an object, with a key of reviews: `{ reviews: [] }`",
      "use the data from the `test-data` in your tests"
    ]
  },
  {
    section: "essential",
    endpoint: "/api/reviews",
    method: "get",
    makeAssertion: (res, expect) => {
      expect(res.body.reviews[0].review_id).to.equal(
        7,
        "the first review should have `review_id === 7`"
      );
      expect(res.body.reviews[1].review_id).to.equal(
        4,
        "the second review should have `review_id === 4`"
      );
    },
    hints: [
      "the default sort should be by `created_at` and the default order should be `desc`"
    ]
  },
  {
    section: "essential",
    endpoint: "/api/reviews",
    method: "get",
    makeAssertion: (res, expect) => {
      expect(res.body.reviews[0].comment_count.toString()).to.equal(
        "0",
        "The first review should have a comment count of `'0'`"
      );
    },
    hints: [
      "add a `comment_count` property to each review",
      "join to the `comments` table, as this information lives there",
      "use an aggregate `COUNT` function",
      "use `GROUP BY` to avoid duplicate rows"
    ]
  },
  // HAPPY PATH QUERIES
  {
    section: "essential",
    endpoint: "/api/reviews?sort_by=owner",
    method: "get",
    makeAssertion: (res, expect) => {
      expect(res.body.reviews[0].owner).to.equal("philippaclaire9");
      expect(res.body.reviews[1].owner).to.equal("mallionaire");
      expect(res.body.reviews[2].owner).to.equal("mallionaire");
    },
    hints: [
      "accept a `sort_by` query, with a value of any column name",
      "use `owner` for the column to store the username that created the review"
    ]
  },
  {
    section: "essential",
    endpoint: "/api/reviews?order=asc",
    method: "get",
    makeAssertion: (res, expect) => {
      expect(res.body.reviews[0].title).to.equal(
        "Settlers of Catan: Don't Settle For Less"
      );
    },
    hints: ["accept an `order` query of `asc` or `desc`"]
  },
  {
    section: "essential",
    endpoint: "/api/reviews?category=dexterity",
    method: "get",
    makeAssertion: (res, expect) => {
      expect(res.body.reviews).to.satisfy((reviews) => {
        return reviews.every((review) => review.category === "dexterity");
      }, "all reviews should be of the category in the query");
    },
    hints: [
      "accept an `category` query of any category that exists in the database",
      "use `where` in the model"
    ]
  },
  {
    section: "essential",
    endpoint: "/api/reviews?category=children's games",
    method: "get",
    makeAssertion: (res, expect) => {
      expect(res.status).to.equal(200);
      expect(res.body.reviews).to.eql([]);
    },
    hints: [
      "give a 200 status and an empty array when reviews for a category that does exist, but has no reviews is requested",
      "use a separate model to check whether the category exists"
    ]
  },
  // SAD PATH QUERIES
  {
    section: "essential",
    endpoint: "/api/reviews?category=not-a-category",
    method: "get",
    makeAssertion: (res, expect) => {
      expect(res.status).to.equal(404);
    },
    hints: [
      "use a 404 status code, when provided a non-existent category",
      "use a separate model to check whether the category exists"
    ]
  },
  {
    section: "essential",
    endpoint: "/api/reviews?sort_by=not-a-column",
    method: "get",
    makeAssertion: (res, expect) => {
      expect(res.status).to.be.oneOf([200, 400]);
    },
    hints: [
      "filter out invalid `sort_by` queries _OR_ handle in the error handling middleware",
      "pick a consistent approach: ignore the invalid query, and use a 200 to serve up the reviews with the default sort _OR_ use a 400 and provide a useful message to the client"
    ]
  },
  {
    section: "essential",
    endpoint: "/api/reviews?order=not-asc-or-desc",
    method: "get",
    makeAssertion: (res, expect) => {
      expect(res.status).to.be.oneOf([200, 400]);
    },
    hints: [
      "filter out invalid `order` queries _OR_ handle in the error handling middleware",
      "pick a consistent approach: ignore the invalid query, and use a 200 to serve up the reviews in the default order _OR_ use a 400 and provide a useful message to the client"
    ]
  }
];
