const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, minlength: 3 },
    description: { type: String, maxlength: 200 },
    status: {
      type: String,
      enum: ["todo", "inprogress", "done"],
      default: "todo",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
