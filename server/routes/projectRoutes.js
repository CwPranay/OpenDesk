import express from "express";
import Project from "../models/Project.js";
import User from "../models/User.js";
import { clerkClient } from "@clerk/clerk-sdk-node";

const router = express.Router();

/* -----------------------------------------------------------
    PUBLIC ROUTE — GET ALL PROJECTS (EXPLORE)
----------------------------------------------------------- */
router.get("/explore", async (req, res) => {
  try {
    const { lang, search } = req.query;

    let filter = {};

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    if (lang) {
      filter.language = lang;
    }

    const projects = await Project.find(filter)
      .populate("owner", "name email clerkId")
      .sort({ createdAt: -1 });

    return res.json(projects);
  } catch (error) {
    console.error("Explore error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/* -----------------------------------------------------------
    PRIVATE ROUTE — GET USER'S OWN PROJECTS
----------------------------------------------------------- */
router.get("/", async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    let user = await User.findOne({ clerkId: req.userId });

    if (!user) return res.json([]);

    const projects = await Project.find({ owner: user._id })
      .populate("owner", "name email clerkId")
      .sort({ createdAt: -1 });

    return res.json(projects);
  } catch (error) {
    console.error("Fetch user projects error:", error);
    res.status(500).json({ error: error.message });
  }
});

/* -----------------------------------------------------------
    PUBLIC ROUTE — VIEW PROJECT DETAILS
----------------------------------------------------------- */
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("owner", "name email clerkId");

    if (!project) return res.status(404).json({ message: "Not found" });

    let isOwner = false;

    if (req.userId) {
      const user = await User.findOne({ clerkId: req.userId });
      if (user && project.owner._id.equals(user._id)) isOwner = true;
    }

    return res.json({
      ...project.toObject(),
      isOwner,
    });
  } catch (error) {
    console.error("Fetch project error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/* -----------------------------------------------------------
    PRIVATE ROUTE — CREATE PROJECT
----------------------------------------------------------- */
router.post("/", async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const { title, description, repoUrl } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ error: "Project title is required" });
    }

    let user = await User.findOne({ clerkId: req.userId });

    if (!user) {
      const clerkUser = await clerkClient.users.getUser(req.userId);
      user = await User.create({
        clerkId: req.userId,
        email: clerkUser.emailAddresses[0].emailAddress,
        name: clerkUser.firstName || "Unnamed",
      });
    }

    const project = await Project.create({
      title,
      description,
      repoUrl,
      owner: user._id,
    });

    await project.populate("owner", "name email clerkId");

    res.status(201).json(project);
  } catch (error) {
    console.error("Create project error:", error);
    res.status(500).json({ error: error.message });
  }
});

/* -----------------------------------------------------------
    PRIVATE ROUTE — DELETE PROJECT
----------------------------------------------------------- */
router.delete("/:id", async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const user = await User.findOne({ clerkId: req.userId });
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    if (!project.owner.equals(user._id)) {
      return res.status(403).json({ error: "Access denied" });
    }

    await project.deleteOne();

    res.json({ success: true });
  } catch (error) {
    console.error("Delete project error:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
