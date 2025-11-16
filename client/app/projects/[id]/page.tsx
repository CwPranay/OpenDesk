"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

interface Project {
  _id: string;
  title: string;
  description?: string;
  repoUrl?: string;
  owner?: { name: string; email: string };
  createdAt: string;
}

interface Task {
  _id: string;
  title: string;
  description?: string;
  status: "pending" | "in-progress" | "completed";
  projectId: string;
  assignee?: string | null;
  createdAt: string;
}

export default function ProjectPage() {
  const { id } = useParams();
  const router = useRouter();
  const { getToken } = useAuth();

  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const token = await getToken();

      // Fetch project
      const projectRes = await fetch(`http://localhost:5000/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!projectRes.ok) return;
      const projectData = await projectRes.json();
      setProject(projectData);

      // Fetch tasks
      const taskRes = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!taskRes.ok) return;
      const taskData = await taskRes.json();
      setTasks(taskData);
    };

    loadData();
  }, [id, getToken]);

  if (!project) return <div>Loading...</div>;

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 p-8">
      <button
        onClick={() => router.push("/projects")}
        className="text-blue-600 hover:underline mb-6 cursor-pointer"
      >
        ← Back to All Projects
      </button>

      {/* Project Section */}
      <div className="bg-white shadow-md rounded-2xl p-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700">{project.title}</h1>
        <p className="text-gray-700 mt-2">{project.description}</p>

        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            className="inline-block mt-5 text-white bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-xl transition"
          >
            View Code on GitHub
          </a>
        )}

        <div className="mt-8 text-sm text-gray-500">
          <p>Owner: {project.owner?.name} ({project.owner?.email})</p>
          <p>
            Created:{" "}
            {new Date(project.createdAt).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Tasks Section */}
      <div className="mt-10 max-w-3xl mx-auto">
        <TaskForm
          projectId={project._id}
          onTaskCreated={(task: Task) => setTasks(prev => [task, ...prev])}
        />

        <TaskList
          tasks={tasks}
          onTaskUpdated={(updatedTask: Task) =>
            setTasks(prev =>
              prev.map(t => (t._id === updatedTask._id ? updatedTask : t))
            )
          }
          onTaskDeleted={(taskId: string) =>
            setTasks(prev => prev.filter(t => t._id !== taskId))
          }
        />
      </div>
    </main>
  );
}
