// const mongoose = require("mongoose");

// const hireSchema = new mongoose.Schema(
//   {
//     instructor: {
//       type: mongoose.Schema.ObjectId,
//       ref: "User",
//     },
//     course: {
//       type: mongoose.Schema.ObjectId,
//       ref: "Course",
//     },
//     motive: {
//       type: String,
//       required: [true, "Please provide your Motivation letter"],
//     },
//     cv: {
//       type: String,
//       required: [true, "Please Attach us your Resume/CV"],
//     },
//   },
//   { timestamps: true }
// );

// hireSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "instructor",
//     select: "firstname lastname email phone role",
//   }).populate({
//     path: "course",
//     select: "title",
//   });
//   next();
// });

// module.exports = mongoose.model("HiredInstructor", hireSchema);
