module.exports = [
  // HAPPY PATH
  {
    section: "essential",
    endpoint: "/api/articles",
    method: "get",
    makeAssertion: (res, expect) => {
      expect(res.status).to.equal(200);
    },
    hints: ["use a 200 status code"],
  },
  {
    section: "essential",
    endpoint: "/api/articles",
    method: "get",
    makeAssertion: (res, expect) => {
      expect(res.body).to.contain.keys("articles");
      expect(res.body.articles).to.be.an("array");
    },
    hints: [
      "send articles to the client in an object, with a key of articles: `{ articles: [] }`",
      "use the data from the `test-data` in your tests",
    ],
  },
  {
    section: "essential",
    endpoint: "/api/articles",
    method: "get",
    makeAssertion: (res, expect) => {
      expect(res.body.articles[0].article_id).to.equal(
        3,
        "the first article should have `article_id === 3`",
      );
      expect(res.body.articles[1].article_id).to.equal(
        6,
        "the second article should have `article_id === 6`",
      );
    },
    hints: [
      "the default sort should be by `created_at` and the default order should be `desc`",
    ],
  },
  {
    section: "essential",
    endpoint: "/api/articles",
    method: "get",
    makeAssertion: (res, expect) => {
      expect(res.body.articles[0].comment_count.toString()).to.equal(
        "2",
        "The first article should have a comment count of 2",
      );
    },
    hints: [
      "add a `comment_count` property to each article",
      "join to the `comments` table, as this information lives there",
      "use an aggregate `COUNT` function",
      "use `GROUP BY` to avoid duplicate rows",
    ],
  },
  // HAPPY PATH QUERIES
  {
    section: "essential",
    endpoint: "/api/articles?sort_by=author",
    method: "get",
    makeAssertion: (res, expect) => {
      expect(res.body.articles[0].author).to.equal("rogersop");
      expect(res.body.articles[1].author).to.equal("rogersop");
      expect(res.body.articles[2].author).to.equal("rogersop");
    },
    hints: [
      "accept a `sort_by` query, with a value of any column name",
      "use `author` for the column to store the username that created the article",
    ],
  },
  {
    section: "essential",
    endpoint: "/api/articles?order=asc",
    method: "get",
    makeAssertion: (res, expect) => {
      expect(res.body.articles[0].title).to.equal("Z");
    },
    hints: ["accept an `order` query of `asc` or `desc`"],
  },
  {
    section: "essential",
    endpoint: "/api/articles?topic=mitch",
    method: "get",
    makeAssertion: (res, expect) => {
      expect(res.body.articles).to.satisfy((articles) => {
        return articles.every((article) => article.topic === "mitch");
      }, "all articles should be by the topic in the query");
    },
    hints: [
      "accept an `topic` query of any topic slug that exists in the database",
      "use `where` in the model",
    ],
  },
  {
    section: "essential",
    endpoint: "/api/articles?topic=paper",
    method: "get",
    makeAssertion: (res, expect) => {
      expect(res.status).to.equal(200);
      expect(res.body.articles).to.eql([]);
    },
    hints: [
      "give a 200 status and an empty array when articles for a topic that does exist, but has no articles is requested",
      "use a separate model to check whether the topic exists",
    ],
  },
  // SAD PATH QUERIES
  {
    section: "essential",
    endpoint: "/api/articles?topic=not-a-topic",
    method: "get",
    makeAssertion: (res, expect) => {
      expect(res.status).to.equal(404);
    },
    hints: [
      "use a 404 status code, when provided a non-existent topic",
      "use a separate model to check whether the topic exists",
    ],
  },
  {
    section: "essential",
    endpoint: "/api/articles?sort_by=not-a-column",
    method: "get",
    makeAssertion: (res, expect) => {
      expect(res.status).to.be.oneOf([200, 400]);
    },
    hints: [
      "filter out invalid `sort_by` queries _OR_ handle in the error handling middleware",
      "pick a consistent approach: ignore the invalid query, and use a 200 to serve up the articles with the default sort _OR_ use a 400 and provide a useful message to the client",
    ],
  },
  {
    section: "essential",
    endpoint: "/api/articles?order=not-asc-or-desc",
    method: "get",
    makeAssertion: (res, expect) => {
      expect(res.status).to.be.oneOf([200, 400]);
    },
    hints: [
      "filter out invalid `order` queries _OR_ handle in the error handling middleware",
      "pick a consistent approach: ignore the invalid query, and use a 200 to serve up the articles in the default order _OR_ use a 400 and provide a useful message to the client",
    ],
  },
];
