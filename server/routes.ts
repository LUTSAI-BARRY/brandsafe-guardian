import type { Express } from "express";
import { createServer, type Server } from "http";
import { signup, login, me } from "./controllers/auth";
import { getPlans, seedPlans } from "./controllers/plans";
import { requireAuth } from "./middleware/auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Try to seed plans on startup, but don't fail if database is not available
  try {
    await seedPlans();
  } catch (error) {
    console.log("Could not seed plans (database not available):", error.message);
  }
  
  // Auth routes
  app.post("/api/auth/signup", signup);
  app.post("/api/auth/login", login);
  app.get("/api/auth/me", requireAuth, me);
  
  // Plans routes
  app.get("/api/plans", getPlans);

  const httpServer = createServer(app);

  return httpServer;
}
