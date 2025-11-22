// server/middleware/auth.js
import { verifyToken } from "@clerk/clerk-sdk-node";

export async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  // If NO token → allow public access (explore, public project read)
  if (!authHeader) {
    req.userId = null;
    return next();
  }

  try {
    const token = authHeader.split(" ")[1];

    const payload = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });

    req.userId = payload.sub;
    next();

  } catch (err) {
    console.error("Auth error:", err.message);

    // Invalid or expired token → treat as unauthenticated
    req.userId = null;
    next();
  }
}
