const mongoose = require("mongoose");
const User = require("../model/users");
const bcrypt = require("bcryptjs");
const AppError = require("../utils/AppError");
const CatchAsync = require("../utils/CatchAsync");
const factory = require("./factoryController");

//filtering objects for update fields for the user updating himself
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

// updating user informations
exports.updateMe = CatchAsync(async (req, res, next) => {
  //1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is for password update. Please use user/updatePassword.",
        400
      )
    );
  }
  //2) Filtered Out unwanted fields
  const filteredBody = filterObj(
    req.body,
    "firstName",
    "lastName",
    "email",
    "gender",
    "phone"
  );
  if (req.file) filteredBody.photo = req.file.filename;
  let thingsToBeUpdated = {};

  if (filteredBody.firstName) {
    thingsToBeUpdated.firstName = filteredBody.firstName;
  }
  if (filteredBody.lastName) {
    thingsToBeUpdated.lastName = filteredBody.lastName;
  }
  if (filteredBody.email) {
    thingsToBeUpdated.email = filteredBody.email;
  }
  if (filteredBody.phone) {
    thingsToBeUpdated.phone = filteredBody.phone;
  }
  if (filteredBody.gender) {
    thingsToBeUpdated.gender = filteredBody.gender;
  }
  if (filteredBody.photo) {
    thingsToBeUpdated.photo = filteredBody.photo;
  }
  //3) Update user document
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    thingsToBeUpdated,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    status: "success",
    data: { updatedUser },
  });
});

// deleting by the user = deActivating
exports.deleteMe = CatchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

//getting his oun profile

exports.getMe = CatchAsync(async (req, res, next) => {
  const currentUser = await User.findById(req.user.id);
  res.status(200).json({
    status: "success",
    me: currentUser,
  });
  // res.status(200).render("profile", { currentUser });
});

exports.getMySetting = CatchAsync(async (req, res, next) => {
  const currentUser = await User.findById(req.user.id);
  res.status(200).json({
    status: "success",
    data: currentUser,
  });
  // res.status(200).render("usersetting", { currentUser });
});

//ONLY FOR ADMINS //
exports.findAllUser = CatchAsync(async (req, res, next) => {
  const { firstName, lastName, email, sort, field } = req.query;

  let QueryObj = {};
  if (firstName) {
    QueryObj.firstName = { $regex: firstName, $options: "i" };
  }
  if (lastName) {
    QueryObj.lastName = { $regex: lastName, $options: "i" };
  }
  if (email) {
    QueryObj.email = { $regex: email, $options: "i" };
  }
  // console.log(QueryObj);
  let result = User.find(QueryObj);
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  //select the elements to appear from the filter
  if (field) {
    const fieldList = field.split(",").join(" ");
    result = result.select(fieldList);
  }

  const allUser = await result;

  if (!allUser) {
    res.status(200).json({
      success: "success",
      data: `there is no User in the system`,
    });
  } else {
    const currentUser = req.user;
    res.status(200).json({
      success: "success",
      allUser,
    });
    // res.status(200).render("users", { currentUser, allUser });
  }
});

exports.getUser = CatchAsync(async (req, res, next) => {
  const currentUser = req.user;
  const id = req.params.id;
  const foundUser = await User.findById({ _id: id });
  // console.log(suser);
  // res.status(200).render("userDisplay", { currentUser, suser });

  res.status(200).json({
    status: "success",
    foundUser,
  });
});
exports.deleteUser = CatchAsync(async (req, res, next) => {
  const id = req.params.id;
  const doc = await User.deleteOne({ _id: id }, { new: true });

  res.status(200).json({
    status: "success",
    file: doc,
  });
});

exports.updateUser = CatchAsync(async (req, res, next) => {
  const filteredBody = filterObj(
    req.body,
    "firstName",
    "lastName",
    "email",
    "gender",
    "phone",
    "role"
  );
  if (req.file) filteredBody.photo = req.file.filename;
  let thingsToBeUpdated = {};

  if (filteredBody.firstName) {
    thingsToBeUpdated.firstName = filteredBody.firstName;
  }
  if (filteredBody.lastName) {
    thingsToBeUpdated.lastName = filteredBody.lastName;
  }
  if (filteredBody.email) {
    thingsToBeUpdated.email = filteredBody.email;
  }
  if (filteredBody.phone) {
    thingsToBeUpdated.phone = filteredBody.phone;
  }
  if (filteredBody.gender) {
    thingsToBeUpdated.gender = filteredBody.gender;
  }
  if (filteredBody.role) {
    thingsToBeUpdated.role = filteredBody.role;
  }
  if (filteredBody.photo) {
    thingsToBeUpdated.photo = filteredBody.photo;
  }

  const id = req.params.id;
  //3) Update user document
  const updatedUserRole = await User.findByIdAndUpdate(
    { _id: id },
    thingsToBeUpdated,
    {
      new: true,
      runValidators: false,
    }
  );

  res.status(200).json({
    status: "success",
    data: { updatedUserRole },
  });
});
