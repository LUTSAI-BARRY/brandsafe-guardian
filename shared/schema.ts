import { pgTable, text, varchar, timestamp, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// -------------------- PLANS TABLE --------------------
export const plans = pgTable("plans", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
  price: varchar("price", { length: 20 }).notNull(),
  features: text("features").notNull(), // JSON string of features
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// -------------------- USERS TABLE --------------------
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 191 }).notNull(),
  email: varchar("email", { length: 191 }).notNull().unique(),
  password: text("password").notNull(),
  role: varchar("role", { length: 50 }).notNull().default("creator"),
  planId: serial("plan_id").references(() => plans.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// -------------------- ZOD SCHEMAS --------------------
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
}).extend({
  password: z
    .string()
    .min(10, "Password must be at least 10 characters long")
    .regex(/[A-Z]/, "Password must include at least one uppercase letter")
    .regex(/[a-z]/, "Password must include at least one lowercase letter")
    .regex(/[0-9]/, "Password must include at least one number")
    .regex(/[\W_]/, "Password must include at least one special character"),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

// -------------------- TYPES --------------------
export type InsertUser = z.infer<typeof insertUserSchema>;
export type LoginUser = z.infer<typeof loginSchema>;
export type User = typeof users.$inferSelect;
export type SafeUser = Omit<User, "password">;
export type Plan = typeof plans.$inferSelect;
