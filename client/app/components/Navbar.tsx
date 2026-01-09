"use client";

import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { useState } from "react";
import {  X } from "lucide-react";


export default function Navbar() {
  const [menu,showMenu]=useState(false)

  


  return (
    <nav className="sticky top-0 z-50 bg-slate-900 backdrop-blur-xl border-b border-indigo-500/20 shadow-lg shadow-indigo-500/10">
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

          <SignedIn>
            <Link
              href="/projects"
              className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-indigo-500/10 transition-all duration-200 relative group"
            >
              Projects
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-indigo-400 group-hover:w-3/4 transition-all duration-300"></span>
            </Link>
          </SignedIn>

          <Link
            href="/projects/explore"
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
                href="/"
                className="px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-indigo-500/10 rounded-lg transition-all duration-200"
              >
                Dashboard
              </Link>
              <Link
                href="/projects"
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
        <div onClick={()=>{
        showMenu(true)
        }} className={`md:hidden ${menu?'hidden':'flex'}  items-center cursor-pointer text-gray-300 hover:text-indigo-400 transition-colors duration-200 hover:scale-110 active:scale-95`}>
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
        {menu&&(
          
          <div
  className={`fixed top-0 right-0 z-50 h-screen w-72
  bg-slate-900 backdrop-blur-xl
  border-l border-indigo-500/20
  shadow-2xl shadow-indigo-500/20
  transform transition-transform duration-300 ease-in-out
  ${menu ? "translate-x-0" : "translate-x-full"}`}
>
  {/* FULL HEIGHT COLUMN */}
  <div className="flex h-full flex-col">
    
    {/* ---------- HEADER ---------- */}
    <header className="relative flex h-16 items-center justify-center border-b border-indigo-500/20 shrink-0">
      <Link href="/" className="text-2xl font-bold tracking-tight group">
        <span className="text-indigo-400">Open</span>
        <span className="text-white">Desk</span>
      </Link>

      <button
        onClick={() => showMenu(false)}
        className="absolute right-4 text-gray-400 hover:text-indigo-400 transition"
        aria-label="Close menu"
      >
        <X />
      </button>
    </header>

    {/* ---------- NAV ---------- */}
    <nav className="flex flex-col gap-1 px-4 py-6 text-sm font-medium flex-1">
      {[
        { name: "Home", href: "/" },
        { name: "Explore", href: "/projects/explore" },
        { name: "About", href: "/about" },
      ].map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="flex items-center justify-center rounded-lg px-4 py-2
          text-gray-300 hover:text-white hover:bg-indigo-500/10
          transition"
        >
          {item.name}
        </Link>
      ))}

      <SignedIn>
        <Link
          href="/projects"
          className="flex items-center justify-center rounded-lg px-4 py-2
          text-gray-300 hover:text-white hover:bg-indigo-500/10 transition"
        >
          Projects
        </Link>
      </SignedIn>
    </nav>

    {/* ---------- FOOTER ---------- */}
    <footer className="border-t border-indigo-500/20 px-4 py-5 shrink-0">
      <SignedOut>
        <div className="flex flex-col gap-3">
          <SignInButton mode="modal">
            <button className="w-full rounded-lg border border-indigo-500/50 py-2 text-indigo-400 hover:bg-indigo-500/10 transition">
              Sign In
            </button>
          </SignInButton>

          <SignUpButton mode="modal">
            <button className="w-full rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 py-2 text-white shadow-lg transition">
              Sign Up
            </button>
          </SignUpButton>
        </div>
      </SignedOut>

      <SignedIn>
        {/* AVATAR FIX */}
        <div className="flex justify-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-full ring-2 ring-indigo-500/40">
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "h-10 w-10",
                },
              }}
            />
          </div>
        </div>
      </SignedIn>
    </footer>

  </div>
</div>
)}
          
      </div>
    </nav>
  );
}