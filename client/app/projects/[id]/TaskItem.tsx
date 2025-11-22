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
  task: Task;
  onTaskUpdated?: (task: Task) => void;
  onTaskDeleted?: (id: string) => void;
  readOnly?: boolean;
}

export default function TaskItem({ task, onTaskUpdated, onTaskDeleted, readOnly = false }: Props) {
  const { getToken } = useAuth();

  const updateStatus = async (status: Task["status"]) => {
    if (readOnly) return;   // ⛔ BLOCK non-owners

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
    if (res.ok && onTaskUpdated) onTaskUpdated(data);
  };

  const deleteTask = async () => {
    if (readOnly) return;  // ⛔ BLOCK non-owners

    const token = await getToken();

    const res = await fetch(`http://localhost:5000/api/tasks/${task._id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok && onTaskDeleted) onTaskDeleted(task._id);
  };

  const statusColors = {
    pending: "border-gray-700 bg-gray-800/40",
    "in-progress": "border-blue-900/50 bg-blue-950/30",
    completed: "border-gray-700 bg-gray-800/30"
  };

  return (
    <div className={`group border ${statusColors[task.status]} rounded-md p-3.5 hover:bg-gray-800/60 transition-all duration-200 shadow-sm hover:shadow-md`}>
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <h4 className={`font-medium text-sm mb-1 ${task.status === "completed" ? "text-gray-500 line-through" : "text-white"}`}>
            {task.title}
          </h4>

          {task.description && (
            <p className="text-gray-500 text-xs leading-relaxed mb-2">
              {task.description}
            </p>
          )}

          <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
            task.status === "pending" ? "bg-gray-700 text-gray-400" :
            task.status === "in-progress" ? "bg-blue-900/40 text-blue-400" :
            "bg-gray-700/50 text-gray-500"
          }`}>
            {task.status.replace("-", " ")}
          </span>
        </div>

        {/* 🔒 SHOW BUTTONS ONLY IF OWNER */}
        {!readOnly && (
          <div className="flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {task.status !== "in-progress" && (
              <button
                onClick={() => updateStatus("in-progress")}
                className="px-2.5 py-1 text-xs font-medium bg-blue-600 text-white hover:bg-blue-700 rounded"
              >
                In Progress
              </button>
            )}

            {task.status !== "completed" && (
              <button
                onClick={() => updateStatus("completed")}
                className="px-2.5 py-1 text-xs font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 rounded"
              >
                Complete
              </button>
            )}

            <button
              onClick={deleteTask}
              className="px-2.5 py-1 text-xs font-medium bg-red-600/80 text-white hover:bg-red-700 rounded"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
