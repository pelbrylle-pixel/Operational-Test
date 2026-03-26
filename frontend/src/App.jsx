import React, { useState, useEffect } from 'react';
import { TaskForm } from './TaskForm';
import { TaskItem } from './TaskItem';
import { taskAPI } from './api';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch all tasks on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await taskAPI.getTasks();
      setTasks(data);
    } catch (err) {
      setError('Failed to load tasks. Make sure the backend is running.');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await taskAPI.createTask(taskData);
      setTasks([newTask, ...tasks]);
      setError('');
    } catch (err) {
      setError('Failed to create task');
      throw err;
    }
  };

  const handleUpdateTask = async (id, taskData) => {
    try {
      const updatedTask = await taskAPI.updateTask(id, taskData);
      setTasks(tasks.map(task => task.id === id ? updatedTask : task));
      setError('');
    } catch (err) {
      setError('Failed to update task');
      throw err;
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await taskAPI.deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
      setError('');
    } catch (err) {
      setError('Failed to delete task');
      throw err;
    }
  };

  return (
    <div className="app-container">
      <div className="app-header">
        <h1>📝 Task Manager</h1>
        <p>Stay organized and productive</p>
      </div>

      {error && (
        <div className="app-error">
          <span>{error}</span>
          <button onClick={fetchTasks} className="retry-btn">
            Retry
          </button>
        </div>
      )}

      <TaskForm onSubmit={handleCreateTask} />

      <div className="tasks-section">
        <h2>Tasks ({tasks.length})</h2>

        {loading ? (
          <div className="loading">Loading tasks...</div>
        ) : tasks.length === 0 ? (
          <div className="empty-state">
            <p>📭 No tasks yet. Create one to get started!</p>
          </div>
        ) : (
          <div className="tasks-list">
            {tasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onUpdate={handleUpdateTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
