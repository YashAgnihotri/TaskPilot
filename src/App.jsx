import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Home from "./pages/Home";
import Card from "./components/Home/Cards";
import AddTaskButton from "./components/Home/AddTaskButton";
import Sidebar from "./components/Home/sidebar";
import Auth from "./components/Home/Auth";

const App = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([
    { id: 1, assignee: "John Doe", task: "Design Homepage", duration: "2 days", status: "completed", important: false },
    { id: 2, assignee: "Jane Smith", task: "Develop API", duration: "5 days", status: "pending", important: true },
    { id: 3, assignee: "Alice Johnson", task: "Write Documentation", duration: "3 days", status: "pending", important: false },
    { id: 4, assignee: "Bob Brown", task: "Fix Bugs", duration: "4 days", status: "completed", important: true }
  ]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.get("http://localhost:5000/authenticate", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setUser(response.data.user))
      .catch(() => setUser(null));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <div className="app-container">
      <div className="top-bar">
        {/* <h1 className="page-title">Task List</h1> */}
        {user ? (
          <button className="auth-button" onClick={handleLogout}>Logout</button>
        ) : (
          <button className="auth-button" onClick={() => setUser(false)}>Sign In</button>
        )}
      </div>

      {!user ? (
        <Auth setUser={setUser} />
      ) : (
        <>
          <Sidebar />
          <div className="content">
            <AddTaskButton addTask={() => {}} />
            <div className="task-grid">
              {tasks.map((task) => (
                <Card key={task.id} taskData={task} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
