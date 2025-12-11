import React, { useState, useEffect } from "react";
import "./App.css";
import { Task } from "./assets/Task";

const STORAGE_KEY = "myTasksList";

const loadTasks = (): Task[] => {
  try {
    const jsonTasks = localStorage.getItem(STORAGE_KEY);
    if (jsonTasks === null) {
      return [];
    }

    const parsedTasks = JSON.parse(jsonTasks);
    if (!Array.isArray(parsedTasks)) {
      return [];
    }

    return parsedTasks.map((t: any) => {
      const task = new Task(t.name);
      task.id = t.id ?? task.id;
      task.completed = Boolean(t.completed);
      task.createdAt = t.createdAt ?? task.createdAt;
      return task;
    });
  } catch {
    return [];
  }
};

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(loadTasks);
  const [newTaskName, setNewTaskName] = useState<string>("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTaskName.trim()) return;

    const newTask = new Task(newTaskName.trim());
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setNewTaskName("");
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const toggleComplete = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>מנהל משימות</h1>
      </header>

      <main>
        <h2>ניהול משימות (Task Manager)</h2>

        <form onSubmit={addTask}>
          <input
            type="text"
            placeholder="הכנס שם משימה..."
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
          />
          <button type="submit" disabled={!newTaskName.trim()}>
            ➕ הוסף
          </button>
        </form>

        <hr />

        <h2>רשימת המטלות</h2>

        <table>
          <thead>
            <tr>
              <th>סטטוס</th>
              <th>שם המטלה</th>
              <th>פעולות</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  style={{ textAlign: "center", fontStyle: "italic" }}
                >
                  אין מטלות כרגע. אנא הוסף מטלה חדשה!
                </td>
              </tr>
            ) : (
              tasks.map((task) => (
                <tr
                  key={task.id}
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                  }}
                >
                  <td>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleComplete(task.id)}
                    />
                  </td>
                  <td>{task.name}</td>
                  <td>
                    <button
                      onClick={() => deleteTask(task.id)}
                      style={{
                        color: "red",
                        cursor: "pointer",
                        border: "none",
                        background: "none",
                      }}
                    >
                      ❌ מחק
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </main>

      <footer className="app-footer">
        <small>נבנה על ידי יהונתן 💻</small>
      </footer>
    </div>
  );
};

export default App;
