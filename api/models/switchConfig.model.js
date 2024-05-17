const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const switchConfigSchema = new Schema(
  {
    name: {
      type: String,
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: null,
    },
    body: {
      type: mongoose.Types.ObjectId,
      ref: "Colors",
      require: true,
      autopopulate: true,
    },
    joyControllerLeft: {
      type: mongoose.Types.ObjectId,
      ref: "Colors",
      require: true,
      autopopulate: true,
    },
    joyControllerRight: {
      type: mongoose.Types.ObjectId,
      ref: "Colors",
      require: true,
      autopopulate: true,
    },
    thumbSticks: {
      type: mongoose.Types.ObjectId,
      ref: "Colors",
      require: true,
      autopopulate: true,
    },
    abxy: {
      type: mongoose.Types.ObjectId,
      ref: "Colors",
      require: true,
      autopopulate: true,
    },
    dpad: {
      type: mongoose.Types.ObjectId,
      ref: "Colors",
      require: true,
      autopopulate: true,
    },
    utils: {
      type: mongoose.Types.ObjectId,
      ref: "Colors",
      require: true,
      autopopulate: true,
    },
  },
  { timestamps: true }
);

switchConfigSchema.plugin(require("mongoose-autopopulate"));
const SwitchConfig = mongoose.model("Switch Configuration", switchConfigSchema);
module.exports = SwitchConfig;
