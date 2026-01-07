import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import taskRoutes from "./routes/taskRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import { requireAuth } from "./middleware/auth.js";

const app = express();

app.use(cors({
  origin: ["http://localhost:3000","https://open-desk.vercel.app"],
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true,
}));

app.use(express.json());

// MongoDB connect
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ DB error:", err));

// Public test route
app.get("/api/hello", (req, res) => res.json({ message: "OpenDesk : The Collabration Tool" }));

// ⛔ REMOVE THIS — it breaks explore
// app.use("/api", requireAuth);

// 👉 APPLY auth only inside private routes (these routes already check inside)
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
