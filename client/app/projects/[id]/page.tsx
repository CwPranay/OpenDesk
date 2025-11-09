"use client";
import { useEffect,useState } from "react";
import { useParams,useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
interface project {
    _id: string;
    title: string;
    description?: string;
    repoUrl?:string;
    owner?:{
        name:string;
        email:string;
    };
    createdAt: Date;
}

export default function ProjectPage(){
    const {id}  = useParams();
    const {getToken} = useAuth();
    const router =useRouter();
    const [project,setProject]=useState<project | null>(null);
    useEffect(()=>{
        const fetchProject =async ()=>{
            const token = await getToken({ template: "integrationn_fallback" });
            const res = await fetch(`http://localhost:5000/api/projects/${id}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            const data  = await res.json();
            setProject(data);
            

        }
        fetchProject();
    },[id,getToken]);


    if(!project){
        return <div>Loading...</div>;
    }
    return (
    <main className="min-h-screen bg-gray-50 text-gray-900 p-8">
      <button
        onClick={() => router.push("/projects")}
        className="text-blue-600 hover:underline mb-6"
      >
        ← Back to All Projects
      </button>

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
          <p>
            Owner: {project.owner?.name} ({project.owner?.email})
          </p>
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
    </main>
  );
}

