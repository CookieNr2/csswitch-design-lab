const mongoose = require("mongoose");
const SwitchConfig = require("../models/switchConfig.model");

module.exports.create = (req, res, next) => {
  SwitchConfig.create(req.body)
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
  SwitchConfig.find()
    .sort({ updatedAt: -1 })
    .skip(page * limit)
    .limit(limit)
    .then((elements) => res.json(elements))
    .catch(next);
};

module.exports.detail = (req, res, next) => {
  SwitchConfig.findById(req.params.id)
    .then((element) => {
      if (element) {
        res.json(element);
      } else {
        res.status(404).json({ message: "Configuration not found" });
      }
    })
    .catch(next);
};

module.exports.update = (req, res, next) => {
  SwitchConfig.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  })
    .then((element) => {
      if (element) res.json(element);
      else res.status(404).json({ message: "Configuration not found" });
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
  SwitchConfig.findByIdAndDelete(req.params.id)
    .then((element) => {
      if (element) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: "Configuration not found" });
      }
    })
    .catch(next);
};
