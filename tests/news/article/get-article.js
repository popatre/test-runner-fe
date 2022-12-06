module.exports = [
  // HAPPY PATH
  {
    section: "essential",
    endpoint: "/api/articles/1",
    method: "get",
    makeAssertion: (res, expect) => {
      expect(res.status).to.equal(200);
    },
    hints: ["use a 200 status code"],
  },
  {
    section: "essential",
    endpoint: "/api/articles/1",
    method: "get",
    makeAssertion: (res, expect) => {
      expect(res.body).to.contain.keys("article");
      expect(res.body.article).to.be.an("object");
      expect(res.body.article).to.contain.keys(
        "article_id",
        "body",
        "title",
        "topic",
        "author",
        "created_at",
        "votes",
        "comment_count",
      );
    },
    hints: [
      "send the article to the client in an object, with a key of `article`: `{ article: {} }`",
      "return the single article in an object, not in an array",
      "ensure there are no discrepancies between the README specification and your table column names",
    ],
  },
  {
    section: "essential",
    endpoint: "/api/articles/2",
    method: "get",
    makeAssertion: (res, expect) => {
      expect(res.body.article.votes).to.equal(0);
    },
    hints: [
      "default the vote column to `0` in the seed",
      "article with article_id 2 has no comments, you may need to check your join",
    ],
  },
  {
    section: "essential",
    endpoint: "/api/articles/1",
    method: "get",
    makeAssertion: (res, expect) => {
      expect(res.body.article.comment_count.toString()).to.equal("11");
    },
    hints: ["ensure you have calculated a comment_count for the article"],
  },
  // SAD PATH
  {
    section: "essential",
    endpoint: "/api/articles/1000",
    method: "get",
    makeAssertion: (res, expect) => {
      expect(res.status).to.equal(404);
    },

    hints: [
      "if an article is not found with a valid `article_id`, use a 404: Not Found status code",
    ],
  },
  {
    section: "essential",
    endpoint: "/api/articles/dog",
    method: "get",
    makeAssertion: (res, expect) => {
      expect(res.status).to.equal(400);
    },
    hints: [
      "if send an invalid `article_id`, use a 400: Bad Request status code",
    ],
  },
];
