const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    from: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    to: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    questionId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
    question: String,
    answer: String
  },
  {
    timestamps: true
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
