import React, { useState } from "react";
import "./App.css";
import data from "./data";
import Task from "./components/Task";

function TaskSection({ title, children }) {
  return (
    <div className="task-section">
      <h2>{title}</h2>
      {children}
    </div>
  );
}

function App() {
  const [tasks, setTasks] = useState(data);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editValues, setEditValues] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
  });
  const [newTaskValues, setNewTaskValues] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
  });

  const handleNewTaskChange = (e) => {
    const { name, value } = e.target;
    setNewTaskValues({ ...newTaskValues, [name]: value });
  };

  const addTask = () => {
    const newTask = {
      id: tasks.length + 1,
      title: newTaskValues.title,
      description: newTaskValues.description,
      date: newTaskValues.date,
      time: newTaskValues.time,
      status: false,
    };
    setTasks([...tasks, newTask]);
    setNewTaskValues({ title: "", description: "", date: "", time: "" });
  };

  const toggleTaskStatus = (id) => {
    const newTasks = tasks.map((task) =>
      task.id === id ? { ...task, status: !task.status } : task
    );
    setTasks(newTasks);
  };

  const deleteTask = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  const startEditingTask = (task) => {
    setEditingTaskId(task.id);
    setEditValues({
      title: task.title,
      description: task.description,
      date: task.date,
      time: task.time,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditValues({ ...editValues, [name]: value });
  };

  const saveTask = () => {
    const newTasks = tasks.map((task) =>
      task.id === editingTaskId ? { ...task, ...editValues } : task
    );
    setTasks(newTasks);
    setEditingTaskId(null);
  };

  const cancelEdit = () => {
    setEditingTaskId(null);
  };

  const incompleteTasks = tasks.filter((task) => !task.status);
  const completeTasks = tasks.filter((task) => task.status);

  return (
    <div className="app">
      <Task
        id={null}
        addTask={addTask}
        handleNewTaskChange={handleNewTaskChange}
        newTaskValues={newTaskValues}
      />

      <TaskSection title="Incomplete Tasks">
        {incompleteTasks.map((item) => (
          <Task
            key={item.id}
            id={item.id}
            title={item.title}
            date={item.date}
            time={item.time}
            description={item.description}
            status={item.status}
            onToggleStatus={() => toggleTaskStatus(item.id)}
            onDeleteTask={() => deleteTask(item.id)}
            onEditTask={() => startEditingTask(item)}
            editingTask={editingTaskId === item.id}
            editValues={editValues}
            handleEditChange={handleEditChange}
            saveTask={saveTask}
            cancelEdit={cancelEdit}
          />
        ))}
      </TaskSection>
      <TaskSection title="Completed Tasks">
        {completeTasks.map((item) => (
          <Task
            key={item.id}
            id={item.id}
            title={item.title}
            date={item.date}
            time={item.time}
            description={item.description}
            status={item.status}
            onToggleStatus={() => toggleTaskStatus(item.id)}
            onDeleteTask={() => deleteTask(item.id)}
          />
        ))}
      </TaskSection>
    </div>
  );
}

export default App;
