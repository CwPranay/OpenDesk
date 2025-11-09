import express from "express";
import Project from "../models/Project.js";
import User from "../models/User.js";
import { requireAuth } from "../middleware/auth.js";
import { clerkClient } from "@clerk/clerk-sdk-node";

const router = express.Router();

// ✅ GET /api/projects - Get all projects for the current user
router.get("/", requireAuth, async (req, res) => {
  try {
    console.log("Fetching projects for user:", req.userId);

    if (!req.userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    let user = await User.findOne({ clerkId: req.userId });
    if (!user) {
      console.log("User not found in database, returning empty projects");
      return res.json([]);
    }

    const projects = await Project.find({ owner: user._id })
      .populate("owner", "name email")
      .sort({ createdAt: -1 });

    console.log(`Found ${projects.length} projects`);
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

// ✅ POST /api/projects - Create a new project
router.post("/", requireAuth, async (req, res) => {
  try {
    console.log("Creating project for user:", req.userId);
    console.log("Request body:", req.body);

    if (!req.userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const { title, description, repoUrl } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ error: "Project title is required" });
    }

    // Check if user exists in DB, if not create it
    let user = await User.findOne({ clerkId: req.userId });

    if (!user) {
      const clerkUser = await clerkClient.users.getUser(req.userId);
      user = await User.create({
        clerkId: req.userId,
        email: clerkUser.emailAddresses[0].emailAddress,
        name: clerkUser.firstName || "Unnamed",
      });
      console.log("🆕 Created new user in DB:", user.email);
    }

    const project = await Project.create({
      title: title.trim(),
      description: description?.trim(),
      repoUrl: repoUrl?.trim(),
      owner: user._id,
    });

    await project.populate("owner", "name email");

    console.log("✅ Created project:", project.title);
    res.status(201).json(project);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

// ✅ GET /api/projects/:id - Fetch a single project by ID
router.get("/:id", requireAuth, async (req, res) => {
  try {
    console.log("Fetching project by ID:", req.params.id);

    const project = await Project.findById(req.params.id)
      .populate("owner", "name email");

    if (!project) {
      console.log("❌ Project not found");
      return res.status(404).json({ message: "Project not found" });
    }

    const user = await User.findOne({ clerkId: req.userId });
    if (!user || !project.owner._id.equals(user._id)) {
      return res.status(403).json({ error: "Access denied" });
    }

    res.json(project);
  } catch (error) {
    console.error("Error fetching project by ID:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

export default router;
