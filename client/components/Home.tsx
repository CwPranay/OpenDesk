"use client"
import { useEffect,useState } from "react"

export default function Home() {
  const [message,setMessage] =useState("")
   
  useEffect(()=>{
    fetch("http://localhost:5000/api/hello")
    .then((res)=>res.json())
    .then((data)=>setMessage(data.message))
    .catch((err)=>console.error(err))
  },[])


  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 flex flex-col items-center justify-center px-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Welcome to <span className="text-blue-600">OpenDesk</span></h1>
        <p className="text-lg text-gray-600 max-w-md mx-auto">
          Your smart workspace to collaborate, manage projects, and stay productive — {message}
        </p>
        <div className="flex gap-4 justify-center mt-6">
          <button className="bg-blue-600 cursor-pointer  hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition">
            Get Started
          </button>
          <button className="border cursor-pointer border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-2 rounded-xl transition">
            Learn More
          </button>
        </div>
      </div>
    </main>
  )
}
