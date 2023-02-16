const express = require("express");
const Router = express.Router();
const AuthController = require("../controller/AuthController");
const enrolController = require("../controller/enrolController");

//RECIVING THE ENROLED STUDENT ALONG THEIR COURSES
//
Router.route("/manage/enrol").get(
  AuthController.protect,
  AuthController.restrictTo("admin"),
  enrolController.findAllEnrol
);
Router.route("/course/:id/enrol").post(
  AuthController.protect,
  enrolController.createEnrol
);
//
Router.route("/enrol/:id").delete(
  AuthController.protect,
  AuthController.restrictTo("admin"),
  enrolController.deleteEnrol
);
Router.route("/enrol/:id/authorize").patch(
  AuthController.protect,
  AuthController.restrictTo("admin"),
  enrolController.autorizeEnrol
);
module.exports = Router;
