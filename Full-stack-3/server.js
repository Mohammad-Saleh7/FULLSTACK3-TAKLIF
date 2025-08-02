const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
mongoose
  .connect("mongodb://127.0.0.1:27017/taskmanager")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const directorySchema = new mongoose.Schema({
  name: { type: String, required: true },
});
const Directory = mongoose.model("Directory", directorySchema);

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  completed: { type: Boolean, default: false },
  important: { type: Boolean, default: false },
  deadline: Date,
  dirId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Directory",
    required: true,
  },
});
const Task = mongoose.model("Task", taskSchema);

app.post("/api/directories", async (req, res) => {
  const directory = new Directory(req.body);
  await directory.save();
  res.status(201).send(directory);
});

app.get("/api/directories", async (req, res) => {
  const directories = await Directory.find();
  res.send(directories);
});

app.put("/api/directories/:id", async (req, res) => {
  const directory = await Directory.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.send(directory);
});

app.delete("/api/directories/:id", async (req, res) => {
  await Directory.findByIdAndDelete(req.params.id);
  res.send({ message: "Directory deleted" });
});

app.post("/api/tasks", async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.status(201).send(task);
});

app.get("/api/tasks", async (req, res) => {
  const tasks = await Task.find().populate("dirId");
  res.send(tasks);
});

app.get("/api/directories/:dirId/tasks", async (req, res) => {
  const tasks = await Task.find({ dirId: req.params.dirId });
  res.send(tasks);
});
app.put("/api/tasks/:id", async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.send(task);
});

app.delete("/api/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.send({ message: "Task deleted" });
});
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
