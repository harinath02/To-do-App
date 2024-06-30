import React, { useState } from 'react';

function TaskList({ tasks, deleteTask, toggleStatus, editTask }) {
  const [isEditing, setIsEditing] = useState(null);
  const [editText, setEditText] = useState('');
  const [editDueDate, setEditDueDate] = useState('');

  // Edit task
  const handleEdit = (index, text, dueDate) => {
    setIsEditing(index);
    setEditText(text);
    setEditDueDate(dueDate);
  };

  // Save edited task
  const handleSave = (index) => {
    editTask(index, editText, editDueDate);
    setIsEditing(null);
    setEditText('');
    setEditDueDate('');
  };

  // Get current date and time
  const currentDate = new Date().toLocaleDateString('en-US');
  const currentTime = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });

  return (
    <div>
      {tasks.map((task, index) => (
        <div className="card mb-3" key={index}>
          <div className="card-body d-flex align-items-center">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleStatus(index)}
              />
            </div>
            <div className="flex-grow-1 ms-3">
              {isEditing === index ? (
                <div className="d-flex align-items-center">
                  <input
                    type="text"
                    className="form-control form-control-sm me-2"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <input
                    type="date"
                    className="form-control form-control-sm"
                    value={editDueDate}
                    onChange={(e) => setEditDueDate(e.target.value)}
                  />
                </div>
              ) : (
                <p className={`lead mb-0 ${task.completed ? 'text-decoration-line-through' : ''}`}>
                  {task.text}
                  {task.dueDate && (
                    <span className="badge bg-info ms-2">
                      <span style={{ color: 'red' }}>Due Date:</span> {task.dueDate}
                    </span>
                  )}
                </p>
              )}
            </div>
            <div className="ms-auto">
              {isEditing === index ? (
                <button className="btn btn-success btn-sm me-2" onClick={() => handleSave(index)}>
                  Save
                </button>
              ) : (
                <a href="#!" className="text-info me-2" title="Edit todo" onClick={() => handleEdit(index, task.text, task.dueDate)}>
                  <i className="fas fa-pencil-alt"></i>
                </a>
              )}
              <a href="#!" className="text-danger" title="Delete todo" onClick={() => deleteTask(index)}>
                <i className="fas fa-trash-alt"></i>
              </a>
            </div>
          </div>
          <div className="card-footer text-muted d-flex justify-content-end">
            <small className="me-2">
              <i className="fas fa-info-circle me-1"></i>Created on {currentDate} at {currentTime}
            </small>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
