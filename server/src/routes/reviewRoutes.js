const { Router } = require("express");
const {
  getReviewHandler,
} = require("../handlers/ReviewHandlers/getReviewHandler");
const {
  getReviewByIdHandler,
} = require("../handlers/ReviewHandlers/getReviewByIdHandler");
const {
  getReviewByProductIdHandler,
} = require("../handlers/ReviewHandlers/getReviewByProductIdHandler");
const {
  createReviewHandler,
} = require("../handlers/ReviewHandlers/createReviewHandler");
const {
  updateReviewHandler,
} = require("../handlers/ReviewHandlers/updateReviewHandler");
const {
  deleteReviewHandler,
} = require("../handlers/ReviewHandlers/deleteReviewHandler");

const reviewRoutes = Router();

reviewRoutes.get("", getReviewHandler);
reviewRoutes.post("", createReviewHandler);
reviewRoutes.get("/:reviewId", getReviewByIdHandler);
reviewRoutes.get("/product/:productId", getReviewByProductIdHandler);
reviewRoutes.delete("/:reviewId", deleteReviewHandler);
reviewRoutes.put("/:reviewId", updateReviewHandler);

module.exports = reviewRoutes;
