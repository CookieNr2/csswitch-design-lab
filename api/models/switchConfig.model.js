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
      type: String,
      require: true,
    },
    joyControllerLeft: {
      type: String,
      require: true,
    },
    joyControllerRight: {
      type: String,
      require: true,
    },
    thumbSticks: {
      type: String,
      require: true,
    },
    abxy: {
      type: String,
      require: true,
    },
    dpad: {
      type: String,
      require: true,
    },
    utils: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const SwitchConfig = mongoose.model("Switch Configuration", switchConfigSchema);
module.exports = SwitchConfig;
