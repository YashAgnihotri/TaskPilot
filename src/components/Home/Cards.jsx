import React, { useState } from "react";
import { FaCheck, FaEdit, FaTrash, FaStar } from "react-icons/fa";
import Modal from "react-modal";

Modal.setAppElement("#root");

const Card = ({ taskData, updateTask, deleteTask, markAsComplete, toggleImportant }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editedTask, setEditedTask] = useState(taskData);

  // Handle Edit Task
  const handleEditChange = (e) => {
    setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateTask(editedTask);
    setModalIsOpen(false);
  };

  return (
    <div className={`task-card ${taskData.status === "completed" ? "completed" : ""}`}>
      <div className="task-header">
        <h2 className="task-assignee">{taskData.assignee}</h2>
        <div className="task-icons">
          <FaStar 
            className={`icon star-icon ${taskData.important ? "important" : ""}`} 
            title="Mark as Important" 
            onClick={() => toggleImportant(taskData.id)} 
          />
          <FaEdit className="icon edit-icon" title="Edit Task" onClick={() => setModalIsOpen(true)} />
          <FaTrash className="icon delete-icon" title="Delete Task" onClick={() => deleteTask(taskData.id)} />
          <FaCheck className="icon complete-icon" title="Mark as Complete" onClick={() => markAsComplete(taskData.id)} />
        </div>
      </div>
      <p className="task-description">Task: {taskData.task}</p>
      <p className="task-duration">Duration: {taskData.duration}</p>

      {/* Edit Task Modal */}
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} className="modal-overlay">
        <div className="modal-content">
          <h2>Edit Task</h2>
          <form onSubmit={handleEditSubmit} className="task-form">
            <label>Assignee:</label>
            <input type="text" name="assignee" value={editedTask.assignee} onChange={handleEditChange} required />

            <label>Task:</label>
            <input type="text" name="task" value={editedTask.task} onChange={handleEditChange} required />

            <label>Duration:</label>
            <input type="text" name="duration" value={editedTask.duration} onChange={handleEditChange} required />

            <div className="modal-buttons">
              <button type="submit" className="submit-button">Update Task</button>
              <button type="button" onClick={() => setModalIsOpen(false)} className="cancel-button">Cancel</button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Card;
