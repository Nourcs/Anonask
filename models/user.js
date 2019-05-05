const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    uid: String,
    email: String,
    fullName: { type: String, default: "Anonymous" },
    username: { type: String },
    birthdate: { type: Date, default: new Date() },
    gender: {
      type: String,
      enum: ["Male", "Female", ""],
      default: ""
    },
    profilePicture: {
      type: String,
      default: "https://mnsearch.org/wp-content/uploads/2014/10/blank-2017.jpg"
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
