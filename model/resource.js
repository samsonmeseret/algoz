const { Schema, SchemaTypes, model } = require("mongoose");

const videoSchema = new Schema(
  {
    module: { type: SchemaTypes.ObjectId, ref: "Modules" },
    name: { type: String, required: true },
    title: [{ type: String, required: true }],
    location: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);
const noteSchema = new Schema(
  {
    module: { type: SchemaTypes.ObjectId, ref: "Modules" },
    title: { type: String, required: true },
    location: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const taskSchema = new Schema(
  {
    module: { type: SchemaTypes.ObjectId, ref: "Modules" },
    name: { type: String, required: true },
    title: [{ type: String, required: true }],
    Description: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const videos = model("Video", videoSchema);
const notes = model("Notes", noteSchema);
const tasks = model("Tasks", taskSchema);

module.exports = { videos, notes, tasks };
