const Bottle = require("../../models/Bottle");
const { messageResponse, errorResponse } = require("./Responses");

const getAllBottles = (req, res) => {
  Bottle.find({ userId: req.user.id }, (err, bottles) => {
    if (err) {
      errorResponse(res);
    } else {
      messageResponse(res, "Whisky bottles list", true, undefined, bottles);
    }
  });
};

const getSingleBottle = (req, res) => {
  Bottle.find({ _id: req.params.id, userId: req.user._id }, (err, bottle) => {
    if (err) {
      return errorResponse(res);
    }
    if (bottle.length < 1) {
      errorResponse(res, 404, "Bottle not found");
    } else {
      messageResponse(res, "Bottle", true, undefined, bottle[0]);
    }
  });
};

const saveBottle = (req, res) => {
  const bottle = new Bottle({ ...req.body, userId: req.user.id });
  bottle.save((err) => {
    if (err) {
      errorResponse(res);
    } else {
      messageResponse(res, "Bottle saved successfully", true);
    }
  });
};

const updateBottle = (req, res) => {
  Bottle.find({ _id: req.params.id, userId: req.user._id }, (err, bottle) => {
    if (err) {
      return errorResponse(res);
    }
    if (bottle.length < 1) {
      errorResponse(res, 404, "Bottle not found");
    } else {
      bottle[0].updateOne(req.body, (err) => {
        if (err) {
          errorResponse(res);
        } else {
          messageResponse(res, "Bottle updated successfully");
        }
      });
    }
  });
};

const deleteBottle = (req, res) => {
  Bottle.find({ _id: req.params.id, userId: req.user._id }, (err, bottle) => {
    if (err) {
      return errorResponse(res);
    }
    if (bottle.length < 1) {
      errorResponse(res, 404, "Bottle not found");
    } else {
      bottle[0].delete(req.body, (err) => {
        if (err) {
          errorResponse(res);
        } else {
          messageResponse(res, "Bottle deleted successfully");
        }
      });
    }
  });
};

module.exports = {
  saveBottle,
  getAllBottles,
  getSingleBottle,
  updateBottle,
  deleteBottle,
};