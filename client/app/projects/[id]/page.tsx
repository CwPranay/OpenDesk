"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import TaskForm from "./TaskForm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


import TaskList from "./TaskList";
import { Trash2 } from "lucide-react";


interface Project {
  _id: string;
  title: string;
  description?: string;
  repoUrl?: string;
  owner?: { name: string; email: string, clerkId: string };
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
  const { userId } = useAuth()
  const { id } = useParams();
  const router = useRouter();
  const { getToken } = useAuth();
  const searchParams = useSearchParams();
  const from = searchParams.get("from");


  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isOwner, setIsOwner] = useState(false);


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
      setTasks(taskData.tasks);

      // SAVE OWNER FLAG
      setIsOwner(taskData.isOwner);
    };

    loadData();
  }, [id, getToken]);
  async function deleteProject(projectId: string) {
    const token = await getToken();
    const res = await fetch(`http://localhost:5000/api/projects/${projectId}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      method: "DELETE",
      credentials: "include",
    });
    window.location.href = "/projects"
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error?.error || "Delete failed");
    }
  }


  if (!project) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-gray-700 border-t-gray-500 rounded-full animate-spin"></div>
          <p className="text-gray-400">Loading project...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 text-white p-8">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => {
            if (from === "explore") {
              router.push("/projects/explore");
            }
            else {
              router.push("/projects")
            }
          }
          }
          className="flex items-center gap-2 text-gray-400 hover:text-gray-300 mb-6 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back to Projects</span>
        </button>

        {/* Project Header Card */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 backdrop-blur-sm border border-gray-700 rounded-xl p-6 mb-6 shadow-2xl">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                </div>
                <div className="flex w-full  justify-between">

                  <h1 className="text-2xl font-semibold text-white">
                    {project.title}
                  </h1>
                  {project.owner?.clerkId == userId && <AlertDialog>
                    <AlertDialogTrigger><Trash2 /></AlertDialogTrigger>
                    <AlertDialogContent className="bg-linear-to-br text-white from-gray-800 to-gray-900">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure to delete?</AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-400">
                          This action cannot be undone. This will permanently delete your project
                          and remove project data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="border-gray-700 hover:border-gray-600 bg-gray-800/80 hover:bg-gray-800/80 rounded-lg text-white hover:text-white">Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                          onClick={async () => {
                            try {
                              await deleteProject(project._id);


                              router.refresh();


                            } catch (err) {
                              console.error(err);
                            }
                          }}
                        >
                          Continue
                        </AlertDialogAction>

                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>}

                </div>

              </div>

              <p className="text-gray-400 leading-relaxed">
                {project.description || "No description provided"}
              </p>
            </div>
          </div>

          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium px-4 py-2 rounded-lg transition-all duration-200 text-sm shadow-lg shadow-blue-900/50 hover:shadow-xl hover:shadow-blue-900/60 hover:-translate-y-0.5"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              View on GitHub
            </a>
          )}

          <div className="mt-5 pt-5 border-t border-gray-700 flex flex-wrap gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>{project.owner?.name} ({project.owner?.email})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>
                {new Date(project.createdAt).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Tasks Section */}

        <div className="space-y-6">
          {project.owner?.clerkId == userId && <TaskForm
            projectId={project._id}
            onTaskCreated={(task: Task) => setTasks(prev => [task, ...prev])}
          />}


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
      </div>
    </main>
  );
}
