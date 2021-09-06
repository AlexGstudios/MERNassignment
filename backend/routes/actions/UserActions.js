const Bottle = require("../../models/Bottle");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const { messageResponse, errorResponse } = require("./Responses");

const signToken = (userId) => {
  return jwt.sign(
    { iss: "Whisky Collectors AB", sub: userId },
    process.env.WHISKYDB_SECRET,
    {
      expiresIn: 3600 * 24 * 60 * 60,
    }
  );
};

const checkAuth = (req, res) => {
  const { _id, username } = req.user;
  messageResponse(res, "Authenticated", true, { _id, username });
};

const loginUser = (req, res) => {
  if (req.isAuthenticated()) {
    const { _id, username } = req.user;
    const token = signToken(_id);
    res.cookie("authToken", token, { httpOnly: true, sameSite: true });
    messageResponse(res, "Successfully logged in", true, { _id, username });
  }
};

const registerUser = (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username }, (err, user) => {
    if (err) {
      return errorResponse(res);
    }
    if (user) {
      return errorResponse(res, 400, "User already exists");
    } else {
      const newUser = new User({ username, password });
      newUser.save((err) => {
        if (err) {
          return errorResponse(res);
        } else {
          return messageResponse(res, "Successfully registered");
        }
      });
    }
  });
};

const updateUser = (req, res) => {
  const { _id } = req.user._id;
  const { username, password } = req.body;
  // TODO: fix update password
  // TODO: check again for duplicate usernames if changing username
  User.findByIdAndUpdate(_id, { username }, (err, user) => {
    if (err) {
      errorResponse(res);
    } else {
      messageResponse(res, "User updated");
    }
  });
};

const saveBottle = (req, res) => {
  const bottle = new Bottle(req.body);
  bottle.save((err) => {
    if (err) {
      errorResponse(res);
    } else {
      req.user.bottles.push(bottle);
      req.user.save((err) => {
        if (err) {
          errorResponse(res);
        } else {
          messageResponse(res, "Bottle saved successfully", true);
        }
      });
    }
  });
};

const getAllBottles = (req, res) => {
  User.findById({ _id: req.user.id })
    .populate("bottles")
    .exec((err, user) => {
      if (err) {
        errorResponse(res);
      } else {
        messageResponse(
          res,
          "Whiskey bottles list",
          true,
          undefined,
          user.bottles
        );
      }
    });
};

const notFound = (res) => {
  errorResponse(res, 404, "Page not found");
};

const logoutUser = (res) => {
  res.clearCookie("authToken");
  messageResponse(res, "Logged out", false, { username: "" });
};

module.exports = {
  saveBottle,
  registerUser,
  loginUser,
  logoutUser,
  getAllBottles,
  checkAuth,
  notFound,
  updateUser,
};
