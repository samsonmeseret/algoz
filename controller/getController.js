// const CatchAsync = require("../utils/CatchAsync");
// const User = require("../model/users");
// const Course = require("../model/course");

// exports.getLogIn = CatchAsync(async (req, res, next) => {
//   res.status(200).render("login");
// });
// exports.getSignup = CatchAsync(async (req, res, next) => {
//   res.status(200).render("signup");
// });
// exports.getBase = CatchAsync(async (req, res, next) => {
//   const id = req.user.id;
//   const currentUser = await User.findById({ _id: id });
//   res.status(200).render("base", { currentUser: currentUser });
// });
// exports.getSingle = CatchAsync(async (req, res, next) => {
//   res.status(200).render("single");
// });

// exports.getManage = CatchAsync(async (req, res) => {
//   const currentUser = req.user;
//   res.status(200).render("manage", { currentUser });
// });
// //ALGO NET
// exports.getAlgoNetHome = CatchAsync(async (req, res) => {
//   const currentUser = req.user;
//   res.status(200).render("algoNetHome", { currentUser });
// });

// exports.Ask = CatchAsync(async (req, res) => {
//   const currentUser = req.user;
//   const course = await Course.find();
//   res.status(200).render("algoNetPost", { currentUser, course });
// });
