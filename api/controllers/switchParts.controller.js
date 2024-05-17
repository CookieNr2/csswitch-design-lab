const mongoose = require("mongoose");
const SwitchParts = require("../models/switchParts.model");

module.exports.create = (req, res, next) => {
  console.log(req.user);
  SwitchParts.create(req.body)
    .then((newElem) => res.status(201).json(newElem))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).json(err.errors);
      } else {
        next(err);
      }
    });
};

module.exports.list = (req, res, next) => {
  const { limit = process.env.DEFAULT_PAGINATION, page = 0 } = req.query;
  SwitchParts.find()
    .sort({ updatedAt: -1 })
    .skip(page * limit)
    .limit(limit)
    .then((elements) => res.json(elements))
    .catch(next);
};

module.exports.detail = (req, res, next) => {
  SwitchParts.findById(req.params.id)
    .then((element) => {
      if (element) {
        res.json(element);
      } else {
        res.status(404).json({ message: "Color not found" });
      }
    })
    .catch(next);
};

module.exports.update = (req, res, next) => {
  SwitchParts.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  })
    .then((element) => {
      if (element) res.json(element);
      else res.status(404).json({ message: "Color not found" });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).json(err.errors);
      } else {
        next(err);
      }
    });
};

module.exports.delete = (req, res, next) => {
  SwitchParts.findByIdAndDelete(req.params.id)
    .then((element) => {
      if (element) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: "Color not found" });
      }
    })
    .catch(next);
};
