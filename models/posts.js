const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    from: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    to: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    question: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
    answer: String
  },
  {
    timestamps: true
  }
);

const Post = mongoose.model("Question", postSchema);

module.exports = Post;
