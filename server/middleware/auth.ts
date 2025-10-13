import type { Request, Response, NextFunction } from "express";
import { getTokenFromReq, verifyToken } from "../utils/jwt";
import { storage } from "../storage";
import type { SafeUser } from "@shared/schema";

declare global {
  namespace Express {
    interface Request {
      user?: SafeUser;
    }
  }
}

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const token = getTokenFromReq(req);
    if (!token) {
      res.status(401).json({ error: "No token provided" });
      return;
    }

    const payload = verifyToken(token);
    if (!payload?.id) {
      res.status(401).json({ error: "Invalid token" });
      return;
    }

    const user = await storage.getUserById(payload.id);
    if (!user) {
      res.status(401).json({ error: "User not found" });
      return;
    }

    const { passwordHash, ...safeUser } = user;
    req.user = safeUser;

    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(401).json({ error: "Authentication failed" });
  }
}
