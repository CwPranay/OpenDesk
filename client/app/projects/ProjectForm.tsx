"use client";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";

export default function ProjectForm({ onProjectCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      setLoading(true);
      const token = await getToken({ template: "integrationn_fallback" });
      const res = await fetch("http://localhost:5000/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description,repoUrl }),
      });

      const data = await res.json();
      if (res.ok) {
        onProjectCreated(data);
        setTitle("");
        setDescription("");
        setRepoUrl("");
      } else {
        console.error("Failed to create project:", data.error);
      }
    } catch (err) {
      console.error("Create project error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-sm border border-gray-200 rounded-2xl p-5 max-w-lg w-full"
    >
      <h2 className="text-lg font-semibold mb-4">Create a new project</h2>
      <input
        type="text"
        placeholder="Project Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-3 border border-gray-300 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <textarea
        placeholder="Project Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full mb-3 border border-gray-300 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        rows={3}
      />
      <input
        type="url"
        placeholder="GitHub Repository URL"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
        className="w-full mb-3 border border-gray-300 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-xl transition"
      >
        {loading ? "Creating..." : "Add Project"}
      </button>
    </form>
  );
}
