const express = require("express");
const passport = require("passport");
const passportConfig = require("../passport");
const userActions = require("./actions/UserActions");
const bottleActions = require("./actions/BottleActions");
const whiskyActions = require("./actions/WhiskyActions");
const { errorResponse } = require("./actions/Responses");
const router = express.Router();

router.post("/register", (req, res) => {
  userActions.registerUser(req, res);
});

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    userActions.loginUser(req, res);
  }
);

router
  .route("/:name")
  .get(passport.authenticate("jwt", { session: false }), (req, res) => {
    switch (req.params.name) {
      case "authenticated":
        return userActions.checkAuth(req, res);
      case "logout":
        return userActions.logoutUser(res);
      case "getbottles":
        return bottleActions.getAllBottles(req, res);
      case "bottles":
        return bottleActions.getSingleBottle(req, res);
      case "whisky":
        return whiskyActions.findWhisky(req, res);
      default:
        errorResponse(res, 404, "Page not found");
    }
  })
  .post(passport.authenticate("jwt", { session: false }), (req, res) => {
    switch (req.params.name) {
      case "newbottle":
        return bottleActions.saveBottle(req, res);
      default:
        errorResponse(res, 404, "Page not found");
    }
  })
  .put(passport.authenticate("jwt", { session: false }), (req, res) => {
    switch (req.params.name) {
      case "updateuser":
        return userActions.updateUser(req, res);
      case "bottles":
        return bottleActions.updateBottle(req, res);
      default:
        errorResponse(res, 404, "Page not found");
    }
  })
  .delete(passport.authenticate("jwt", { session: false }), (req, res) => {
    switch (req.params.name) {
      case "deleteuser":
        return userActions.deleteUser(req, res);
      case "bottles":
        return bottleActions.deleteBottle(req, res);
      default:
        errorResponse(res, 404, "Page not found");
    }
  });

module.exports = router;
