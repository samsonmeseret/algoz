const express = require("express");
const Router = express();
const AuthController = require("../controller/AuthController");

Router.use(AuthController.protect);

Router.route("/Resource").get().post();

Router.route("/Resourse/:id").get().patch().delete();

module.exports = Router;
