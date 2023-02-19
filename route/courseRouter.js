const express = require("express");
const Router = express.Router({ mergeParams: true });
const courseController = require("../controller/courseController");
const AuthController = require("../controller/AuthController");
const coursePhotoUploader = require("../middlewares/coursePhotoHanddler");
//COURSE ROUTE
Router.route("/courses")
  .get(AuthController.protect, courseController.findAllCourse)
  .post(
    AuthController.protect,
    AuthController.restrictTo("admin"),
    coursePhotoUploader.coursePhotoUploader,
    courseController.createCourse
  );
Router.route("/courses/:id")
  .get(courseController.findCourse)
  .patch(
    AuthController.protect,
    AuthController.restrictTo("admin"),
    coursePhotoUploader.coursePhotoUploader,
    courseController.updateCourse
  )
  .delete(
    AuthController.protect,
    AuthController.restrictTo("admin"),
    courseController.deleteCourse
  );

module.exports = Router;
