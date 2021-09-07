const express = require("express");
const passport = require("passport");
const passportConfig = require("../passport");
const userActions = require("./actions/UserActions");
const bottleActions = require("./actions/BottleActions");
const userRouter = express.Router();
const errorResponse = require("./actions/Responses");

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
        return bottleActions.getAllBottles(req, res);
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
      default:
        errorResponse(res, 404, "Page not found");
    }
  })
  .delete(passport.authenticate("jwt", { session: false }), (req, res) => {
    switch (req.params.name) {
      case "deleteuser":
        return userActions.deleteUser(req, res);
      default:
        errorResponse(res, 404, "Page not found");
    }
  });

userRouter
  .route("/bottles/:id")
  .get(passport.authenticate("jwt", { session: false }), (req, res) => {
    return bottleActions.getSingleBottle(req, res);
  })
  .put(passport.authenticate("jwt", { session: false }), (req, res) => {
    return bottleActions.updateBottle(req, res);
  })
  .delete(passport.authenticate("jwt", { session: false }), (req, res) => {
    return bottleActions.deleteBottle(req, res);
  });

module.exports = userRouter;
