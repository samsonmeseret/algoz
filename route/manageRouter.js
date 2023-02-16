const express = require("express");
const Router = express.Router();
const getController = require("../controller/getController");
const AuthController = require("../controller/AuthController");

Router.use(AuthController.protect);

Router.route("/manage").get(
  AuthController.restrictTo("admin"),
  getController.getManage
);

module.exports = Router;
