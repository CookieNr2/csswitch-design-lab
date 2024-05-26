const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: {
      type: String,
      enum: ["Visa", "Master Card"],
    },
    cardNumber: {
      type: String,
    },
  },
  location: {
    street: {
      type: String,
    },
    postalCode: {
      type: Number,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return process.env.PASSWORD_REGEX.test(v);
      },
      message: (props) =>
        "Password must include at least one uppercase letter, one number, and one special character.",
    },
  },
});

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt
      .hash(this.password, 10)
      .then((hash) => {
        this.password = hash;
        next();
      })
      .catch(next);
  } else {
    next();
  }
});

userSchema.method("checkPassword", function (password) {
  return bcrypt.compare(password, this.password);
});

const User = mongoose.model("User", userSchema);
module.exports = User;
