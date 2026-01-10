import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "OpenDesk – Collaborative Project & Task Management Platform",
    template: "%s | OpenDesk",
  },

  description:
    "OpenDesk is a modern collaboration platform to manage projects, tasks, and teamwork efficiently. Built for developers and teams.",

  keywords: [
    "OpenDesk",
    "project management",
    "task management",
    "developer collaboration",
    "team productivity",
    "open source collaboration",
    "project tracking",
    "mern projects",
  ],

  authors: [{ name: "OpenDesk Team" }],

  creator: "OpenDesk",

  metadataBase: new URL("https://opendesk-com.vercel.app"),

  alternates: {
    canonical: "https://opendesk-com.vercel.app",
  },

  openGraph: {
    title: "OpenDesk – Collaborate. Build. Ship.",
    description:
      "Manage projects, assign tasks, and collaborate with your team using OpenDesk.",
    url: "https://opendesk-com.vercel.app",
    siteName: "OpenDesk",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "OpenDesk – Project Collaboration Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "OpenDesk – Collaborative Project Management",
    description:
      "A modern platform to manage projects and tasks collaboratively.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  category: "technology",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar/>
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
