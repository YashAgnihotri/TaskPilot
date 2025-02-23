import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Sidebar from "./components/Home/sidebar";
import AddTaskButton from "./components/Home/AddTaskButton";
import Card from "./components/Home/Cards";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000"; // Use env variable for deployment

const App = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from MongoDB when the app loads
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Add a new task
  const addTask = async (newTask) => {
    try {
      const response = await axios.post(`${API_URL}/tasks`, newTask);
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Update a task
  const updateTask = async (updatedTask) => {
    try {
      await axios.put(`${API_URL}/tasks/${updatedTask._id}`, updatedTask);
      setTasks(tasks.map(task => task._id === updatedTask._id ? updatedTask : task));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Delete a task
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${API_URL}/tasks/${taskId}`);
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Mark task as complete
  const markAsComplete = async (taskId) => {
    try {
      await axios.put(`${API_URL}/tasks/${taskId}/complete`);
      setTasks(tasks.map(task => task._id === taskId ? { ...task, status: "completed" } : task));
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  // Toggle important status
  const toggleImportant = async (taskId) => {
    try {
      await axios.put(`${API_URL}/tasks/${taskId}/toggleImportant`);
      setTasks(tasks.map(task => task._id === taskId ? { ...task, important: !task.important } : task));
    } catch (error) {
      console.error("Error toggling importance:", error);
    }
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="content">
        <div className="top-bar">
          <h1 className="page-title">Task List</h1>
        </div>

        <AddTaskButton addTask={addTask} />
        <div className="task-grid">
          {tasks.map((task) => (
            <Card 
              key={task._id} 
              taskData={task} 
              updateTask={updateTask} 
              deleteTask={deleteTask} 
              markAsComplete={markAsComplete} 
              toggleImportant={toggleImportant} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
