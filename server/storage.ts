import { type User, type InsertUser, users } from "@shared/schema";
import { db } from "../db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUserById(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser & { passwordHash: string }): Promise<User>;
}

export class DBStorage implements IStorage {
  async getUserById(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return result[0];
  }

  async createUser(userData: InsertUser & { passwordHash: string }): Promise<User> {
    const { password, ...userWithoutPassword } = userData as any;
    const result = await db.insert(users).values(userWithoutPassword).returning();
    return result[0];
  }
}

export const storage = new DBStorage();
