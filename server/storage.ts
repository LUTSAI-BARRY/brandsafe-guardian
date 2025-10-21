import { type User, users } from "@shared/schema";
import { db } from "../db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUserById(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: { name: string; email: string; role?: string; passwordHash: string }): Promise<User>;
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

  async createUser(userData: { name: string; email: string; role?: string; passwordHash: string }): Promise<User> {
    const { passwordHash, ...rest } = userData;
    const result = await db
      .insert(users)
      .values({
        ...rest,
        password: passwordHash,
      })
      .returning();
    return result[0];
  }
}

export const storage = new DBStorage();
