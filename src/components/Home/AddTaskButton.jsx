import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const AddTaskButton = ({ addTask }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [taskData, setTaskData] = useState({
    assignee: "",
    task: "",
    duration: "",
    important: false,
  });
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTaskData({ ...taskData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskData.assignee || !taskData.task || !taskData.duration) {
      alert("All fields are required!");
      return;
    }
    addTask(taskData);
    setTaskData({ assignee: "", task: "", duration: "", important: false });
    setModalIsOpen(false);
  };

  return (
    <div>
      <button className="add-task-button" onClick={() => setModalIsOpen(true)}>
        Add New Task
      </button>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} className="modal-overlay">
        <div className="modal-content">
          <h2>Add New Task</h2>
          <form onSubmit={handleSubmit} className="task-form">
            <label>Assignee:</label>
            <input type="text" name="assignee" value={taskData.assignee} onChange={handleChange} required />
            <label>Task:</label>
            <input type="text" name="task" value={taskData.task} onChange={handleChange} required />
            <label>Duration:</label>
            <input type="text" name="duration" value={taskData.duration} onChange={handleChange} required />
            <label className="checkbox-label">
              <input type="checkbox" name="important" checked={taskData.important} onChange={handleChange} />
              Mark as Important
            </label>
            <div className="modal-buttons">
              <button type="submit" className="submit-button">Add Task</button>
              <button type="button" onClick={() => setModalIsOpen(false)} className="cancel-button">Cancel</button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default AddTaskButton;