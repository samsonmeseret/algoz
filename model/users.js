const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema({
  photo: { type: String },

  firstName: {
    type: String,
    required: [true, "Please provide your First Name"],
    minlength: 1,
  },
  lastName: {
    type: String,
    required: [true, "Please provide your Last Name"],
    minlength: 1,
  },
  email: {
    unique: [true, "this email exists in the system try other"],
    type: String,
    validate: [validator.isEmail, "Please provide a valid email Address"],
    lowercase: true,
  },
  phone: {
    type: String,
    unique: [true, "this phone already in use please provide other"],
  },
  course: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: "course",
    default: null,
  },
  gender: {
    type: String,
    enum: {
      values: ["Male", "Female"],
      message: "{VALUE} is not supported",
    },
  },
  password: {
    type: String,
    required: [true, "Please provide your Password"],
    minlength: [8, "Password too short, Password should be more than 8 char"],
    select: false,
  },
  passwordConform: {
    type: String,
    required: [true, "Please provide your Password Confirm"],
    validate: {
      validator: function (passCon) {
        return passCon === this.password;
      },
      message: `The password you entered is not the same`,
    },
  },
  passwordChangedAt: { type: Date },
  role: {
    type: String,
    enum: ["guest", "instructor", "staff", "student", "admin"],
    default: "guest",
  },
  passwordResetToken: { type: String },
  passwordResetExpires: { type: Date },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});
//pre is built in mongoose Middleware!
// hashing the password failed before saving in the db and removing the conform field
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  this.passwordConform = undefined;
  next();
});

//the authomatic setting of passwordChangedAt filed.
UserSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});
//Only geting the active users in the find query
UserSchema.pre(/^find/, function (next) {
  //this points to the current query, which starts with find
  this.find({ active: true });
  next();
});
//the function that compares the hashed in the db and intered one using bycrypt package
UserSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

//the token should be invalid if the user changed his password
UserSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp; //ex: 100 < 200 --- true
  }
  // False means NOT changed
  return false;
};

//Creating a Password reset token using built in crypto
UserSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  console.log(resetToken, this.passwordResetToken);
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", UserSchema);
