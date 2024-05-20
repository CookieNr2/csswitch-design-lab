const mongoose = require("mongoose");
const SwitchConfig = require("../models/switchConfig.model");
const Colors = require("../models/colors.model");

module.exports.create = (req, res, next) => {
  SwitchConfig.create({ ...req.body, owner: req.user?._id })
    .then((newElem) => res.status(201).json(newElem))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).json(err.errors);
      } else {
        next(err);
      }
    });
};

exports.popular = async (req, res, next) => {
  const { limit = process.env.DEFAULT_PAGINATION, page = 0 } = req.query;
  try {
    const popularConfigs = await SwitchConfig.aggregate([
      {
        $group: {
          _id: {
            body: "$body",
            joyControllerLeft: "$joyControllerLeft",
            joyControllerRight: "$joyControllerRight",
            thumbSticks: "$thumbSticks",
            abxy: "$abxy",
            dpad: "$dpad",
            utils: "$utils",
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 6 },
    ]);

    const colors = await Colors.find();
    const colorsObject = colors.reduce((acc, color) => {
      acc[color._id] = color;
      return acc;
    }, {});

    const formattedConfigs = popularConfigs.map((config) => {
      return {
        body: colorsObject[config._id.body],
        joyControllerLeft: colorsObject[config._id.joyControllerLeft],
        joyControllerRight: colorsObject[config._id.joyControllerRight],
        thumbSticks: colorsObject[config._id.thumbSticks],
        abxy: colorsObject[config._id.abxy],
        dpad: colorsObject[config._id.dpad],
        utils: colorsObject[config._id.utils],
      };
    });
    res.json(formattedConfigs);
  } catch (error) {
    next(error);
  }
};

module.exports.list = (req, res, next) => {
  const { limit = process.env.DEFAULT_PAGINATION, page = 0 } = req.query;
  const userId = req.user._id;
  SwitchConfig.find({ owner: userId })
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
