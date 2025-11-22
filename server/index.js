import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import taskRoutes from "./routes/taskRoutes.js"
import projectRoutes from "./routes/projectRoutes.js";
import { requireAuth } from "./middleware/auth.js";

const app = express();

app.use(cors({
  origin: "http://localhost:3000", methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true,
}));
app.use(express.json());

// MongoDB connect
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ DB error:", err));

// Public route
app.get("/api/hello", (req, res) => res.json({ message: "Hello From Server 👋" }));

// All other /api routes require Clerk auth
app.use("/api", requireAuth);

// Protected routes - these will be /api/projects
app.use("/api/projects", projectRoutes);

app.use("/api/tasks", taskRoutes);

app.listen(5000, () => console.log("🚀 Server running on port 5000"));