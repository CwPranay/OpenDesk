"use client"
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
interface Task {
  _id: string;
  title: string;
  description?: string;
  status: "pending" | "in-progress" | "completed";
  projectId: string;
  createdAt: string;
}

interface TaskFormProps {
  projectId: string;
  onTaskCreated: (task: Task) => void;
}

export default function TaskForm({ projectId, onTaskCreated }:TaskFormProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const { getToken } = useAuth();
    const createTask = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        const token = await getToken()
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${projectId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                title,
                description,
                projectId,
            })
        })

        const data = await res.json();

        if (res.ok) {
            onTaskCreated(data);
            setTitle("");
            setDescription("");
        } else {
            console.error("Task creation failed:", data.error);
        }
    }
    return (
        <form
            onSubmit={createTask}
            className="bg-gradient-to-br from-gray-800 to-gray-900 backdrop-blur-sm border border-gray-700 rounded-xl p-5 shadow-2xl"
        >
            <h3 className="text-base font-semibold text-white mb-4">Add New Task</h3>

            <div className="space-y-3">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">
                        Task Title *
                    </label>
                    <input
                        type="text"
                        placeholder="What needs to be done?"
                        className="w-full bg-gray-950/80 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm shadow-inner focus:shadow-lg"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">
                        Description
                    </label>
                    <textarea
                        placeholder="Add more details..."
                        className="w-full bg-gray-950/80 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none text-sm shadow-inner focus:shadow-lg"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={2}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-4 py-2.5 rounded-lg transition-all duration-200 text-sm shadow-xl shadow-blue-900/50 hover:shadow-2xl hover:shadow-blue-900/60 hover:-translate-y-0.5"
                >
                    Add Task
                </button>
            </div>
        </form>
    );
}