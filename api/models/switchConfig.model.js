const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const switchConfigSchema = new Schema(
  {
    name: {
      type: String,
    },
    body: {
      type: String,
    },
    joyControllerLeft: {
      type: String,
    },
    joyControllerRight: {
      type: String,
    },
    thumbSticks: {
      type: String,
    },
    abxy: {
      type: String,
    },
    dpad: {
      type: String,
    },
    utils: {
      type: String,
    },
  },
  { timestamps: true }
);

const SwitchConfig = mongoose.model("Switch Configuration", switchConfigSchema);
module.exports = SwitchConfig;
