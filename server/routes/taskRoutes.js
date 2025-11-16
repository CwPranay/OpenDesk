import express from "express"
import Project from "../models/Project"
import User from "../models/User"
import Task from "../models/Task"
import { requireAuth } from "../middleware/auth"

const router = express.Router()

router.post("/", requireAuth, async (req, res) => {
    try {
        const { title, description, projectId } = req.body;
        if (!title || !projectId) {
            return res.status(400).json({ error: "Title and projectId requried" });

        }

        const dbUser = await User.findOne({ clerkId: req.userId });
        const project = await Project.findOne({ _id: projectId, owner: dbUser._id });

        if (!project) {

            return res.status(400).json({ error: "Not authorized to add tasks" });

        }

        const task = await Task.create({
            title,
            description,
            project: projectId,
        });
        res.status(201).json(task);

    } catch (error) {
        console.error("Task creation error:", err);
        res.status(500).json({ error: err.message });
    }
})

router.get("/:projectId", requireAuth, async (req, res) => {
    try {
        const { projectId } = req.params;

        const dbUser = await User.findOne({ clerkId: req.userId });
        const project = await Project.findOne({ _id: projectId, owner: dbUser._id });
        if (!project) {
            return res.status(403).json({ error: "Not authorized to view tasks" });
        }

        const tasks = await Task.find({ project: projectId }).sort({ createdAt: -1 });
        res.json(tasks);

    } catch (error) {
        console.error("Fetch tasks error:", err);
        res.status(500).json({ error: err.message });

    }
})

router.patch(":/id", requireAuth, async (req, res) => {
    try {
        const updates = req.body;
        const task = await Task.findById(req.params.id).populate("project");
        const dbUser = await User.findOne({ clerkId: req.userId });
        if (!task.project.owner.equals(dbUser._id)) {
            return res.status(403).json({ error: "Not authorized to update task" });

        }
        Object.assign(task, updates);
        await task.save();
        res.json(task);

    } catch (error) {
        console.error("Update task error:", err);
        res.status(500).json({ error: err.message });

    }
})

router.delete(":/id",requireAuth,async (req,res) => {
    try {
        
    } catch (error) {
        
    }
})