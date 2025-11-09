"use client";

import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-linear-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] backdrop-blur-xl border-b border-indigo-500/20 shadow-lg shadow-indigo-500/10">
      <div className="max-w-7xl mx-auto h-16 flex items-center justify-between px-6">
        {/* ---------- Brand ---------- */}
        <Link href="/" className="group relative text-2xl font-bold tracking-tight">
          <span className="text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300">
            Open
          </span>
          <span className="text-white group-hover:text-gray-100 transition-colors duration-300">
            Desk
          </span>
          <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-indigo-400 to-purple-500 group-hover:w-full transition-all duration-300"></div>
        </Link>

        {/* ---------- Nav Links ---------- */}
        <div className="hidden md:flex items-center gap-1 text-sm font-medium">
          <Link
            href="/"
            className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-indigo-500/10 transition-all duration-200 relative group"
          >
            Home
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-indigo-400 group-hover:w-3/4 transition-all duration-300"></span>
          </Link>
          <Link
            href="/projects"
            className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-indigo-500/10 transition-all duration-200 relative group"
          >
            Projects
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-indigo-400 group-hover:w-3/4 transition-all duration-300"></span>
          </Link>
          <Link
            href="/explore"
            className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-indigo-500/10 transition-all duration-200 relative group"
          >
            Explore
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-indigo-400 group-hover:w-3/4 transition-all duration-300"></span>
          </Link>
          <Link
            href="/about"
            className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-indigo-500/10 transition-all duration-200 relative group"
          >
            About
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-indigo-400 group-hover:w-3/4 transition-all duration-300"></span>
          </Link>
        </div>

        {/* ---------- Auth Section ---------- */}
        <div className="hidden md:flex items-center gap-3">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-5 py-2 rounded-lg border-2 border-indigo-500/50 text-indigo-400 hover:border-indigo-400 hover:bg-indigo-500/10 hover:text-indigo-300 font-medium transition-all duration-200 hover:scale-105 active:scale-95">
                Sign In
              </button>
            </SignInButton>

            <SignUpButton mode="modal">
              <button className="px-5 py-2 rounded-lg bg-linear-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium transition-all duration-200 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 active:scale-95">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-indigo-500/10 rounded-lg transition-all duration-200"
              >
                Dashboard
              </Link>
              <Link
                href="/create"
                className="px-4 py-2 text-sm bg-linear-to-r from-indigo-500 to-purple-600 rounded-lg hover:from-indigo-600 hover:to-purple-700 text-white font-medium transition-all duration-200 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <span className="text-lg leading-none">+</span>
                New Project
              </Link>
              
                <UserButton afterSignOutUrl="/" />
              
            </div>
          </SignedIn>
        </div>

        {/* ---------- Mobile Menu (Hamburger) ---------- */}
        <div className="md:hidden flex items-center cursor-pointer text-gray-300 hover:text-indigo-400 transition-colors duration-200 hover:scale-110 active:scale-95">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </div>
      </div>
    </nav>
  );
}