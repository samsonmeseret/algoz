const { Schema, model, SchemaTypes } = require("mongoose");

const batchSchema = new Schema(
  {
    course: { type: SchemaTypes.ObjectId, ref: "Course" },
    phase: [{ type: SchemaTypes.ObjectId, ref: "Phases" }],
    batchName: {
      type: String,
      required: true,
    },
    batchDate: {
      type: Date,
      required: true,
    },
    createdBy: {
      type: SchemaTypes.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const phaseSchema = new Schema(
  {
    modules: [
      {
        type: SchemaTypes.ObjectId,
        ref: "Module",
      },
    ],
    phaseName: {
      type: String,
      required: true,
    },
    phaseNumber: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const moduleSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
    },
    videoResources: {
      type: SchemaTypes.ObjectId,
      ref: "Video",
    },

    notes: {
      type: SchemaTypes.ObjectId,
      ref: "Note",
    },
    tasks: {
      type: SchemaTypes.ObjectId,
      ref: "Task",
    },
    durations: {
      type: String,
    },
  },
  { timestamps: true }
);

const batch = model("Batch", batchSchema);
const phase = model("Phase", phaseSchema);
const module = model("Module", moduleSchema);
