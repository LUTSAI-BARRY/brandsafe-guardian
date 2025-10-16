import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { storage } from "../storage";
import { signToken } from "../utils/jwt";
import { insertUserSchema, loginSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

const SALT_ROUNDS = 10;

// -------------------- SIGNUP --------------------
export async function signup(req: Request, res: Response) {
  try {
    // Validate request body
    const parseResult = insertUserSchema.safeParse(req.body);
    if (!parseResult.success) {
      const error = fromZodError(parseResult.error);
      return res.status(400).json({ error: error.message });
    }

    const { name, email, password, role } = parseResult.data;

    // Check if user already exists
    const existingUser = await storage.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    // Create new user (schema expects "password")
    const user = await storage.user.create({
      data: {
        name,
        email,
        role,
        password: passwordHash,
      },
    });

    // Generate JWT token
    const token = signToken({ id: user.id, email: user.email, role: user.role });

    res.status(201).json({
      message: "User registered successfully",
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      token,
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// -------------------- LOGIN --------------------
export async function login(req: Request, res: Response) {
  try {
    // Validate request body
    const parseResult = loginSchema.safeParse(req.body);
    if (!parseResult.success) {
      const error = fromZodError(parseResult.error);
      return res.status(400).json({ error: error.message });
    }

    const { email, password } = parseResult.data;

    // Find user
    const user = await storage.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare passwords
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate JWT token
    const token = signToken({ id: user.id, email: user.email, role: user.role });

    res.status(200).json({
      message: "Login successful",
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      token,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
