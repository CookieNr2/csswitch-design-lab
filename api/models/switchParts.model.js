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
    },
    colorOptions: {
      type: [mongoose.Types.ObjectId],
      ref: "Colors",
      required: true,
    },
  },
  { timestamps: true }
);

const SwitchParts = mongoose.model("SwitchParts", switchPartsSchema);
module.exports = SwitchParts;
