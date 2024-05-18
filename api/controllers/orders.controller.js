const mongoose = require("mongoose");
const Order = require("../models/order.model");

module.exports.create = (req, res, next) => {
  console.log(req.body);
  Order.create({ ...req.body, owner: req.user?._id })
    .then((order) => res.status(201).json(order))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).json(err.errors);
      } else {
        next(err);
      }
    });
};
