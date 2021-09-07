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

const changePassword = (err, user, newPassword, res) => {
  if (err) {
    return errorResponse(res);
  }
  if (!user) {
    errorResponse(res, 400, "Current password is incorrect");
  } else {
    // pre call does not work as expected with findOneAndUpdate, use save instead
    user.password = newPassword;
    user.save((err) => {
      if (err) {
        errorResponse(res);
      } else {
        messageResponse(res, "Password changed");
      }
    });
  }
};

const updateUser = (req, res) => {
  const { currentPassword, newPassword } = req.body;
  req.user.comparePassword(currentPassword, changePassword, newPassword, res);
};

const deleteUser = (req, res) => {
  req.user.delete((err) => {
    if (err) {
      errorResponse(res);
    } else {
      res.clearCookie("authToken");
      messageResponse(res, "User deleted", false, { username: "" });
    }
  });
};

const logoutUser = (res) => {
  res.clearCookie("authToken");
  messageResponse(res, "Logged out", false, { username: "" });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  checkAuth,
  updateUser,
  deleteUser,
};
