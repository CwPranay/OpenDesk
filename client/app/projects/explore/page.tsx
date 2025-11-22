"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";


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
        const res = await fetch("http://localhost:5000/api/projects/explore");
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

  
  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-gray-700 border-t-gray-500 rounded-full animate-spin"></div>
          <p className="text-gray-400">Loading projects...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 text-white py-12 px-6">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-white">
           All Projects
          </h1>
          
        </div>

       
        {/* Projects Grid */}
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project: Project) => (
              <Link key={project._id} href={`/projects/${project._id}?from=explore`}>
                <div className="group bg-gradient-to-br from-gray-800 to-gray-900 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-600/50 hover:from-gray-800 hover:to-gray-800 transition-all duration-300 cursor-pointer shadow-xl hover:shadow-2xl hover:-translate-y-1">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:from-blue-600 group-hover:to-blue-700 transition-all duration-300">
                      <svg className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-semibold mb-2 text-white truncate">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-2">
                        {project.description || "No description provided"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(project.createdAt).toLocaleDateString()}
                    </div>
                    <svg className="w-4 h-4 text-gray-600 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-lg bg-gray-800 border border-gray-700 mb-4">
              <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">No projects yet</h3>
            
          </div>
        )}
      </div>
    </main>
  );
}
