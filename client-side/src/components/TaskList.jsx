import { deleteTask } from "../api/services";

const TaskList = ({ tasks, fetchTasks, setEditTask }) => {
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-2">
      {tasks.length === 0 && <p>No tasks found.</p>}
      {tasks.map((task) => (
        <div
          key={task._id}
          className="border p-4 rounded flex justify-between items-center shadow"
        >
          <div>
            <h3 className="font-bold text-lg">{task.title}</h3>
            <p className="text-gray-700">{task.description}</p>
            <span
              className={`px-2 py-1 rounded text-white text-sm ${
                task.status === "todo"
                  ? "bg-blue-500"
                  : task.status === "inprogress"
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
            >
              {task.status}
            </span>
            {task.owner && (
              <p className="text-sm text-gray-500">Owner: {task.owner.name}</p>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setEditTask(task)}
              className="bg-yellow-500 text-white p-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(task._id)}
              className="bg-red-500 text-white p-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
