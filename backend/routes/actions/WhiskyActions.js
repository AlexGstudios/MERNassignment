const Whisky = require("../../models/Whisky");
const { messageResponse, errorResponse } = require("./Responses");

// search by title or region, using "search" req arg, max 10 results
const findWhisky = (req, res) => {
  const { search } = req.body;
  Whisky.find(
    {
      $or: [
        { title: { $regex: search, $options: "i" } },
        { region: { $regex: search, $options: "i" } },
      ],
    },
    (err, whiskies) => {
      if (err) {
        return errorResponse(res);
      }
      if (whiskies.length < 1) {
        errorResponse(res, 404, "No whiskies found");
      } else {
        let matches = [];
        whiskies.map((whisky) => {
          const { title, region, detail_img_url } = whisky;
          matches.push({ title, region, detail_img_url });
        });
        messageResponse(res, matches);
      }
    }
  ).limit(10);
};

module.exports = { findWhisky };
