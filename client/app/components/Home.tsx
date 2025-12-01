"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  const [message, setMessage] = useState("");

  const { getToken } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/hello");
        const data = await res.json();
        setMessage(data.message);

        const token = await getToken({ template: "integrationn_fallback" });
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchData();
  }, [getToken]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 text-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent"></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-20">
        {/* Hero Section */}
        <div className="text-center space-y-8 max-w-5xl mx-auto">
          {/* Badge */}
          

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white">
            Welcome to <span className="text-gray-100">OpenDesk</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Your professional workspace to collaborate, manage projects, and stay productive.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link href="/projects">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg font-medium text-white transition-all duration-200 shadow-lg shadow-blue-900/50 hover:shadow-xl hover:shadow-blue-900/60">
                Get Started
              </button>
            </Link>
            <Link href="/about">
              <button className="px-8 py-3 border-2 border-gray-700 hover:border-gray-600 hover:bg-gray-800/80 rounded-lg font-medium text-white transition-all duration-200 shadow-lg shadow-black/20">
                Learn More
              </button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-5xl w-full">
          {[
            {
              title: "Fast & Efficient",
              description: "Lightning-fast performance to keep you productive"
            },
            {
              title: "Collaborate",
              description: "Work together seamlessly with your team"
            },
            {
              title: "Stay Organized",
              description: "Keep all your projects in one place"
            }
          ].map((feature, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:border-blue-600/50 transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              <h3 className="text-lg font-semibold mb-2 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
