const Announcement = require("../model/announcement");
const CatchAsync = require("../utils/CatchAsync");
const factory = require("./factoryController");
// const email = require("../utils");

//Create a Announcement
exports.AnnounceIt = CatchAsync(async (req, res, next) => {
  const Announce = await Announcement.create(req.body);

  res.status(200).json({
    status: "success",
    AnnuoData: Announce,
  });
});

//Sending to everyone the annoucement
exports.getAnnouncement = CatchAsync(async (req, res, next) => {
  const foundAnnounce = await Announcement.find(
    {},
    {},
    { sort: { createdAt: -1 } }
  );

  res.status(200).json({
    status: "success",
    anouncData: foundAnnounce,
  });
});

//if the announcemet be very old it can be hidden by admin
exports.HideAnnouncement = CatchAsync(async (req, res, next) => {
  const id = req.params.id;

  const HidedAnnounce = await Announcement.findByIdAndUpdate(
    { _id: id },
    { $set: { seen: true } }
  );
  res.status(200).json({
    status: "success",
    HIdeddata: HidedAnnounce,
  });
});
//get single announcement by id
exports.GetSingleAnnouncement = factory.findOne(Announcement);
//for updating the announcement
exports.UpdateAnnouncement = factory.updateOne(Announcement);
