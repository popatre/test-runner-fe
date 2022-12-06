const getCategoriesTests = require("./categories/get-categories");
const getReviewsTests = require("./reviews/get-reviews");
const getReviewTests = require("./review/get-review");
const patchReviewTests = require("./review/patch-review");
const getCommentsTests = require("./comments/get-comments");
const postCommentTests = require("./comment/post-comment");
const getApiTests = require("./api/get-api");
const deleteCommentTests = require("./comment/delete-comment");
const getUsersTests = require("./users/get-users");
const getUserTests = require("./user/get-user");
const patchCommentTests = require("./comment/patch-comment");
const noRoutesTests = require("./no-routes");

module.exports = [
  ...getCategoriesTests,
  ...getReviewsTests,
  ...getReviewTests,
  ...patchReviewTests,
  ...getCommentsTests,
  ...postCommentTests,
  ...getApiTests,
  ...deleteCommentTests,
  ...getUsersTests,
  ...getUserTests,
  ...patchCommentTests,
  ...noRoutesTests,
];
