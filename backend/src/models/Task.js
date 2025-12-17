const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  assignee: String,
  dueDate: Date,
  status: {
    type: String,
    enum: ["todo", "inprogress", "done"],
    default: "todo",
  },
});

module.exports = mongoose.model("Task", TaskSchema);
