import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./home";
import AddTaskPage from "./components/add task";
import TaskListPage from "./components/task list";

const App = () => {
 
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks)); 
  }, [tasks]);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id, updatedTask) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-task" element={<AddTaskPage onAddTask={addTask} />} />
        <Route path="/task-list" element={<TaskListPage tasks={tasks} onUpdateTask={updateTask} onDeleteTask={deleteTask} />} />
      </Routes>
    </Router>
  );
};

export default App;

