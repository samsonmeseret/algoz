const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  images: {
    type: String,
  },
});

const answerSchema = new mongoose.Schema({
  name: { type: mongoose.Schema.ObjectId, ref: "User" },
  answer: { type: String, required: [true, "Please Enter Your Answer"] },
  screenshots: [imageSchema],
});

module.exports = mongoose.model("Answer", answerSchema);
