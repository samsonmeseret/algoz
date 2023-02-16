const CatchAsync = require("../utils/CatchAsync");
const HiredInstructor = require("../model/hiredInstructer");
const User = require("../model/users");
const factory = require("./factoryController");
const { path } = require("express/lib/application");
const AppError = require("../utils/AppError");

exports.beHired = CatchAsync(async (req, res, next) => {
  const hireForm = {
    instructor: req.user.id,
    course: req.params.id,
    motive: req.body.motive,
  };
  if (req.file) {
    hireForm.cv = req.file.filename;
  }
  const newHired = new HiredInstructor(hireForm);

  const savedInstuctor = await newHired.save();

  res.status(200).json({
    status: "success",
    data: { savedInstuctor },
  });
});
exports.autorizeHired = CatchAsync(async (req, res, next) => {
  const id = req.params.id;

  const foundHired = await HiredInstructor.findByIdAndUpdate({ _id: id })
    .populate("instructor")
    .populate("course");
  let theID = await foundHired.instructor._id;
  let theCourse = await foundHired.course.title;
  //   //IS THE GUEST ENROLED HE BECOME THE VIRTUAL INSTRUCTOR
  let changingRight = await User.findByIdAndUpdate(
    { _id: theID },
    { role: "instructor", course: theCourse },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    changedright: changingRight,
    tobechanged: foundHired,
  });
});

exports.findAllHired = CatchAsync(async (req, res, next) => {
  const { instructor, course, sort } = req.query;

  let QueryObj = {};
  if (instructor) {
    QueryObj.instructor = { $regex: instructor, $options: "i" };
  }
  if (course) {
    QueryObj.course = { $regex: course, $options: "i" };
  }

  let result = HiredInstructor.find(QueryObj);

  if (sort) {
    const sortlist = sort.split(",").join(" ");
    result = result.sort(sortlist);
  } else {
    result = result.sort("createdAt");
  }
  const foundHired = await result;
  if (!foundHired) {
    res.status(200).json({
      status: "success",
      data: `there is no request to be instructor in the system`,
    });
  } else {
    res.status(200).json({
      status: "success",
      data: { foundHired },
      total: foundHired.length,
    });
    const currentUser = req.user;
    // console.log(foundHired);
    // res.status(200).render("manageHire", { currentUser, foundHired });
  }
});

// exports.getHiredPage = CatchAsync(async(req, res, next)=>{
//   const foundHired = await HiredInstructor.find()
// })

exports.deleteHired = factory.deleteOne(HiredInstructor);
