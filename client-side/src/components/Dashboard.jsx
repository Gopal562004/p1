import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getTasks } from "../api/services";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">
          Welcome, {user.name} ({user.role})
        </h2>
        <button onClick={logout} className="bg-gray-500 text-white p-2 rounded">
          Logout
        </button>
      </div>

      <TaskForm
        fetchTasks={fetchTasks}
        editTask={editTask}
        setEditTask={setEditTask}
      />
      <TaskList
        tasks={tasks}
        fetchTasks={fetchTasks}
        setEditTask={setEditTask}
      />
    </div>
  );
};

export default Dashboard;
