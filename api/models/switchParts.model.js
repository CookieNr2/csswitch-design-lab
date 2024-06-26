const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const switchPartsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    displayName: {
      type: String,
      required: true,
      unique: true,
    },
    defaultColor: {
      type: mongoose.Types.ObjectId,
      ref: "Colors",
      required: true,
      autopopulate: true,
    },
    colorOptions: {
      type: [mongoose.Types.ObjectId],
      ref: "Colors",
      required: true,
      autopopulate: true,
    },
  },
  { timestamps: true }
);

switchPartsSchema.plugin(require('mongoose-autopopulate'));
const SwitchParts = mongoose.model("SwitchParts", switchPartsSchema);
module.exports = SwitchParts;
