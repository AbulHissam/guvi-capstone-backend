const { Schema, model, SchemaTypes } = require("mongoose");

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    status: {
      type: String,
      default: "open",
    },
    requiredCapacity: {
      type: Number,
      default: 0,
    },
    allocatedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Task = model("Task", TaskSchema);

module.exports = Task;
