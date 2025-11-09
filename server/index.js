import express from "express";
import cors from "cors";
import { verifyToken, clerkClient } from "@clerk/clerk-sdk-node";
import "dotenv/config";
import mongoose, { mongo } from "mongoose";


const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
mongoose.connect(process.env.MONGODB_URI).then(() => console.log("MongoDB Connected")).catch((err) => console.error("DB connection error :", err));





async function requireAuth(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token provided" });

    const payload = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });

    req.userId = payload.sub;
    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    res.status(401).json({ error: "Unauthorized" });
  }
}
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from server" })
})

app.get("/api/userinfo", requireAuth, async (req, res) => {
  const user = await clerkClient.users.getUser(req.userId);
  res.json({ id: user.id, email: user.emailAddresses[0].emailAddress });
});

app.listen(5000, () => console.log("✅ Server running on port 5000"));
