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
  bottles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bottle",
    },
  ],
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

UserSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    if (!isMatch) {
      return callback(null, isMatch);
    }
    return callback(null, this);
  });
};

module.exports = mongoose.model("User", UserSchema);
