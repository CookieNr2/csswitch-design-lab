const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const colorsSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Colors = mongoose.model("Colors", colorsSchema);
module.exports = Colors;
