const express = require('express');
const router = express.Router({mergeParams: true});
const wrapAsync = require('../utils/wrapAsync.js');
const Listing = require('../models/listing.js');
const Review = require('../models/review.js');
const ExpressError = require('../utils/ExpressError.js');
const { isLoggedIn, isReviewAuthor } = require('../middleware.js');

const reviewController = require('../controllers/reviews');

// Review - Post Route
router.post('/', wrapAsync(reviewController.postRoute));

// post route for delete review
router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(reviewController.deleteRoute))

module.exports = router;