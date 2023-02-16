const CatchAsync = require("../utils/CatchAsync");
const Enrol = require("../model/enrol");
const User = require("../model/users");
const factory = require("./factoryController");

exports.createEnrol = CatchAsync(async (req, res, next) => {
  if (!req.body.student) req.body.student = req.user.id;
  if (!req.body.course) req.body.course = req.params.id;
  const newEnrol = new Enrol(req.body);
  //
  const savedEnrol = await newEnrol.save();
  let populated = await savedEnrol.populate("student");
  // let theID = await populated.student._id;
  //IS THE GUEST ENROLED HE BECOME THE VIRTUAL STUDENT
  // let changing = await User.findByIdAndUpdate(
  //   { _id: theID },
  //   { role: "student" },
  //   { new: true }
  // );
  // console.log(changing);
  res.status(200).json({
    status: "success",
    data: { populated },
  });
});

exports.autorizeEnrol = CatchAsync(async (req, res, next) => {
  const id = req.params.id;

  const foundEnrol = await Enrol.findByIdAndUpdate({ _id: id })
    .populate("student")
    .populate("course");
  let theID = await foundEnrol.student._id;
  let theCourse = await foundEnrol.course.title;
  let theStudent = await foundEnrol.student;
  //   //IS THE GUEST ENROLED HE BECOME THE VIRTUAL STUDENT
  if (theStudent.role === "admin") {
    let changingRight = await User.findByIdAndUpdate(
      { _id: theID },
      { course: theCourse },
      { new: true }
    );
  } else {
    console.log(theStudent.course);
    let changingRight = await User.findByIdAndUpdate(
      { _id: theID },
      { role: "student", course: theCourse },
      { new: true }
    );
  }

  await Enrol.findByIdAndDelete({ _id: id });

  res.status(200).json({
    status: "success",
    // changedright: changingRight,
    // tobechanged: foundEnrol,
  });
});

exports.findAllEnrol = CatchAsync(async (req, res, next) => {
  const { student, course, sort } = req.query;

  let QueryObj = {};
  if (student) {
    QueryObj.student = { $regex: student, $options: "i" };
  }
  if (course) {
    QueryObj.course = { $regex: course, $options: "i" };
  }

  // console.log(QueryObj);
  let result = Enrol.find(QueryObj);
  if (sort) {
    const sortlist = sort.split(",").join(" ");
    result = result.sort(sortlist);
  } else {
    result = result.sort("createdAt");
  }
  const foundEnrol = await result;
  if (!foundEnrol) {
    res.status(200).json({
      status: "success",
      data: `there is no Enrol in the system`,
    });
  } else {
    res.status(200).json({
      message: "success",
      data: { foundEnrol },
      total: foundEnrol.length,
    });
    const currentUser = req.user;
    // res.status(200).render("manageEnrol", { currentUser, foundEnrol });
  }
});

exports.deleteEnrol = factory.deleteOne(Enrol);
