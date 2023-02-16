const mongoose = require("mongoose");
const Course = require("../model/course");
const AppError = require("../utils/AppError");
const CatchAsync = require("../utils/CatchAsync");
const factory = require("./factoryController");
const User = require("../model/users");

exports.createCourse = CatchAsync(async (req, res, next) => {
  const theBodyData = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    instructor: req.body.instructor,
  };
  if (req.file) {
    theBodyData.photo = req.file.filename;
  }

  const savedCourse = await Course.create(theBodyData);
  res.status(200).json({
    status: "success",
    data: { savedCourse },
  });
});
exports.updateCourse = CatchAsync(async (req, res, next) => {
  let theBodyData = {};

  if (req.body.title) theBodyData.title = req.body.title;
  if (req.body.description) theBodyData.description = req.body.description;
  if (req.body.price) theBodyData.price = req.body.price;
  if (req.body.instructor) theBodyData.instructor = req.body.instructor;
  if (req.file) {
    theBodyData.photo = req.file.filename;
  }
  const id = req.params.id;
  const editedCourse = await Course.findByIdAndUpdate({ _id: id }, theBodyData);

  res.status(200).json({
    status: "success",
    data: editedCourse,
  });
});

exports.findAllCourse = CatchAsync(async (req, res, next) => {
  //basic QUery
  const currentUser = req.user;
  const { title, numericFilter, sort, field } = req.query;
  // let QueryObj = { ...req.query };
  let QueryObj = {};

  // const excludedFileds = ["page", "limit", "sort", "fields"];
  // excludedFileds.forEach((el) => delete QueryObj[el]);

  //Advanced Query
  if (title) {
    QueryObj.title = { $regex: title, $options: "i" };
  }
  if (numericFilter) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilter.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        QueryObj[field] = { [operator]: Number(value) };
      }
    });
  }

  let result = Course.find(QueryObj);
  if (sort) {
    const sortlist = sort.split(",").join(" ");
    result = result.sort(sortlist);
  } else {
    result = result.sort("createdAt");
  }
  //select the elements to appear from the filter
  if (field) {
    const fieldList = field.split(",").join(" ");
    result = result.select(fieldList);
  }

  // const query = Course.find(QueryObj);
  // console.log(QueryObj);

  const allCourse = await result;
  // const allCourse = await Course.find(QueryObj);
  if (!allCourse) {
    res.status(200).json({
      message: "success",
      data: `there is no Course in the system`,
    });
  } else {
    res.status(200).json({
      message: "success",
      data: { allCourse },
      total: allCourse.length,
    });
    // res.status(200).render("course", { allCourse, currentUser });
  }
});

exports.findCourse = CatchAsync(async (req, res, next) => {
  const currentUser = req.user;
  const id = req.params.id;
  const singleCourse = await Course.findById({ _id: id }).populate({
    path: "instructor",
    select: "firstName lastName",
  });
  res.status(200).json({
    status: "success",
    singleCourse,
  });
});

exports.courseToBeApplied = CatchAsync(async (req, res, next) => {
  const currentUser = req.user;
  const id = req.params.id;
  const singleCourse = await Course.findById({ _id: id });
  res.status(200).render("hire", { currentUser, singleCourse });
});
exports.updateCoursePage = CatchAsync(async (req, res) => {
  const currentUser = req.user;
  const id = req.params.id;
  const course = await Course.findById({ _id: id });

  res.status(200).json({
    status: "success",
  });
});

exports.addCoursePage = CatchAsync(async (req, res) => {
  const currentUser = req.user;
  const inst = await User.find({ role: "instructor" });

  res.status(200).json({
    inst,
  });
});

exports.deleteCourse = factory.deleteOne(Course);
