"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link"; // ✅ import Link
import ProjectForm from "./ProjectForm";

interface Project {
  _id: string;
  title: string;
  description?: string;
  createdAt: Date;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = await getToken({ template: "integrationn_fallback" }); 
        const res = await fetch("http://localhost:5000/api/projects", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error("Fetch projects error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [getToken]);

  const handleProjectCreated = (newProject: Project) => {
    setProjects((prev) => [newProject, ...prev]);
  };

  if (loading) return <p className="text-gray-500 mt-8">Loading projects...</p>;

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 flex flex-col items-center py-10 px-6">
      <h1 className="text-3xl font-bold mb-6">Your Projects</h1>

      <ProjectForm onProjectCreated={handleProjectCreated} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 w-full max-w-5xl">
        {projects.length > 0 ? (
          projects.map((project: Project) => (
            <Link key={project._id} href={`/projects/${project._id}`}>
              <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-200 hover:shadow-lg transition cursor-pointer">
                <h3 className="text-xl font-semibold mb-2 text-blue-700">
                  {project.title}
                </h3>
                <p className="text-gray-600">
                  {project.description || "No description"}
                </p>
                <p className="text-sm text-gray-400 mt-3">
                  Created: {new Date(project.createdAt).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500">No projects found. Create one above!</p>
        )}
      </div>
    </main>
  );
}
