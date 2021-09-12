const Bottle = require("../../models/Bottle");
const { messageResponse, errorResponse } = require("./Responses");

const getAllBottles = (req, res) => {
  Bottle.find({ userId: req.user.id }, (err, bottles) => {
    if (err) {
      errorResponse(res);
    } else {
      messageResponse(res, bottles, true);
    }
  });
};

const getSingleBottle = (req, res) => {
  Bottle.find({ _id: req.query.id, userId: req.user._id }, (err, bottle) => {
    if (err) {
      return errorResponse(res);
    }
    if (bottle.length < 1) {
      errorResponse(res, 404, "Bottle not found");
    } else {
      messageResponse(res, bottle[0], true);
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
  Bottle.find({ _id: req.query.id, userId: req.user._id }, (err, bottle) => {
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
          messageResponse(res, "Bottle updated successfully", true);
        }
      });
    }
  });
};

const deleteBottle = (req, res) => {
  Bottle.find({ _id: req.query.id, userId: req.user._id }, (err, bottle) => {
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
          messageResponse(res, "Bottle deleted successfully", true);
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
