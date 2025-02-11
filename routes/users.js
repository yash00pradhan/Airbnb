const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const wrapAsync = require('../utils/wrapAsync.js');
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware.js');

const userController = require('../controllers/users.js');

// render signup form
// create new user
router.route("/signup")
    .get(userController.renderSignUpForm)
    .post( wrapAsync(userController.signUp));

// render login form // user login
router.route("/login")
    .get(userController.renderLoginForm)
    .post(saveRedirectUrl, passport.authenticate("local", {failureRedirect: "/login", failureFlash:true}) ,userController.login)

// logout
router.get("/logout", userController.logout)

module.exports = router;