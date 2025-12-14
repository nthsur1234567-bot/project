import React, { useEffect, useState } from "react"; // comment: hooks
import { Task } from "../assets/Task"; // comment: task model (path from pages folder)

const STORAGE_KEY = "myTasksList"; // comment: local storage key

const loadTasks = (): Task[] => { // comment: load tasks from local storage
  try { // comment: protect from JSON errors
    const jsonTasks = localStorage.getItem(STORAGE_KEY); // comment: read tasks
    if (jsonTasks === null) { // comment: if empty storage
      return []; // comment: return empty list
    } // comment: end if

    const parsedTasks = JSON.parse(jsonTasks); // comment: parse JSON
    if (!Array.isArray(parsedTasks)) { // comment: validate array
      return []; // comment: fallback
    } // comment: end if

    return parsedTasks.map((t: any) => { // comment: rebuild Task instances
      const task = new Task(t.name); // comment: create task
      task.id = t.id ?? task.id; // comment: restore id
      task.completed = Boolean(t.completed); // comment: restore completed
      task.createdAt = t.createdAt ?? task.createdAt; // comment: restore createdAt
      return task; // comment: return task
    }); // comment: end map
  } catch { // comment: handle errors
    return []; // comment: fallback
  } // comment: end try/catch
}; // comment: end loadTasks

const Management: React.FC = () => { // comment: management page component
  const [tasks, setTasks] = useState<Task[]>(loadTasks); // comment: tasks state
  const [newTaskName, setNewTaskName] = useState<string>(""); // comment: input state

  useEffect(() => { // comment: persist tasks on each change
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)); // comment: save tasks
  }, [tasks]); // comment: dependencies

  const addTask = (e: React.FormEvent<HTMLFormElement>) => { // comment: add task handler
    e.preventDefault(); // comment: prevent refresh
    if (!newTaskName.trim()) return; // comment: avoid empty tasks
    const newTask = new Task(newTaskName.trim()); // comment: create task
    setTasks((prev) => [...prev, newTask]); // comment: add to list
    setNewTaskName(""); // comment: clear input
  }; // comment: end addTask

  const deleteTask = (id: string) => { // comment: delete handler
    setTasks((prev) => prev.filter((task) => task.id !== id)); // comment: remove from list
  }; // comment: end deleteTask

  const toggleComplete = (id: string) => { // comment: toggle completion handler
    setTasks((prev) => // comment: update immutably
      prev.map((task) => // comment: map tasks
        task.id === id ? { ...task, completed: !task.completed } : task // comment: toggle
      ) // comment: end map
    ); // comment: end setTasks
  }; // comment: end toggleComplete

  return ( // comment: render page
    <div> {/* comment: wrapper */}
      <h1>ניהול משימות</h1> {/* comment: title */}

      <form onSubmit={addTask}> {/* comment: add task form */}
        <input
          type="text" // comment: text input
          placeholder="הכנס שם משימה..." // comment: placeholder
          value={newTaskName} // comment: controlled value
          onChange={(e) => setNewTaskName(e.target.value)} // comment: update state
        />
        <button type="submit" disabled={!newTaskName.trim()}> {/* comment: submit button */}
          ➕ הוסף
        </button>
      </form>

      <hr /> {/* comment: separator */}

      <ul> {/* comment: tasks list */}
        {tasks.length === 0 ? ( // comment: empty state
          <li style={{ fontStyle: "italic" }}>אין מטלות כרגע. אנא הוסף מטלה חדשה!</li> // comment: message
        ) : ( // comment: render tasks
          tasks.map((task) => ( // comment: iterate tasks
            <li key={task.id} style={{ textDecoration: task.completed ? "line-through" : "none" }}> {/* comment: item */}
              <input
                type="checkbox" // comment: checkbox
                checked={task.completed} // comment: controlled checked
                onChange={() => toggleComplete(task.id)} // comment: toggle
              />
              {" "}{task.name}{" "} {/* comment: task name */}
              <button onClick={() => deleteTask(task.id)} style={{ color: "red" }}> {/* comment: delete button */}
                ❌ מחק
              </button>
            </li> // comment: end item
          )) // comment: end map
        )} {/* comment: end conditional */}
      </ul> {/* comment: end list */}
    </div> // comment: end wrapper
  ); // comment: end return
}; // comment: end component

export default Management; // comment: export
