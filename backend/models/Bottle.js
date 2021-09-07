const mongoose = require("mongoose");

const BottleSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: String,
  },
  price: {
    type: String,
  },
  destillery: {
    type: String,
  },
  grade: {
    type: String,
  },
  userId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Bottle", BottleSchema);
