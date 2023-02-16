const AppError = require("../utils/AppError");
const CatchAsync = require("../utils/CatchAsync");

exports.deleteOne = (Model) =>
  CatchAsync(async (req, res, next) => {
    const id = req.params.id;
    const doc = await Model.findByIdAndDelete({ _id: id }, { new: true });
    if (!doc) {
      res.status(404).json({
        status: "success",
        message: `There is no Document with ID: ${id}`,
      });
    } else {
      res.status(200).json({
        status: "success",
        data: { doc },
      });
    }
  });

exports.updateOne = (Model) =>
  CatchAsync(async (req, res, next) => {
    const id = req.params.id;
    const doc = await Model.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (!doc) {
      res.status(404).json({
        status: "success",
        message: `There is no Document with ID: ${id}`,
      });
    } else {
      res.status(200).json({
        status: "success",
        data: { doc },
      });
    }
  });

exports.findOne = (Model, popOptions) =>
  CatchAsync(async (req, res, next) => {
    const id = req.params.id;
    let Query = Model.findById({ _id: id });
    if (popOptions) Query = Query.populate(popOptions);

    const doc = await Query;
    if (!doc) {
      res.status(404).json({
        message: "success",
        data: `There is no Document found with ID ${id}`,
      });
    } else {
      res.status(200).json({
        message: "success",
        data: { doc },
      });
    }
  });
