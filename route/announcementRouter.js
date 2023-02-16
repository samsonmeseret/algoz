// const express = require("express");
// const Router = express.Router();
// const AuthController = require("../controller/AuthController");
// const AnnouncementController = require("../controller/announcementController");

// Router.use(AuthController.protect);

// Router.route("/Announcement")
//   .post(AuthController.restrictTo("admin"), AnnouncementController.AnnounceIt)
//   .get(AnnouncementController.getAnnouncement);

// Router.route("/Announcement/:id")
//   .get(
//     AuthController.restrictTo("admin"),
//     AnnouncementController.GetSingleAnnouncement
//   )
//   .patch(
//     AuthController.restrictTo("admin"),
//     AnnouncementController.UpdateAnnouncement
//   )
//   .delete(
//     AuthController.restrictTo("admin"),
//     AnnouncementController.HideAnnouncement
//   );
// module.exports = Router;
