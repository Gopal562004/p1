import { useState, useEffect } from "react";
import { createTask, updateTask } from "../api/services";

const TaskForm = ({ fetchTasks, editTask, setEditTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setDescription(editTask.description);
      setStatus(editTask.status);
    } else {
      setTitle("");
      setDescription("");
      setStatus("todo");
    }
  }, [editTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editTask) {
        await updateTask(editTask._id, { title, description, status });
        setEditTask(null);
      } else {
        await createTask({ title, description, status });
      }
      setTitle("");
      setDescription("");
      setStatus("todo");
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 mb-4 border p-4 rounded shadow"
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        className="border p-2 rounded"
        required
      />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="border p-2 rounded"
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="todo">Todo</option>
        <option value="inprogress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <button type="submit" className="bg-green-500 text-white p-2 rounded">
        {editTask ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;
