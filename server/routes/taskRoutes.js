import express from "express";
import Project from "../models/Project.js";
import User from "../models/User.js";
import Task from "../models/Task.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

/* ---------------------------------------------------------
   CREATE TASK (Owner only)
   POST /api/tasks/:projectId
--------------------------------------------------------- */
router.post("/:projectId", requireAuth, async (req, res) => {
  try {
    const { title, description } = req.body;
    const { projectId } = req.params;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const dbUser = await User.findOne({ clerkId: req.userId });

    const project = await Project.findOne({
      _id: projectId,
      owner: dbUser._id,
    });

    if (!project) {
      return res.status(403).json({ error: "Not authorized to add tasks" });
    }

    const task = await Task.create({
      title,
      description,
      projectId,
      status: "pending",
    });

    res.status(201).json(task);
  } catch (error) {
    console.error("Task creation error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/* ---------------------------------------------------------
   GET TASKS (Public read, owner-only edit)
   GET /api/tasks/:projectId
--------------------------------------------------------- */
router.get("/:projectId", async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Owner detection (safe even if user isn't logged in)
    let isOwner = false;

    if (req.userId) {
      const dbUser = await User.findOne({ clerkId: req.userId });
      if (dbUser && project.owner.equals(dbUser._id)) {
        isOwner = true;
      }
    }

    const tasks = await Task.find({ projectId }).sort({ createdAt: -1 });

    res.json({ tasks, isOwner });
  } catch (error) {
    console.error("Fetch tasks error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/* ---------------------------------------------------------
   UPDATE TASK (Owner only)
   PATCH /api/tasks/:id
--------------------------------------------------------- */
router.patch("/:id", requireAuth, async (req, res) => {
  try {
    const updates = req.body;

    const task = await Task.findById(req.params.id).populate({
      path: "projectId",
      select: "owner",
    });

    const dbUser = await User.findOne({ clerkId: req.userId });

    if (!task || !task.projectId.owner.equals(dbUser._id)) {
      return res.status(403).json({ error: "Not authorized to update task" });
    }

    Object.assign(task, updates);
    await task.save();

    res.json(task);
  } catch (error) {
    console.error("Update task error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/* ---------------------------------------------------------
   DELETE TASK (Owner only)
   DELETE /api/tasks/:id
--------------------------------------------------------- */
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate({
      path: "projectId",
      select: "owner",
    });

    const dbUser = await User.findOne({ clerkId: req.userId });

    if (!task || !task.projectId.owner.equals(dbUser._id)) {
      return res.status(403).json({ error: "Not authorized to delete task" });
    }

    await task.deleteOne();
    res.json({ success: true });
  } catch (error) {
    console.error("Delete task error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
