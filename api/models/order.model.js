const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    location: {
      street: {
        type: String,
        required: true,
      },
      postalCode: {
        type: Number,
        required: true,
      },
    },
    switchConfig: {
      type: mongoose.Types.ObjectId,
      ref: "Switch Configuration",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
