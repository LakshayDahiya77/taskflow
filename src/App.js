import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import Task from "./components/Task";
import { ThemeContext } from './components/ThemeContext';

function TaskSection({ title, children }) {
  return (
    <div className="task-section">
      <h2 className="task-section-heading">{title}</h2>
      {children}
    </div>
  );
}

function getFormattedTime() {
  return new Date().toTimeString().slice(0, 5);
}

function getFormattedDate() {
  return new Date().toISOString().split('T')[0];
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
}

function formatTime(timeString) {
  const [hours, minutes] = timeString.split(':');
  return new Date(0, 0, 0, hours, minutes).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}

function formatDateTime(dateString, timeString) {
  return `${formatDate(dateString)} | ${formatTime(timeString)}`;
}

const getInitialTasks = () => {
  const storedTasks = localStorage.getItem("tasks");
  return storedTasks ? JSON.parse(storedTasks) : [];
};

function App() {
  const [tasks, setTasks] = useState(getInitialTasks());
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
    date: getFormattedDate(),
    time: getFormattedTime(),
  });

  const { toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleNewTaskChange = (e) => {
    const { name, value } = e.target;
    setNewTaskValues({ ...newTaskValues, [name]: value });
  };

  const addTask = () => {
    if (!newTaskValues.title && !newTaskValues.description) {
      return; 
    }

    const newTask = {
      id: tasks.length + 1,
      ...newTaskValues,
      status: false,
    };
    setTasks([...tasks, newTask]);
    setNewTaskValues({
      title: "",
      description: "",
      date: getFormattedDate(),
      time: getFormattedTime()
    });
  };

  const toggleTaskStatus = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, status: !task.status } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const startEditingTask = (task) => {
    setEditingTaskId(task.id);
    setEditValues({ ...task });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditValues({ ...editValues, [name]: value });
  };

  const saveTask = () => {
    setTasks(tasks.map(task =>
      task.id === editingTaskId ? { ...task, ...editValues } : task
    ));
    setEditingTaskId(null);
  };

  const cancelEdit = () => {
    setEditingTaskId(null);
  };

  const incompleteTasks = tasks.filter(task => !task.status);
  const completeTasks = tasks.filter(task => task.status);

  return (
    <div className="app">
      <Task
        id={null}
        addTask={addTask}
        handleNewTaskChange={handleNewTaskChange}
        newTaskValues={newTaskValues}
      />

      <TaskSection title="Incomplete Tasks" >
        {incompleteTasks.map(item => (
          <Task
            key={item.id}
            {...item}
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
      <TaskSection title="Completed Tasks" > 
        {completeTasks.map(item => (
          <Task
            key={item.id}
            {...item}
            onToggleStatus={() => toggleTaskStatus(item.id)}
            onDeleteTask={() => deleteTask(item.id)}
          />
        ))}
      </TaskSection>
     </div>
  );
}

export default App;
