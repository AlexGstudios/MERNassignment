const express = require("express");
const passport = require("passport");
const passportConfig = require("../passport");
const userActions = require("./actions/UserActions");
const userRouter = express.Router();

userRouter.post("/register", (req, res) => {
  userActions.registerUser(req, res);
});

userRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    userActions.loginUser(req, res);
  }
);

userRouter
  .route("/:name")
  .get(passport.authenticate("jwt", { session: false }), (req, res) => {
    switch (req.params.name) {
      case "authenticated":
        return userActions.checkAuth(req, res);
      case "logout":
        return userActions.logoutUser(res);
      case "getbottles":
        return userActions.getAllBottles(req, res);
      default:
        return userActions.notFound(req, res);
    }
  })
  .post(passport.authenticate("jwt", { session: false }), (req, res) => {
    switch (req.params.name) {
      case "newbottle":
        return userActions.saveBottle(req, res);
      default:
        return userActions.notFound(res);
    }
  })
  .put(passport.authenticate("jwt", { session: false }), (req, res) => {
    switch (req.params.name) {
      case "updateuser":
        return userActions.updateUser(req, res);
      default:
        return userActions.notFound(res);
    }
  });

module.exports = userRouter;
