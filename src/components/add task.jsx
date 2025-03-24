import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles.css";

const AddTaskPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [message, setMessage] = useState("");

  //Handle Task Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Task title is required!");
      return;
    }

    try {
      // Send new task to MySQL
      await axios.post("http://localhost:5000/tasks", {
        title,
        description,
        due_date: dueDate,
      });

      setMessage("✅ Task added successfully!");
      setTitle("");
      setDescription("");
      setDueDate("");
    } catch (error) {
      console.error("❌ Error adding task:", error);
      setMessage("❌ Failed to add task.");
    }
  };

  return (
    <div className="container task-container">
      <div className="card p-4 task-card">
        <h2 className="text-center mb-4">Add New Task</h2>

        {message && <div className="alert alert-success text-center">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Task Title</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Due Date</label>
            <input
              type="date"
              className="form-control"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Add Task</button>
        </form>

        <div className="text-center mt-3">
          <Link to="/" className="btn btn-dark w-100">Home</Link>
        </div>
      </div>
    </div>
  );
};

export default AddTaskPage;
