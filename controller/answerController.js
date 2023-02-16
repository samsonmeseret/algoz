const mongoose = require("mongoose");
const Answer = require("../model/formAnswer");
const CatchAsync = require("../utils/CatchAsync");
const AppError = require("../utils/AppError");
const Question = require("../model/formQuestions");

exports.postAnswer = CatchAsync(async (req, res, next) => {
  if (!req.body.name) req.body.name = req.user.id;
  // find out which post you are commenting
  const id = req.params.queId;
  // get the comment text and record post id
  const answer = new Answer({
    content: req.body.content,
    question: id,
  });
  // save comment
  const answerSaved = await answer.save();
  // get this particular post
  const questionRelated = await Question.findById(id);
  // push the comment into the post.comments array
  questionRelated.answers.push(answerSaved);
  // save and redirect...
  const questionSaved = await questionRelated.save();
  res.status(200).json({
    status: "success",
    data: answerSaved,
    questionData: questionSaved,
  });
});
