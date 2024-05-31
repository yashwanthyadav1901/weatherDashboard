// src/TodoApp.js
import React, { useState } from "react";
import "./taskBar.css";

const initialData = [
  { id: 1, text: "Task 1", done: false },
  { id: 2, text: "Task 2", done: false },
  { id: 3, text: "Task 3", done: false },
];

const TaskBar = () => {
  const [tasks, setTasks] = useState(initialData);
  const [newTask, setNewTask] = useState("");

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleDone = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const handleAddTask = () => {
    if (newTask.trim() === "") return;
    const newTaskObj = {
      id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
      text: newTask,
      done: false,
    };
    setTasks([...tasks, newTaskObj]);
    setNewTask("");
  };

  return (
    <div className="bg task-main">
      <div className="header">
        {" "}
        <h1>today's tasks</h1>
        <div className="task-input">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task"
            className=""
          />
          <button className="button blue" onClick={handleAddTask}>
            Add Task
          </button>
        </div>
      </div>
      <div className="underline">
        <hr />
      </div>
      <div className="todo-container">
        {tasks.map((task) => (
          <div key={task.id} className={`todo-item ${task.done ? "done" : ""}`}>
            <span>{task.text}</span>
            <div>
              <button
                className="button green"
                onClick={() => handleDone(task.id)}
              >
                {task.done ? "Undo" : "Done"}
              </button>
              <button
                className="button red"
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskBar;
