import type { Express } from "express";
import { createServer, type Server } from "http";
import { signup, login, me } from "./controllers/auth";
import { requireAuth } from "./middleware/auth";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/auth/signup", signup);
  app.post("/api/auth/login", login);
  app.get("/api/auth/me", requireAuth, me);

  const httpServer = createServer(app);

  return httpServer;
}
