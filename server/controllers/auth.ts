import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { storage } from "../storage";
import { signToken } from "../utils/jwt";
import { insertUserSchema, loginSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

const SALT_ROUNDS = 10;

export async function signup(req: Request, res: Response): Promise<void> {
  try {
    const validated = insertUserSchema.safeParse(req.body);
    
    if (!validated.success) {
      const error = fromZodError(validated.error);
      res.status(400).json({ error: error.message });
      return;
    }

    const { name, email, password, role } = validated.data;

    const existing = await storage.getUserByEmail(email);
    if (existing) {
      res.status(409).json({ error: "Email already in use" });
      return;
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await storage.createUser({
      name,
      email,
      role: role || "creator",
      passwordHash,
    } as any);

    const token = signToken({ id: user.id, email: user.email, role: user.role });

    res.status(201).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  try {
    const validated = loginSchema.safeParse(req.body);
    
    if (!validated.success) {
      const error = fromZodError(validated.error);
      res.status(400).json({ error: error.message });
      return;
    }

    const { email, password } = validated.data;

    const user = await storage.getUserByEmail(email);
    if (!user) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const token = signToken({ id: user.id, email: user.email, role: user.role });

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function me(req: Request, res: Response): Promise<void> {
  if (!req.user) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }
  res.json({ user: req.user });
}
