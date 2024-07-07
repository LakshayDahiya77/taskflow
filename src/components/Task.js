import React from "react";

export default function Task(props) {
  const {
    id,
    title,
    date,
    time,
    description,
    status,
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

  return (
    <>
      {id !== null && (
        <div className="task-container">
          <div className="task-header">
            <h3 className="task-title">{title}</h3>
            <div className="task-date">{date} | {time}</div>
          </div>

          <div className="task-description">{description}</div>

          <div className="buttons-bar">
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
          </div>

          {editingTask && (
            <div className="edit-task">
              <div className="header-inputs">
                <input
                  name="title"
                  value={editValues.title}
                  onChange={handleEditChange}
                  placeholder="Title"
                />
                <input
                  type="date"
                  name="date"
                  value={editValues.date}
                  onChange={handleEditChange}
                  placeholder="Date"
                />
                <input
                  type="time"
                  name="time"
                  value={editValues.time}
                  onChange={handleEditChange}
                  placeholder="Time"
                />
              </div>
              <textarea
                name="description"
                value={editValues.description}
                onChange={handleEditChange}
                placeholder="Description"
              />
              <div className="task-edit-buttons">
                <button onClick={saveTask}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      )}

      {id === null && (
        <div className="add-task-form">
          <h2>Add New Task</h2>
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
      )}
    </>
  );
}
