import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container-fluid home-container d-flex flex-column align-items-center justify-content-center">

      <h1 className="text-center text-black mb-4">Welcome to Task Manager</h1>

      <div className="btn-container">
        <Link to="/add-task">
          <button className="btn btn-primary">Add Task</button>
        </Link>
        <Link to="/task-list">
          <button className="btn btn-success">Task List</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;


