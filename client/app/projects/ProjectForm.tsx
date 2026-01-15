"use client";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";

interface Project {
  _id: string;
  title: string;
  description?: string;
  createdAt: Date;
}

interface ProjectFormProps {
  onProjectCreated: (project: Project) => void;
}

const LANGUAGES = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C++",
  "Go",
  "Rust",
];

export default function ProjectForm({ onProjectCreated }: ProjectFormProps) {
  const { getToken } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [language, setLanguage] = useState("");
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsLangOpen(false);

    try {
      setLoading(true);
      const token = await getToken({ template: "integrationn_fallback" });

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/projects`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            description,
            repoUrl,
            language: language || undefined, // auto-detect if empty
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to create project");

        return;
      }
      setError(null);

      onProjectCreated(data);
      setTitle("");
      setDescription("");
      setRepoUrl("");
      setLanguage("");
    } catch (err) {
      console.error("Create project error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-br from-gray-800 to-gray-900
                 border border-gray-700 rounded-xl p-6
                 max-w-2xl w-full mx-auto shadow-2xl"
    >
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">
          Create New Project
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          Add your project details below
        </p>
      </div>
      {error && (
        <div className="mb-4 rounded-lg border border-red-500/30 
                  bg-red-500/10 px-4 py-3 text-sm text-red-400">
          <div className="flex items-start gap-2">
            <svg
              className="w-5 h-5 mt-0.5 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01M12 3a9 9 0 100 18 9 9 0 000-18z"
              />
            </svg>
            <span>{error}</span>
          </div>
        </div>
      )}


      <div className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Project Title *
          </label>
          <input
            type="text"
            placeholder="Enter project title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full bg-gray-950/80 border border-gray-700
                       rounded-lg px-4 py-2.5 text-white
                       placeholder-gray-500 outline-none
                       focus:ring-2 focus:ring-blue-500
                       transition shadow-inner"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Description
          </label>
          <textarea
            placeholder="What's this project about?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full bg-gray-950/80 border border-gray-700
                       rounded-lg px-4 py-2.5 text-white
                       placeholder-gray-500 outline-none
                       focus:ring-2 focus:ring-blue-500
                       transition resize-none shadow-inner"
          />
        </div>

        {/* GitHub URL */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            GitHub Repository URL
          </label>
          <input
            type="url"
            placeholder="https://github.com/username/repo"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            className="w-full bg-gray-950/80 border border-gray-700
                       rounded-lg px-4 py-2.5 text-white
                       placeholder-gray-500 outline-none
                       focus:ring-2 focus:ring-blue-500
                       transition shadow-inner"
          />
        </div>

        {/* Language (Custom Dropdown) */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Programming Language
          </label>

          {/* Trigger */}
          <button
            type="button"
            onClick={() => setIsLangOpen((prev) => !prev)}
            className="w-full bg-gray-950/80 border border-gray-700
                       rounded-lg px-4 py-2.5 text-left text-white
                       flex items-center justify-between
                       hover:border-blue-500 focus:outline-none
                       focus:ring-2 focus:ring-blue-500 transition"
          >
            <span className={language ? "text-white" : "text-gray-500"}>
              {language || "Auto detect (recommended)"}
            </span>

            <svg
              className={`w-4 h-4 text-gray-400 transition-transform ${isLangOpen ? "rotate-180" : ""
                }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Dropdown */}
          {isLangOpen && (
            <div
              className="absolute z-20 mt-2 w-full bg-gray-900
                         border border-gray-700 rounded-lg
                         shadow-2xl overflow-hidden"
            >
              {/* Auto detect */}
              <button
                type="button"
                onClick={() => {
                  setLanguage("");
                  setIsLangOpen(false);
                }}
                className="w-full px-4 py-2.5 text-left text-sm
                           text-gray-300 hover:bg-gray-800 transition"
              >
                Auto detect
              </button>

              <div className="border-t border-gray-700" />

              {LANGUAGES.map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => {
                    setLanguage(lang);
                    setIsLangOpen(false);
                  }}
                  className={`w-full px-4 py-2.5 text-left text-sm transition
                    ${language === lang
                      ? "bg-blue-600/20 text-blue-400"
                      : "text-gray-300 hover:bg-gray-800"
                    }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          )}

          <p className="text-xs text-gray-500 mt-1">
            Language will be auto-detected from GitHub if not selected
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700
                     hover:from-blue-700 hover:to-blue-800
                     text-white font-semibold px-6 py-3
                     rounded-lg transition-all duration-200
                     disabled:opacity-50 disabled:cursor-not-allowed
                     shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
        >
          {loading ? "Creating project..." : "Add Project"}
        </button>
      </div>
    </form>
  );
}
