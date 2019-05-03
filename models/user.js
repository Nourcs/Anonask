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
      default:
        "https://articles-images.sftcdn.net/wp-content/uploads/sites/3/2016/01/wallpaper-for-facebook-profile-photo.jpg"
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
