const mongoose = require("mongoose");
const Question = require("../model/formQuestions");
const CatchAsync = require("../utils/CatchAsync");
const AppError = require("../utils/AppError");
// const Forun = require("../model/forum");

exports.postQuestion = CatchAsync(async (req, res, next) => {
  let questionForm = {
    person: req.user.id,
    category: req.body.category,
    title: req.body.title,
    question: req.body.question,
  };
  if (req.file) {
    questionForm.image = req.file.filename;
  }

  const newQuestion = new Question(questionForm);

  const postedQuestion = await newQuestion.save();

  res.status(200).json({
    status: "success",
    data: postedQuestion,
    // forumData: savedForum,
  });
});

exports.editPost = CatchAsync(async (req, res, next) => {
  const id = req.params.queId;
  const userId = req.user.id;

  const checkQuestionId = await Question.find({ _id: id });
  let names;
  checkQuestionId.forEach((el) => (names = el.name));
  names = JSON.stringify(names);
  const newName = names.split('"')[1];

  if (!(newName === userId)) {
    res.status(401).json({
      status: "fail",
      message: "you can not edit others post",
    });
  } else {
    const edittedPost = await Question.findByIdAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      status: "success",
      data: edittedPost,
    });
  }
});

exports.getAllQuestions = CatchAsync(async (req, res, next) => {
  const id = req.params.queId;
  const { title, content } = req.body;
  let QueryObj = {};
  if (title) {
    QueryObj.title = { $regex: title, $options: "i" };
  }
  if (content) {
    QueryObj.content = { $regex: content, $options: "i" };
  }
  const result = Question.find(QueryObj);
  const foundQuestions = await result.sort({ createdAt: -1 });

  res.status(200).json({
    status: "success",
    data: foundQuestions,
  });
  const currentUser = req.user;
  // res.status(200).render("algonetQuestion", { currentUser, foundQuestions });
});
exports.getQuestion = CatchAsync(async (req, res, next) => {
  const id = req.params.queId;

  const foundQuestion = await Question.find({ _id: id }, { new: true });
  //   foundQuestion.forEach((el) => console.log(el.name));

  res.status(200).json({
    status: "success",
    data: foundQuestion,
  });
});
