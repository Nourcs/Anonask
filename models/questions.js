const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema(
  {
    from: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    to: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    question: String,
    answered: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
);

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
