const mongoose = require("mongoose");

const enrolSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },

    course: {
      type: mongoose.Schema.ObjectId,
      ref: "Course",
    },
  },
  { timestamps: true }
);

enrolSchema.pre(/^find/, function (next) {
  this.populate({
    path: "student",
    select: "firstName lastName email role",
  }).populate({
    path: "course",
    select: "title price",
  });
  next();
});

module.exports = mongoose.model("Enrol", enrolSchema);
