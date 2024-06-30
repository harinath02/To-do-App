import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';

function TaskInput() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('addedDate');

  // Load tasks from localStorage when the component mounts
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  // Save tasks to localStorage
  const saveTasksToLocalStorage = (updatedTasks) => {
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  // Add a new task
  const addTask = () => {
    if (newTask.trim() !== '') {
      const updatedTasks = [...tasks, { text: newTask, completed: false, dueDate: dueDate }];
      saveTasksToLocalStorage(updatedTasks);
      setNewTask('');
      setDueDate('');
    }
  };

  // Delete a task
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    saveTasksToLocalStorage(updatedTasks);
  };

  // Toggle task status
  const toggleStatus = (index) => {
    const updatedTasks = tasks.map((task, i) => 
      i === index ? { ...task, completed: !task.completed } : task
    );
    saveTasksToLocalStorage(updatedTasks);
  };

  // Edit a task
  const editTask = (index, newText, newDate) => {
    const updatedTasks = tasks.map((task, i) => 
      i === index ? { ...task, text: newText, dueDate: newDate } : task
    );
    saveTasksToLocalStorage(updatedTasks);
  };

  // Filter and sort tasks
  const filteredTasks = () => {
    let filtered = tasks;
    switch (filter) {
      case 'completed':
        filtered = tasks.filter(task => task.completed);
        break;
      case 'active':
        filtered = tasks.filter(task => !task.completed);
        break;
      case 'dueDate':
        filtered = tasks.filter(task => task.dueDate);
        break;
      default:
        break;
    }

    if (sort === 'dueDate') {
      filtered = filtered.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    }

    return filtered;
  };

  return (
    <div className="bg-info">
      <section className="vh-100">
        <div className="container py-5">
          <div className="card" style={{ borderRadius: '.75rem', backgroundColor: '#eff1f2' }}>
            <div className="card-body py-4 px-4 px-md-5">
              <h1 className="h1 text-center mt-3 mb-4 pb-3 text-primary">
                <i className="fas fa-check-square me-1"></i>
                <u>My Todo-List</u>
              </h1>

              <div className="pb-2">
                <div className="card">
                  <div className="card-body">
                    <div className="row gx-3 align-items-center">
                      <div className="col-md-6">
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Add new..."
                          value={newTask}
                          onChange={(e) => setNewTask(e.target.value)}
                        />
                      </div>
                      <div className="col-md-3">
                        <input
                          type="date"
                          className="form-control form-control-lg"
                          value={dueDate}
                          onChange={(e) => setDueDate(e.target.value)}
                        />
                      </div>
                      <div className="col-md-3">
                        <button type="button" className="btn btn-primary w-100" onClick={addTask}>
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="my-4" />

              <div className="d-flex justify-content-between align-items-center mb-4 pt-2 pb-3">
                <div className="small me-2 text-muted">Filter:</div>
                <select className="form-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
                  <option value="all">All</option>
                  <option value="completed">Completed</option>
                  <option value="active">Active</option>
                  <option value="dueDate">Has due date</option>
                </select>
                <div className="small ms-4 me-2 text-muted">Sort:</div>
                <select className="form-select" value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option value="addedDate">Added date</option>
                  <option value="dueDate">Due date</option>
                </select>
                <a href="#!" className="text-decoration-none" style={{ color: '#23af89' }} title="Ascending">
                  <i className="fas fa-sort-amount-down-alt ms-2"></i>
                </a>
              </div>

              <TaskList tasks={filteredTasks()} deleteTask={deleteTask} toggleStatus={toggleStatus} editTask={editTask} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TaskInput;
