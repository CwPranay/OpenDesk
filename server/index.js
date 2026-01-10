import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import taskRoutes from "./routes/taskRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import { requireAuth } from "./middleware/auth.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

const app = express();

app.use(cors({
  origin: ["http://localhost:3000","https://opendesk-com.vercel.app"],
  methods: ["GET", "POST", "PATCH", "DELETE"],
 allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.use(express.json());
app.use((req, res, next) => {
  console.log("AUTH HEADER:", req.headers.authorization);
  next();
});


// MongoDB connect
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ DB error:", err));

// Public test route
app.get("/api/hello", (req, res) => res.json({ message: "OpenDesk : The Collabration Tool" }));


app.use("/api/projects",ClerkExpressRequireAuth(), projectRoutes);
app.use("/api/tasks",ClerkExpressRequireAuth(), taskRoutes);

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
