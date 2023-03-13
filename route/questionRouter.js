const express = require("express");
const Router = express.Router();
const AuthController = require("../controller/AuthController");
const questionController = require("../controller/questionController");
const ImageHanddler = require("../middlewares/generalFileHanddler");



Router.use(AuthController.protect);
Router.route("/algoNet/Questions")
  .post(ImageHanddler.QAImageHanddler, questionController.postQuestion)
  .get(questionController.getAllQuestions);

Router.route("/algoNet/Question/:queId")
  .patch(questionController.editPost)
  .get(questionController.getQuestion);
module.exports = Router;
//
