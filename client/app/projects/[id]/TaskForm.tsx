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
        const res = await fetch("http://localhost:5000/api/tasks", {
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
            className="bg-white p-4 rounded-xl shadow border border-gray-200"
        >
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Add Task</h3>

            <input
                type="text"
                placeholder="Task title"
                className="w-full mb-3 border px-3 py-2 rounded-lg"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />

            <textarea
                placeholder="Task description (optional)"
                className="w-full mb-3 border px-3 py-2 rounded-lg"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <button
                type="submit"
                className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition"
            >
                Add Task
            </button>
        </form>
    );
}