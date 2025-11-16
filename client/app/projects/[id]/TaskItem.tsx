"use client";
import { useAuth } from "@clerk/nextjs";

interface Task {
  _id: string;
  title: string;
  description?: string;
  status: "pending" | "in-progress" | "completed";
  projectId: string;
  createdAt: string;
}

interface Props {
  task: Task;   // ✅ FIXED (single task, not array)
  onTaskUpdated: (task: Task) => void;
  onTaskDeleted: (id: string) => void;
}

export default function TaskItem({ task, onTaskUpdated, onTaskDeleted }: Props) {
  const { getToken } = useAuth();

  const updateStatus = async (status: Task["status"]) => {
    const token = await getToken();

    const res = await fetch(`http://localhost:5000/api/tasks/${task._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    const data = await res.json();
    if (res.ok) onTaskUpdated(data);
  };

  const deleteTask = async () => {
    const token = await getToken();

    const res = await fetch(`http://localhost:5000/api/tasks/${task._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) onTaskDeleted(task._id);
  };

  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm flex justify-between items-center">
      <div>
        <h4 className="font-semibold text-gray-800">{task.title}</h4>
        <p className="text-gray-600 text-sm">{task.description}</p>
        <p className="text-xs text-gray-400 mt-1">Status: {task.status}</p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => updateStatus("in-progress")}
          className="text-yellow-600 hover:underline text-sm"
        >
          In Progress
        </button>

        <button
          onClick={() => updateStatus("completed")}
          className="text-green-600 hover:underline text-sm"
        >
          Done
        </button>

        <button
          onClick={deleteTask}
          className="text-red-600 hover:underline text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
