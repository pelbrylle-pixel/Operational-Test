import React, { useState } from 'react';
import './TaskItem.css';

export function TaskItem({ task, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    if (!editTitle.trim()) {
      setError('Title is required');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await onUpdate(task.id, {
        title: editTitle.trim(),
        description: editDescription.trim(),
        completed: task.completed,
      });
      setIsEditing(false);
    } catch (err) {
      setError(err.message || 'Failed to update task');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description || '');
    setError('');
    setIsEditing(false);
  };

  const handleToggle = async () => {
    setLoading(true);
    setError('');
    try {
      await onUpdate(task.id, {
        ...task,
        completed: !task.completed,
      });
    } catch (err) {
      setError(err.message || 'Failed to toggle task status');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setLoading(true);
      setError('');
      try {
        await onDelete(task.id);
      } catch (err) {
        setError(err.message || 'Failed to delete task');
        setLoading(false);
      }
    }
  };

  const formattedDate = new Date(task.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      {error && <div className="task-error">{error}</div>}

      {!isEditing ? (
        <>
          <div className="task-content">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={handleToggle}
              disabled={loading}
              className="task-checkbox"
            />
            <div className="task-text">
              <h3 className={task.completed ? 'strike-through' : ''}>
                {task.title}
              </h3>
              {task.description && (
                <p className="task-description">{task.description}</p>
              )}
              <span className="task-date">{formattedDate}</span>
            </div>
          </div>

          <div className="task-actions">
            <button
              onClick={() => setIsEditing(true)}
              disabled={loading}
              className="btn-edit"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              disabled={loading}
              className="btn-delete"
            >
              Delete
            </button>
          </div>
        </>
      ) : (
        <div className="task-edit-form">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Task title"
            disabled={loading}
            className="edit-input"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="Task description (optional)"
            disabled={loading}
            rows="2"
            className="edit-textarea"
          />
          <div className="edit-actions">
            <button
              onClick={handleSave}
              disabled={loading}
              className="btn-save"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={handleCancel}
              disabled={loading}
              className="btn-cancel"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
