import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

function formatDateTime(dateString, timeString) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    return new Date(0, 0, 0, hours, minutes).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return `${formatDate(dateString)} | ${formatTime(timeString)}`;
}

export default function Task(props) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const {
    id,
    title,
    date,
    time,
    description,
    status,
    className, 
    onToggleStatus,
    onDeleteTask,
    onEditTask,
    editingTask,
    editValues,
    handleEditChange,
    saveTask,
    cancelEdit,
    addTask,
    handleNewTaskChange,
    newTaskValues,
  } = props;

  if (id === null) {
    return (
      <div className="add-task-form">
        <div className="forum-theme-slider">
          <h2 className="task-section-heading">Add New Task</h2>
         
            <button className="theme-button" onClick={toggleTheme}>
            <img className="theme-icon sun" src="/images/light-mode.png"></img>
              <img className="theme-icon moon" src="/images/dark-mode.png"></img>
            </button>
        
        </div>

        <div className="add-task-header">
          <input
            name="title"
            className="add-task-title"
            value={newTaskValues.title}
            onChange={handleNewTaskChange}
            placeholder="Title"
          />
          <input
            type="date"
            name="date"
            className="add-task-date"
            value={newTaskValues.date}
            onChange={handleNewTaskChange}
          />
          <input
            type="time"
            name="time"
            className="add-task-time"
            value={newTaskValues.time}
            onChange={handleNewTaskChange}
          />
        </div>
        <textarea
          name="description"
          className="add-task-description"
          value={newTaskValues.description}
          onChange={handleNewTaskChange}
          placeholder="Description"
        />
        <button onClick={addTask}>Add Task</button>
      </div>
    );
  }

  return (
    <div className={`task-container ${className}`}>
      <div className="task-header">
        {editingTask ? (
          <input
            name="title"
            className="edit-task-title"
            value={editValues.title}
            onChange={handleEditChange}
          />
        ) : (
          <h3 className="task-title">{title}</h3>
        )}
        {editingTask ? (
          <div className="edit-task-datetime">
            <input
              type="date"
              name="date"
              value={editValues.date}
              onChange={handleEditChange}
            />
            <input
              type="time"
              name="time"
              value={editValues.time}
              onChange={handleEditChange}
            />
          </div>
        ) : (
          <div className="task-date">{formatDateTime(date, time)}</div>
        )}
      </div>

      {editingTask ? (
        <textarea
          name="description"
          className="edit-task-description"
          value={editValues.description}
          onChange={handleEditChange}
        />
      ) : (
        <div className="task-description">{description}</div>
      )}

      <div className="buttons-bar">
        {editingTask ? (
          <>
            <button className="save-task" onClick={saveTask}>
              Save
            </button>
            <button className="cancel-edit" onClick={cancelEdit}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <button className="mark-status" onClick={onToggleStatus}>
              {status ? "Mark Incomplete" : "Mark Complete"}
            </button>
            {!status && (
              <button className="update-task" onClick={onEditTask}>
                Edit
              </button>
            )}
            <button className="delete-task" onClick={onDeleteTask}>
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}
