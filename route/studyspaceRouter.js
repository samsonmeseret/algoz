const express = require("express");
const Router = express.Router();
const studySpaceController = require("../controller/studyspaceController");
const AuthController = require("../controller/AuthController");

Router.use(AuthController.protect);

Router.route("/studyboard")
  .post(
    AuthController.restrictTo("instructor", "admin"),
    studySpaceController.createSpace
  )
  .get(AuthController.restrictTo("admin"), studySpaceController.getAllSpace);
//INSTRUCTORS CAN GET AND UPDATE THIER OWNS STUDENTS STUDYSPACE
Router.route("/student/studyboard").get(
  AuthController.restrictTo("instructor", "admin"),
  studySpaceController.getMyStudentSpace
);
Router.route("/student/studyboard/:id")
  .patch(
    AuthController.restrictTo("instructor", "admin"),
    studySpaceController.updateSpace
  )
  .delete(
    AuthController.restrictTo("instructor", "admin"),
    studySpaceController.deletSpace
  );
//STUDENDTS CAN GET THIER OWN STUDYSPACE BASED ON THEIR COURSES
Router.route("/My/studyboard").get(
  AuthController.protect,
  AuthController.isLoggedIn,
  AuthController.restrictTo("student", "admin"),
  studySpaceController.getMyspace
);
module.exports = Router;
