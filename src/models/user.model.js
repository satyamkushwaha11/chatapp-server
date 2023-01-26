const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      required: true,
      default:
        "https://t4.ftcdn.net/jpg/01/17/95/91/360_F_117959178_mOp22kjhdhWdoSoePHPafN7GLUYyvFNY.jpg",
    },
    role: {
      type: String,
      required: true,
      default: "USER",
      option: ["USER", "ADMIN", "GUEST","DEVELOPER"],
    },
  },

  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
