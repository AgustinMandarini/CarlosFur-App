const { Router } = require("express");
const { getReviewHandler } = require("../handlers/ReviewHandlers/getReviewHandler");
const { createReviewHandler } = require("../handlers/ReviewHandlers/createReviewHandler");

const reviewRoutes = Router();

reviewRoutes.get("", getReviewHandler);
reviewRoutes.post("", createReviewHandler);

module.exports = reviewRoutes;