const studySpace = require("../model/studySpace");
const CatchAsync = require("../utils/CatchAsync");
const factory = require("./factoryController");

exports.createSpace = CatchAsync(async (req, res, next) => {
  // let { course, firstp, list, secondp, link } = req.body;
  let createdby = req.user.id;

  console.log(createdby);
  const newSpace = await studySpace.create({
    course: req.body.course,
    firstp: req.body.firstp,
    list1: req.body.list1,
    list2: req.body.list2,
    list3: req.body.list3,
    secondp: req.body.secondp,
    link: req.body.link,
    createdBy: createdby,
  });

  res.status(200).json({
    status: "success",
    spacedata: newSpace,
  });
});

//UPDATING THE SPACE IN CASE THERE IS EDIT OF MISTAKE
exports.updateSpace = CatchAsync(async (req, res, next) => {
  const id = req.params.id;
  // const course = req.user.course;
  const updatedSpace = await studySpace.findByIdAndUpdate(
    { _id: id },
    req.body,
    { new: true }
  );
  res.status(200).json({
    status: "success",
    updateddata: updatedSpace,
  });
});

//STUDENTS GETTING THIER SPACES BASED ON THIER COURSE
exports.getMyspace = CatchAsync(async (req, res, next) => {
  // const id = req.user.id;
  const currentUser = req.user;
  const course = req.user.course;

  // console.log(course);

  const foundSpace = await studySpace.find({ course: course });

  res.status(200).json({
    status: "success",
    spacedata: foundSpace,
  });
  // res
  //   .status(200)
  //   .render("studyboard", { foundSpace: foundSpace, currentUser: currentUser });
});

//GETTING THE SPACE BY THE ONE WHO CREATED IT
exports.getMyStudentSpace = CatchAsync(async (req, res, next) => {
  const Userid = req.user.id;
  const currentUser = req.user;

  const foundSpace = await studySpace.find({ createdBy: Userid });
  res.status(200).json({
    status: "success",
    foundSpace,
  });
  // res
  //   .status(200)
  //   .render("studyboard", { foundSpace: foundSpace, currentUser: currentUser });
});

//DELETING THE SPACE BY ANY AUTHORIZED PERSON( 'ADMIN', 'INSTRUCTOR')
exports.deletSpace = CatchAsync(async (req, res, next) => {
  const id = req.params.id;

  const deletedspace = await studySpace.findByIdAndUpdate(
    { _id: id },
    { done: true },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    deleteddata: deletedspace,
  });
});

//GETTING ALL THE SPACE EXISTED: BY THE ADMIN
exports.getAllSpace = CatchAsync(async (req, res, next) => {
  const allSpace = await studySpace.find();

  res.status(200).json({
    status: "success",
    spacedata: allSpace,
  });
});
