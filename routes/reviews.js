const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isReviewAuthor, validateReview } = require("../middleware");
const ReviewController = require("../controllers/reviews");

// CREATE REVIEW
router.post("/", isLoggedIn, validateReview, wrapAsync(ReviewController.createReview));

// DELETE REVIEW
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(ReviewController.deleteReview));

module.exports = router;
