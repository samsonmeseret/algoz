const express = require("express");
const Router = express.Router();
const AuthController = require("../controller/AuthController");
const answerController = require("../controller/answerController");

Router.use(AuthController.protect);

Router.route("/algoNet/Question/:queId/Answer").post(
  answerController.postAnswer
);

module.exports = Router;
