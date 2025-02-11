const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/ExpressError.js');
const Listing = require('../models/listing.js');
const {isLoggedIn, isOwner} = require("../middleware.js");

const listingsController = require('../controllers/listings');

const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});




// Index Route // Create Route
router.route("/")
    .get(wrapAsync(listingsController.index))
    .post(isLoggedIn, upload.single("listing[image]"),wrapAsync(listingsController.createRoute))
            

// New & Create Route
router.get("/new",isLoggedIn, wrapAsync(listingsController.newRoute))

// Update Route //delete Route // Show Routes
router.route("/:id")
    .put(isLoggedIn,isOwner, upload.single("listing[image]"), wrapAsync(listingsController.updateRoute))
    .delete(isLoggedIn,isOwner, wrapAsync(listingsController.deleteRoute))
    .get(wrapAsync(listingsController.showRoute))


// Edit Route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingsController.editRoute))











module.exports = router;




