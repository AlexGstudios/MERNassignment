const mongoose = require("mongoose");

const WhiskySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    region: {
      type: String,
    },
    detail_img_url: {
      type: String,
    },
  },
  { collection: "whiskies" }
);

module.exports = mongoose.model("Whisky", WhiskySchema);
