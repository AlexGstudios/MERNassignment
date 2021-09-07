const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  bcrypt.hash(this.password, 10, (err, encrypted) => {
    if (err) {
      return next(err);
    }
    this.password = encrypted;
    next();
  });
});

UserSchema.methods.comparePassword = function (
  password,
  callback,
  newPassword,
  res
) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      return callback(err, null, null, res);
    }
    if (!isMatch) {
      return callback(null, isMatch, null, res);
    }
    return callback(null, this, newPassword, res);
  });
};

module.exports = mongoose.model("User", UserSchema);
