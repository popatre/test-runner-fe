const getTopicsTests = require("./topics/get-topics");
const getArticlesTests = require("./articles/get-articles");
const getArticleTests = require("./article/get-article");
const patchArticleTests = require("./article/patch-article");
const getCommentsTests = require("./comments/get-comments");
const postCommentTests = require("./comment/post-comment");
const getApiTests = require("./api/get-api");
const deleteCommentTests = require("./comment/delete-comment");
const getUsersTests = require("./users/get-users");
const getUserTests = require("./user/get-user");
const patchCommentTests = require("./comment/patch-comment");
const noRoutesTests = require("./no-routes");

module.exports = [
  ...getTopicsTests,
  ...getArticlesTests,
  ...getArticleTests,
  ...patchArticleTests,
  ...getCommentsTests,
  ...postCommentTests,
  ...getApiTests,
  ...deleteCommentTests,
  ...getUsersTests,
  ...getUserTests,
  ...patchCommentTests,
  ...noRoutesTests,
];
