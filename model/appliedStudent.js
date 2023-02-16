const mongoose = require("mongoose");
const validator = require("validator");

const studentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide your First Name"],
      minlength: 2,
    },
    lastName: {
      type: String,
      required: [true, "Please provide your Last Name"],
      minlength: 2,
    },
    email: {
      unique: [true, "this email exists in the system, try other"],
      type: String,
      validate: [validator.isEmail, "Please provide a valid email Address"],
      lowercase: true,
    },
    course: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Course",
      },
    ],
    educationLevel: {
      type: String,
      enum: {
        values: [
          "Primary School",
          "Secondary School",
          "Diploma",
          "BSc Degree",
          "Masters Degree",
          "PHD",
        ],
        message: "{VALUE} is not supported.",
      },
    },
    city: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("appliedStudent", studentSchema);
