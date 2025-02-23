import React, { useState } from "react";
import "./App.css";
import Sidebar from "./components/Home/Sidebar";
import AddTaskButton from "./components/Home/AddTaskButton";
import Card from "./components/Home/Cards";
import Auth from "./components/Home/Auth";

const App = () => {
  const [tasks, setTasks] = useState([
    { id: 1, assignee: "John Doe", task: "Design Homepage", duration: "2 days", status: "pending", important: false },
    { id: 2, assignee: "Jane Smith", task: "Develop API", duration: "5 days", status: "pending", important: true },
    { id: 3, assignee: "Alice Johnson", task: "Write Documentation", duration: "3 days", status: "pending", important: false },
    { id: 4, assignee: "Bob Brown", task: "Fix Bugs", duration: "4 days", status: "completed", important: true }
  ]);

  const [user, setUser] = useState(null); // Track logged-in user
  const [showAuth, setShowAuth] = useState(false); // Show/hide Auth modal
  const [filter, setFilter] = useState("all"); // Track filter selection

  // Add a new task
  const addTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: tasks.length + 1, status: "pending", important: false }]);
  };

  // Update a task
  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  };

  // Delete a task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Mark task as complete
  const markAsComplete = (taskId) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, status: "completed" } : task));
  };

  // Toggle important status
  const toggleImportant = (taskId) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, important: !task.important } : task));
  };

  // Filter tasks based on selected category
  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.status === "completed";
    if (filter === "pending") return task.status === "pending";
    if (filter === "important") return task.important;
    return true; // Show all tasks
  });

  return (
    <div className="app-container">
      <Sidebar setFilter={setFilter} setShowAuth={setShowAuth} user={user} setUser={setUser} />

      <div className="content">
        <div className="top-bar">
          <h1 className="page-title">Task List</h1>
        </div>

        <AddTaskButton addTask={addTask} />
        <div className="task-grid">
          {filteredTasks.map((task) => (
            <Card 
              key={task.id} 
              taskData={task} 
              updateTask={updateTask} 
              deleteTask={deleteTask} 
              markAsComplete={markAsComplete} 
              toggleImportant={toggleImportant} 
            />
          ))}
        </div>
      </div>

      {/* Show Auth as Modal */}
      {showAuth && <Auth setUser={setUser} setShowAuth={setShowAuth} />}
    </div>
  );
};

export default App;
