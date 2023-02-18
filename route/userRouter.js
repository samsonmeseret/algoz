const express = require("express");
const Router = express.Router();
const userController = require("../controller/userController");
const AuthController = require("../controller/AuthController");
const photoUploadingFunctions = require("../middlewares/userImageHanddler");

//REGULAR User Activity
//protecting the activity

Router.use(AuthController.protect);

//1) updating his profiles!
Router.route("/user/updateMe").patch(
  photoUploadingFunctions.profilePhotoUploader,
  photoUploadingFunctions.resizeUserPhotoUpdate,
  userController.updateMe
);

//2) Deleting himself
Router.route("/user/deleteMe").delete(userController.deleteMe);

//3) THE ME ROUTE
Router.route("/me").get(userController.getMe);
// Router.route("/my/settings").get(userController.getMySetting);

//ONLY FOR ADMIN
Router.use(AuthController.restrictTo("admin"));
Router.route("/manage/Users").get(userController.findAllUser);
Router.route("/manage/Users/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

//exporting it
module.exports = Router;
