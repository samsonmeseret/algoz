const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.ObjectId, ref: "User" },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Course",
    },
    title: { type: String, required: [true, "Please provide question title"] },
    question: {
      type: String,
      required: [true, "Please provide your question"],
    },
    image: { type: String },
    answers: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Answer",
      },
    ],
  },
  { timestamps: true }
);

questionSchema.pre(/^find/, function (next) {
  this.populate({
    path: "person",
    select: "firstname lastname",
  })
    .populate({
      path: "category",
      select: "title",
    })
    .populate({
      path: "answers",
    });
  next();
});

module.exports = mongoose.model("Question", questionSchema);
