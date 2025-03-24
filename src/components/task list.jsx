import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles1.css";

const TaskListPage = () => {
  const [taskList, setTaskList] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedDueDate, setUpdatedDueDate] = useState("");

  // 🔹 Fetch tasks from MySQL on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/tasks");
      setTaskList(response.data);
    } catch (error) {
      console.error(" Error fetching tasks:", error);
    }
  };

  // Handle Edit Button Click
  const handleEdit = (task) => {
    setEditingTaskId(task.id);
    setUpdatedTitle(task.title);
    setUpdatedDescription(task.description);
    setUpdatedDueDate(task.due_date);
  };

  // Handle Save Button Click 
  const handleSave = async (id) => {
    if (!updatedTitle.trim()) {
      alert("Task title is required!");
      return;
    }

    try {
      await axios.put(`http://localhost:5000/tasks/${id}`, {
        title: updatedTitle,
        description: updatedDescription,
        due_date: updatedDueDate,
      });

      alert("✅ Task updated successfully!");
      setEditingTaskId(null);
      fetchTasks(); 
    } catch (error) {
      console.error("❌ Error updating task:", error);
    }
  };

  // 🔹 Handle Delete Task 
  const handleDelete = async (id) => {
    if (!window.confirm("🗑 Are you sure you want to delete this task?")) return;

    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      alert("✅ Task deleted!");
      fetchTasks(); 
    } catch (error) {
      console.error("❌ Error deleting task:", error);
    }
  };

  return (
    <div className="container task-container">
      <div className="card p-4 task-card">
        <h2 className="text-center mb-4">📋 Task List</h2>

        {taskList.length === 0 ? (
          <div className="alert alert-warning text-center">⚠ No tasks found.</div>
        ) : (
          <ul className="list-group">
            {taskList.map((task) => (
              <li key={task.id} className="list-group-item task-item">
                {editingTaskId === task.id ? (
                  <div>
                    <input
                      type="text"
                      className="form-control mb-2"
                      value={updatedTitle}
                      onChange={(e) => setUpdatedTitle(e.target.value)}
                      required
                    />
                    <textarea
                      className="form-control mb-2"
                      value={updatedDescription}
                      onChange={(e) => setUpdatedDescription(e.target.value)}
                    />
                    <input
                      type="date"
                      className="form-control mb-2"
                      value={updatedDueDate}
                      onChange={(e) => setUpdatedDueDate(e.target.value)}
                    />
                    <button className="btn btn-success btn-sm me-2" onClick={() => handleSave(task.id)}>
                       Save
                    </button>
                    <button className="btn btn-secondary btn-sm" onClick={() => setEditingTaskId(null)}>
                       Cancel
                    </button>
                  </div>
                ) : (
                  <div>
                    <h5 className="task-title">{task.title}</h5>
                    <p className="task-desc">{task.description}</p>
                    <p className="task-date">
                      <strong>Due:</strong> {task.due_date}
                    </p>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(task)}>
                      ✏ Edit
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(task.id)}>
                      🗑 Delete
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}

        <div className="text-center mt-3">
          <Link to="/" className="btn btn-dark w-100"> Home</Link>
        </div>
      </div>
    </div>
  );
};

export default TaskListPage;
