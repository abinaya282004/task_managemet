const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json()); 

//  Get all tasks
app.get("/tasks", (req, res) => {
  db.query("SELECT * FROM tasks", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

//  Add a new task
app.post("/tasks", (req, res) => {
  const { title, description, due_date } = req.body;
  const sql = "INSERT INTO tasks (title, description, due_date) VALUES (?, ?, ?)";
  db.query(sql, [title, description, due_date], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Task added successfully!", taskId: result.insertId });
  });
});

//  Update task status
app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  db.query("UPDATE tasks SET status = ? WHERE id = ?", [status, id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Task status updated!" });
  });
});

//  Delete a task
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM tasks WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Task deleted successfully!" });
  });
});

//  Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
