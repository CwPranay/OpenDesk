"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";

export default function Home() {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const { getToken } = useAuth();

  useEffect(() => {
    // wrap your async logic inside a function
    const fetchData = async () => {
      try {
        // 1️⃣ fetch public route
        const res = await fetch("http://localhost:5000/api/hello");
        const data = await res.json();
        setMessage(data.message);

        // 2️⃣ get Clerk token
        const token = await getToken({ template: "integrationn_fallback" });

        // 3️⃣ fetch protected route
        const userRes = await fetch("http://localhost:5000/api/userinfo", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = await userRes.json();
        setUser(userData);
        
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchData();
  }, [getToken]); // re-run only if getToken changes

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 flex flex-col items-center justify-center px-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome to <span className="text-blue-600">OpenDesk</span>
        </h1>

        <p className="text-lg text-gray-600 max-w-md mx-auto">
          Your smart workspace to collaborate, manage projects, and stay productive —{" "}
          {message}
        </p>

        {user ? (
          <p className="text-green-700 font-medium">
          
          </p>
        ) : (
          <p className="text-gray-500">Loading user info...</p>
        )}

        <div className="flex gap-4 justify-center mt-6">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition">
            Get Started
          </button>
          <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-2 rounded-xl transition">
            Learn More
          </button>
        </div>
      </div>
    </main>
  );
}
